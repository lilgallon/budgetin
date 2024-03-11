package dev.gallon

import dev.gallon.infra.http.ktor.KtorHttpServer
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = KtorHttpServer::build)
        .start(wait = true)
}
