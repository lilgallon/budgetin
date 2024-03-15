package dev.gallon.infra.db.mongo.common

import dev.gallon.domain.entities.Entity
import dev.gallon.domain.entities.EntityData
import dev.gallon.domain.entities.EntityMetadata
import org.bson.BsonReader
import org.bson.BsonType
import org.bson.BsonWriter
import org.bson.codecs.Codec
import org.bson.codecs.DecoderContext
import org.bson.codecs.EncoderContext
import org.bson.codecs.configuration.CodecProvider
import org.bson.codecs.configuration.CodecRegistry
import org.bson.codecs.kotlinx.BsonConfiguration
import org.bson.codecs.kotlinx.KotlinSerializerCodec
import org.bson.types.ObjectId

private val entityDataCodec = KotlinSerializerCodec.create<EntityData>(
    bsonConfiguration = BsonConfiguration(
    classDiscriminator = "type"
    )
)!!

class MongoEntityCodecProvider : CodecProvider {
    @Suppress("UNCHECKED_CAST")
    override fun <T : Any?> get(clazz: Class<T>?, registry: CodecRegistry): Codec<T>? =
        if (clazz == Entity::class.java) {
            MongoEntityCodec(registry) as Codec<T>
        } else null
}

class MongoEntityDataCodecProvider : CodecProvider {
    @Suppress("UNCHECKED_CAST")
    override fun <T : Any?> get(clazz: Class<T>?, registry: CodecRegistry): Codec<T>? =
        // This is ugly, but it's the only way I found to make sure "_t" field is always set even on child classes
        // For some reason, mongo does not want to use EntityData when marshalling even when we cast objects
        if (EntityData::class.sealedSubclasses.map { it.java.simpleName }.contains(clazz?.simpleName)) {
            entityDataCodec as Codec<T>
        } else null
}

class MongoEntityCodec(registry: CodecRegistry) : Codec<Entity<*>> {
    private val metadataCodec: Codec<EntityMetadata> = registry[EntityMetadata::class.java]

    override fun encode(writer: BsonWriter, entity: Entity<*>, context: EncoderContext?) {
        writer.writeStartDocument()

        writer.writeName("_id")
        writer.writeObjectId(ObjectId(entity.id))

        writer.writeName("metadata")
        metadataCodec.encode(writer, entity.metadata, context)

        writer.writeName("data")
        entityDataCodec.encode(writer, entity.data, context)

        writer.writeEndDocument()
    }

    override fun getEncoderClass(): Class<Entity<*>> = Entity::class.java

    override fun decode(reader: BsonReader, context: DecoderContext): Entity<*> {
        var id: String? = null
        var metadata: EntityMetadata? = null
        var data: EntityData? = null

        reader.readStartDocument()
        while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
            when (reader.readName()) {
                "_id" -> id = reader.readObjectId().toString()
                "metadata" -> metadata = metadataCodec.decode(reader, context)
                "data" -> data = entityDataCodec.decode(reader, context)
            }
        }
        reader.readEndDocument()

        return Entity(
            id = id!!,
            metadata = metadata!!,
            data = data!!
        )
    }
}

