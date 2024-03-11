package dev.gallon.infra.http.ktor.plugins

import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.resources.*
import io.ktor.server.resources.Resources
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Application.configureRouting() {
    install(Resources)

    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        get<Articles> { article ->
            // Get all articles ...
            call.respond("List of articles sorted starting from ${article.sort}")
        }
    }

    routing {
        get("/api/messages/public") {
            call.respondText(
                """{"message": "The API doesn't require an access token to share this message."}""",
                contentType = ContentType.Application.Json
            )
        }
    }

    routing {
        authenticate("auth0") {
            get("/api/messages/protected") {
                call.respondText(
                    """{"message": "The API successfully validated your access token."}""",
                    contentType = ContentType.Application.Json
                )
            }
        }
    }

    routing {
        authenticate("auth0") {
            get("/api/messages/admin") {
                call.respondText(
                    """{"message": "The API successfully recognized you as an admin."}""",
                    contentType = ContentType.Application.Json
                )
            }
        }
    }
}

@Serializable
@Resource("/articles")
class Articles(val sort: String? = "new")
