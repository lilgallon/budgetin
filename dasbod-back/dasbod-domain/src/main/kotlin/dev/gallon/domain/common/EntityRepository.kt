package dev.gallon.domain.common

interface EntityRepository<D : EntityData> {
    suspend fun create(data: D): Entity<D>
    suspend fun update(id: String, data: D): Entity<D>
    suspend fun delete(id: String): Entity<D>
    suspend fun searchOneById(id: String): Entity<D>?
}
