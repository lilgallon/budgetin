package dev.gallon.domain.common

import dev.gallon.domain.entities.Entity
import dev.gallon.domain.entities.EntityData
import kotlinx.serialization.Serializable
import kotlin.reflect.KClass

@Serializable
data class Ref<D : EntityData>(
    val id: String,
    val type: String,
)

fun <D : EntityData> buildRef(clazz: KClass<out D>, id: String): Ref<D> =
    Ref(id, clazz::class.java.simpleName)

inline fun <reified D : EntityData> D.toRef(id: String): Ref<D> =
    buildRef(D::class, id)

inline fun <reified D : EntityData, E : Entity<D>> E.toRef(): Ref<D> =
    data.toRef(id)
