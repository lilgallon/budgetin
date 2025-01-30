package conventions

plugins {
    base
}

val appVersion: String? by project

group = "dev.gallon.playground"
version = appVersion ?: "0.0.0-DEV"
