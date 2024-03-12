package dev.gallon.domain

import kotlinx.datetime.Instant

sealed class Entity(
    open val id: String,
    open val metadata: Metadata
)

data class Metadata(
    val modificationsLog: ModificationsLog,
    val owner: String
)

data class ModificationsLog(
    val created: ModificationLog,
    val updated: ModificationLog,
    val deleted: ModificationLog,
)

data class ModificationLog(
    val timestamp: Instant,
    val source: String,
    val user: String
)
