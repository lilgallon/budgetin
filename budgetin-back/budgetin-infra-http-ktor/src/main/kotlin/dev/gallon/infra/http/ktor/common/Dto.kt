package dev.gallon.infra.http.ktor.common

import dev.gallon.domain.entities.Entity
import dev.gallon.domain.entities.EntityData

open class Dto<D : EntityData, out C : ComputedFields>(
    open val id: String,
    open val entityData: D,
    open val computedFields: C? = null,
)

interface ComputedFields

@Suppress("UNCHECKED_CAST")
fun <D : Dto<T, C>, T : EntityData, C : ComputedFields> Entity<T>.toDto(): D = Dto<T, C>(
    id = id,
    entityData = data,
) as D
