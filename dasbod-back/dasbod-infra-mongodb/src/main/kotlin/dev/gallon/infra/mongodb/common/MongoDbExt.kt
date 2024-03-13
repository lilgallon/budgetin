package dev.gallon.infra.mongodb.common

import com.mongodb.client.model.Filters
import org.bson.conversions.Bson
import org.bson.types.ObjectId
import kotlin.reflect.KProperty

operator fun <A, B> KProperty<A>.div(other: KProperty<B>): String =
    "${this.name}.${other.name}"

operator fun <A> String.div(other: KProperty<A>): String =
    "$this.${other.name}"

operator fun String.div(other: String): String =
    "$this.$other"

fun idFilter(id: String): Bson = Filters.eq("_id", ObjectId(id))
