package dev.gallon.domain.common

import kotlinx.datetime.Instant

interface EntityData

data class Entity<T : EntityData>(
    val id: String,
    val metadata: EntityMetadata,
    val data: T
)

data class EntityMetadata(
    val modificationsLog: ModificationsLog,
    val owner: String
)

data class ModificationsLog(
    val created: ModificationLog,
    val updated: ModificationLog? = null,
    val deleted: ModificationLog? = null
)

data class ModificationLog(
    val timestamp: Instant,
    val source: String,
    val user: String
)
