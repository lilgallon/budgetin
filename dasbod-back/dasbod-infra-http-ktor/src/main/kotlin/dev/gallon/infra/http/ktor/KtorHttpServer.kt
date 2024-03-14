package dev.gallon.infra.http.ktor

import dev.gallon.infra.http.ktor.budget.configureBudgetRouting
import dev.gallon.infra.http.ktor.common.*
import io.ktor.server.application.*

fun Application.configureKtorHttpServer(
    config: HttpServerConfig
) {
    if (config.authEnabled) {
        configureSecurity()
    }
    configureHTTP()
    configureErrors()
    configureMonitoring()
    configureSerialization()
    configureCommonRouting()
    configureBudgetRouting()
    configureDocs()
}
