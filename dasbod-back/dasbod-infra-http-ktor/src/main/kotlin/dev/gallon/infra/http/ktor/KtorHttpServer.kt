package dev.gallon.infra.http.ktor

import dev.gallon.infra.http.ktor.plugins.*
import io.ktor.server.application.*

object KtorHttpServer {
    fun build(application: Application) {
        application.configureSecurity()
        application.configureHTTP()
        application.configureErrors()
        application.configureMonitoring()
        application.configureSerialization()
        application.configureRouting()
        application.configureDocs()
    }
}
