package dev.gallon.infra.http.ktor

import dev.gallon.infra.http.ktor.plugins.*
import io.ktor.server.application.*

fun Application.configureKtorHttpServer() {
    configureSecurity()
    configureHTTP()
    configureErrors()
    configureMonitoring()
    configureSerialization()
    configureRouting()
    configureDocs()
}
