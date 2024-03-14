package dev.gallon

import dev.gallon.infra.http.ktor.common.HttpServerConfig

data class AppConfig(
    val httpServerConfig: HttpServerConfig,
    val databaseConfig: DatabaseConfig
)

data class DatabaseConfig(
    val uri: String,
    val dbName: String
)
