rootProject.name = "dasbod-back"

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
    "dasbod-app",
    "dasbod-domain",
    "dasbod-infra-http-ktor"
)
