package dev.gallon.domain.entities

import kotlinx.datetime.Instant
import kotlinx.serialization.Serializable

@Serializable
sealed interface EntityData

// @Serializable(with = EntitySerializer::class)
@Serializable
data class Entity<T : EntityData>(
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
