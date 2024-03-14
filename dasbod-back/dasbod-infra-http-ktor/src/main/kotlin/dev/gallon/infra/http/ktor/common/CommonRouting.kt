package dev.gallon.infra.http.ktor.common

import io.ktor.server.application.*
import io.ktor.server.resources.*

fun Application.configureCommonRouting() {
    install(Resources)
}
