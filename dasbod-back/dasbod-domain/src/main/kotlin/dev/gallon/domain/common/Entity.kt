package dev.gallon.domain.common

import kotlinx.datetime.Instant
import kotlinx.serialization.Contextual
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

interface EntityData

@Serializable(with = EntitySerializer::class)
data class Entity<T : EntityData>(
    @SerialName("_id")
    @Contextual
    val id: String,
    val metadata: EntityMetadata,
    val data: T
)

@Serializable
data class EntityMetadata(
    val modificationsLog: ModificationsLog,
    val owner: String
)

@Serializable
data class ModificationsLog(
    val created: ModificationLog,
    val updated: ModificationLog? = null,
    val deleted: ModificationLog? = null
)

@Serializable
data class ModificationLog(
    val timestamp: Instant,
    val source: String,
    val user: String
)
