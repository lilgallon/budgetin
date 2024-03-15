package dev.gallon.domain.common

import kotlinx.serialization.Serializable

@Serializable
data class Reference<D : EntityData>(
    val id: String,
    val type: String
)

inline fun <reified D : EntityData, E : Entity<D>> E.toReference(): Reference<D> =
    Reference(id, D::class.simpleName!!)
