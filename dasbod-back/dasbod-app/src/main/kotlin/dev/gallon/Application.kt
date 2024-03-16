package dev.gallon

import dev.gallon.infra.http.ktor.configureKtorHttpServer
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.koin.ktor.ext.inject
import org.koin.ktor.plugin.Koin

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::main)
        .start(wait = true)
}

fun Application.main(config: AppConfig? = null) {
    install(Koin) {
        modules(
            AppModules.common + AppModules.configModule(config) + AppModules.mongo + AppModules.services,
        )
    }

    val appConfig by inject<AppConfig>()
    configureKtorHttpServer(appConfig.httpServerConfig)
}
