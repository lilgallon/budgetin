package dev.gallon.infra.db.mongo.common

import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoCollection
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import dev.gallon.domain.entities.Entity
import dev.gallon.domain.entities.EntityData
import org.bson.codecs.configuration.CodecRegistries
import org.bson.conversions.Bson
import org.bson.types.ObjectId
import java.util.*
import kotlin.reflect.KProperty

operator fun <A, B> KProperty<A>.div(other: KProperty<B>): String =
    "${this.name}.${other.name}"

operator fun <A> String.div(other: KProperty<A>): String =
    "$this.${other.name}"

operator fun String.div(other: String): String =
    "$this.$other"

fun idFilter(id: String): Bson = Filters.eq("_id", ObjectId(id))

inline fun <reified D : EntityData> MongoDatabase.getCollection(): MongoCollection<Entity<D>> =
    withCodecRegistry(
        CodecRegistries.fromRegistries(
            CodecRegistries.fromProviders(MongoEntityCodecProvider()),
            MongoClientSettings.getDefaultCodecRegistry()
        )
    ).getCollection<Entity<D>>(D::class.java.simpleName.replaceFirstChar { it.lowercase(Locale.getDefault()) })

