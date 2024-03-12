package dev.gallon.domain

data class Reference<T : Entity>(
    val id: String,
    val type: String
)

inline fun <reified T : Entity> T.toReference(): Reference<T> =
    Reference(id, this::class.simpleName!!)
