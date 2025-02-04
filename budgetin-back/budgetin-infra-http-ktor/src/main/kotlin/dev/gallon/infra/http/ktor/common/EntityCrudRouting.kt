package dev.gallon.infra.http.ktor.common

import dev.gallon.domain.entities.Entity
import dev.gallon.domain.entities.EntityData
import dev.gallon.domain.services.EntityService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

inline fun <reified D : EntityData, reified DTO : Dto<D, *>> Route.configureEntityCrudRouting(
    service: EntityService<D>,
    crossinline toDto: suspend Entity<D>.() -> DTO,
    crossinline additionalRoutesBuilder: Route.() -> Unit = {},
) {
    val endpoint = D::class.java.simpleName.replaceFirstChar { it.lowercase(Locale.getDefault()) }
    logger.info("$endpoint routing init")
    route("/$endpoint") {
        additionalRoutesBuilder()

        post {
            call.respond(
                HttpStatusCode.Created,
                service.create(
                    data = call.receive<D>(),
                ).toDto(),
            )
        }

        route("/{id}") {
            get {
                val id = call.parameters["id"]!!
                service
                    .searchOneById(id)
                    ?.let { entity ->
                        call.respond(
                            HttpStatusCode.OK,
                            entity.toDto(),
                        )
                    }
                    ?: call.respond(HttpStatusCode.NotFound)
            }

            put {
                val id = call.parameters["id"]!!
                call.respond(
                    HttpStatusCode.OK,
                    service.update(
                        id = id,
                        data = call.receive<D>(),
                    ).toDto(),
                )
            }
            delete {
                val id = call.parameters["id"]!!
                call.respond(
                    HttpStatusCode.OK,
                    service.delete(
                        id = id,
                    ).toDto(),
                )
            }
        }
    }
}
