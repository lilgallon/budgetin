package dev.gallon.infra.http.ktor.plugins

import io.ktor.server.application.*
import io.ktor.server.plugins.swagger.*
import io.ktor.server.routing.*

fun Application.configureDocs() {
    routing {
        // OPT + ENTER here to generate doc
        swaggerUI(path = "openapi", swaggerFile = "openapi/documentation.yaml")
    }
}
