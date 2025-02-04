package dev.gallon.infra.http.ktor.common

import dev.gallon.domain.entities.EntityData
import kotlinx.serialization.Serializable

@Serializable
abstract class Dto<D : EntityData, out C : ComputedFields> {
    abstract val id: String
    abstract val data: D
    abstract val computedFields: C?
}


interface ComputedFields
