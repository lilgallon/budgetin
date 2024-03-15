package dev.gallon.infra.db.mongo.common

import com.mongodb.client.model.FindOneAndUpdateOptions
import com.mongodb.client.model.ReturnDocument
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoCollection
import dev.gallon.domain.common.*
import dev.gallon.domain.entities.*
import dev.gallon.domain.repositories.EntityRepository
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.datetime.Clock
import org.bson.types.ObjectId
import java.util.*

open class MongoEntityRepository<D : EntityData>(
    private val collection: MongoCollection<Entity<D>>,
    private val clock: Clock
) : EntityRepository<D> {

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
            val id = insertOneResult.insertedId?.asObjectId()?.value?.toString()
                ?: throw IllegalStateException("[CREATE] InsertedId is null after insertOne of $data")
            searchOneById(id)
                ?: throw IllegalStateException("[CREATE] Could not find entity $id after insetOne of $data")
        }

    override suspend fun update(id: String, updates: Map<String, Any>): Entity<D> = collection
        .findOneAndUpdate(
            idFilter(id),
            Updates.combine(
                updates
                    .map { Updates.set(it.key, it.value) }
                    .plus(
                        Updates.set(
                            Entity<D>::metadata / EntityMetadata::modificationsLog / ModificationsLog::updated,
                            buildModificationLog()
                        )
                    )
            ),
            FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER)
        )
        ?: throw IllegalStateException("[UPDATE] $id not found for update")

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
        ?: throw IllegalStateException("[DELETE] $id not found for deletion")

    override suspend fun searchOneById(id: String): Entity<D>? = collection
        .find(idFilter(id))
        .firstOrNull()

    private suspend fun buildModificationLog(): ModificationLog = with(currentCallContext()) {
        ModificationLog(
            timestamp = clock.now(),
            source = source,
            user = user
        )
    }
}
