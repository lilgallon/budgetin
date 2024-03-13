package dev.gallon.infra.mongodb.common

import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import dev.gallon.domain.common.*
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.datetime.Clock
import org.bson.types.ObjectId
import java.util.*
import kotlin.reflect.KClass

class MongoDbEntityRepository<D : EntityData>(
    database: MongoDatabase,
    clazz: KClass<D>,
    private val clock: Clock
) : EntityRepository<D> {

    private val entityName = clazz::class.java.simpleName.replaceFirstChar { it.lowercase(Locale.getDefault()) }
    private val collection = database.getCollection<Entity<D>>(entityName)

    override suspend fun create(data: D): Entity<D> = collection
        .insertOne(
            Entity(
                id = ObjectId().toString(),
                metadata = EntityMetadata(
                    modificationsLog = ModificationsLog(
                        created = buildModificationLog()
                    ),
                    owner = "todo"
                ),
                data = data
            )
        )
        .let { insertOneResult ->
            val id = insertOneResult.insertedId?.toString()
                ?: throw IllegalStateException("[CREATE] InsertedId is null after insertOne of $data")
            searchOneById(id)
                ?: throw IllegalStateException("[CREATE] Could not find entity $id after insetOne of $data")
        }

    override suspend fun update(id: String, data: D): Entity<D> = collection
        .findOneAndUpdate(
            idFilter(id),
            Updates.combine(
                Updates.set(Entity<D>::data.name, data),
                Updates.set(
                    Entity<D>::metadata / EntityMetadata::modificationsLog / ModificationsLog::updated,
                    buildModificationLog()
                )
            )
        )
        ?: throw IllegalStateException("[UPDATE] $entityName $id not found for update")

    override suspend fun delete(id: String): Entity<D> = collection
        .findOneAndUpdate(
            idFilter(id),
            Updates.combine(
                Updates.set(
                    Entity<D>::metadata / EntityMetadata::modificationsLog / ModificationsLog::deleted,
                    buildModificationLog()
                )
            )
        )
        ?: throw IllegalStateException("[DELETE] $entityName $id not found for deletion")

    override suspend fun searchOneById(id: String): Entity<D>? = collection
        .find()
        .firstOrNull()

    private suspend fun buildModificationLog(): ModificationLog = with(currentCallContext()) {
        ModificationLog(
            timestamp = clock.now(),
            source = source,
            user = user
        )
    }
}
