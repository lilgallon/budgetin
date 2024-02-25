package dev.gallon.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.routing.get
import io.ktor.server.sessions.*

data class UserSession(val email: String) : Principal

//TODO: use persistant DB
data class User(val email: String, val password: String)
val users = mutableSetOf<User>()

fun Application.configureSecurity() {
    install(Sessions) {
        cookie<UserSession>("user_session") {
            cookie.path = "/"
            cookie.maxAgeInSeconds = 60
        }
    }

    install(Authentication) {
        form("sign-in-form") {
            userParamName = "email"
            passwordParamName = "password"
            validate { credentials ->
                if (users.any { it.email == credentials.name && it.password == credentials.password }) {
                    UserIdPrincipal(credentials.name)
                } else {
                    null
                }
            }
            challenge {
                call.respond(HttpStatusCode.Unauthorized, "Credentials are not valid")
            }
        }
        form("sign-up-form") {
            userParamName = "email"
            passwordParamName = "password"
            validate { credentials ->
                if (users.any { it.email == credentials.name }) {
                    null
                } else {
                    users.add(User(credentials.name, credentials.password))
                    UserIdPrincipal(credentials.name)
                }
            }
            challenge {
                call.respond(HttpStatusCode.BadRequest, "Bad request")
            }
        }
        session<UserSession>("auth-session") {
            validate { session ->
                if(session.email.startsWith("lili")) {
                    session
                } else {
                    null
                }
            }
            challenge {
                call.respond(HttpStatusCode.Unauthorized, "Invalid session")
            }
        }
    }

    routing {
        authenticate("sign-in-form") {
            post("/sign-in") {
                val email = call.principal<UserIdPrincipal>()?.name.toString()
                call.sessions.set(UserSession(email = email))
                call.respond(HttpStatusCode.OK)
            }
        }
        authenticate("sign-up-form") {
            post("/sign-up") {
                val email = call.principal<UserIdPrincipal>()?.name.toString()
                call.sessions.set(UserSession(email = email))
                call.respond(HttpStatusCode.OK)
            }
        }

        authenticate("auth-session") {
            get("/hello") {
                val userSession = call.principal<UserSession>()
                call.respondText("Hello, ${userSession?.email}!")
            }
        }

        get("/logout") {
            call.sessions.clear<UserSession>()
            call.respond(HttpStatusCode.OK)
        }
    }
}
