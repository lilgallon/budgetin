package dev.gallon.domain.repositories

import dev.gallon.domain.entities.Entity
import dev.gallon.domain.entities.EntityData

interface EntityRepository<D : EntityData> {
    suspend fun create(data: D): Entity<D>
    suspend fun update(id: String, updates: Map<String, Any>): Entity<D>
    suspend fun update(id: String, data: D): Entity<D>
    suspend fun delete(id: String): Entity<D>
    suspend fun searchOneById(id: String): Entity<D>?
}
