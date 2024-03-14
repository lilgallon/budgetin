package dev.gallon.infra.http.ktor.common

data class HttpServerConfig(
    val authConfig: AuthConfig
)

data class AuthConfig(
    val enabled: Boolean,
    val audience: String,
    val issuer: String
)
