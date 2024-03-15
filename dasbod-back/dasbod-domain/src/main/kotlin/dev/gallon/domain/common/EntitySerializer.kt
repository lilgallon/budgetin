package dev.gallon.domain.common

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*
import kotlinx.serialization.serializer

class EntitySerializer<T : EntityData>(private val dataSerializer: KSerializer<T>) : KSerializer<Entity<T>> {
    private val entityMetadataSerializer = serializer<EntityMetadata>()

    override val descriptor: SerialDescriptor = buildClassSerialDescriptor(
        "EntitySerializer"
    ) {
        element<String>("id")
        element("metadata", entityMetadataSerializer.descriptor)
        element("data", dataSerializer.descriptor)
    }

    override fun serialize(encoder: Encoder, value: Entity<T>) = encoder.encodeStructure(descriptor) {
        encodeStringElement(descriptor, 0, value.id)
        encodeSerializableElement(descriptor, 1, entityMetadataSerializer, value.metadata)
        encodeSerializableElement(descriptor, 2, dataSerializer, value.data)
    }
    @OptIn(ExperimentalSerializationApi::class)
    override fun deserialize(decoder: Decoder): Entity<T> =
        decoder.decodeStructure(descriptor) {
            var id: String? = null
            var metadata: EntityMetadata? = null
            var data: T? = null

            if (decodeSequentially()) {
                id = decodeStringElement(descriptor, 0)
                metadata = decodeSerializableElement(descriptor, 1, entityMetadataSerializer)
                data = decodeSerializableElement(descriptor, 2, dataSerializer)
            } else while (true) {
                when (val index = decodeElementIndex(descriptor)) {
                    0 -> id = decodeStringElement(descriptor, 0)
                    1 -> metadata = decodeSerializableElement(descriptor, 1, entityMetadataSerializer)
                    2 -> data = decodeSerializableElement(descriptor, 2, dataSerializer)
                    CompositeDecoder.DECODE_DONE -> break
                    else -> error("Unexpected index: $index")
                }
            }
            require(id != null && metadata != null && data != null)
            Entity(id, metadata, data)
        }
}
