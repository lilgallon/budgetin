package dev.gallon.infra.http.ktor.common

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

fun Application.configureErrors() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            logger.error("Error caught", cause)
            call.respondText(text = "500: $cause", status = HttpStatusCode.InternalServerError)
        }
    }
}
