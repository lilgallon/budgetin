package dev.gallon.domain.common

open class EntityService<D : EntityData>(
    private val repository: EntityRepository<D>
) {
    suspend fun create(data: D): Entity<D> = repository.create(data)
    suspend fun update(id: String, data: D): Entity<D> = repository.update(id, data)
    suspend fun delete(id: String): Entity<D> = repository.delete(id)
    suspend fun searchOneById(id: String): Entity<D>? = repository.searchOneById(id)
}
