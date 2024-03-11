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
    "app"
)
