package dev.gallon.infra.http.ktor

import dev.gallon.infra.http.ktor.budget.configureBudgetRouting
import dev.gallon.infra.http.ktor.common.*
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.configureKtorHttpServer(
    config: HttpServerConfig,
) {
    configureSecurity(config.authConfig)
    configureHTTP()
    configureErrors()
    configureMonitoring()
    configureSerialization()
    configureAppRouting(config.authConfig)
    configureDocs()
}

fun Application.configureAppRouting(config: AuthConfig) {
    routing {
        protected(config) {
            configureBudgetRouting()
        }
    }
}
