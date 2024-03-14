package dev.gallon.infra.http.ktor

import dev.gallon.infra.http.ktor.budget.configureBudgetRouting
import dev.gallon.infra.http.ktor.common.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.routing.*

fun Application.configureKtorHttpServer(
    config: HttpServerConfig
) {
    if (config.authConfig.enabled) {
        configureSecurity(config.authConfig)
    }
    configureHTTP()
    configureErrors()
    configureMonitoring()
    configureSerialization()
    configureCommonRouting()
    routing {
        if (config.authConfig.enabled) {
            authenticate("auth0") {
                configureAppRouting()
            }
        } else {
            configureAppRouting()
        }
    }
    configureDocs()
}

fun Route.configureAppRouting() {
    configureBudgetRouting()
}
