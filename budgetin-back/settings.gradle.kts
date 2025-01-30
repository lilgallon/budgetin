rootProject.name = "budgetin-back"

pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
    }

    includeBuild("gradle/conventions")
}

plugins {
    id("settings")
}

include(
    "budgetin-app",
    "budgetin-domain",
    "budgetin-infra-http-ktor",
    "budgetin-infra-db-mongo",
)
