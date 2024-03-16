package dev.gallon.infra.http.ktor.common

import com.auth0.jwk.JwkProviderBuilder
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.routing.*
import java.util.concurrent.TimeUnit

fun validateCredentials(credential: JWTCredential, audience: String): JWTPrincipal? =
    JWTPrincipal(credential.payload).takeIf {
        credential.payload.audience.contains(audience)
    }

fun Application.configureSecurity(authConfig: AuthConfig) {
    if (authConfig.enabled) {
        val jwkProvider = JwkProviderBuilder(authConfig.issuer)
            .cached(10, 24, TimeUnit.HOURS)
            .rateLimited(10, 1, TimeUnit.MINUTES)
            .build()

        install(Authentication) {
            jwt("auth0") {
                verifier(jwkProvider, authConfig.issuer)
                validate { credential -> validateCredentials(credential, authConfig.audience) }
            }
        }
    }
}

fun Route.protected(config: AuthConfig, block: Route.() -> Unit) {
    if (config.enabled) {
        authenticate("auth0") {
            block()
        }
    } else {
        block()
    }
}
