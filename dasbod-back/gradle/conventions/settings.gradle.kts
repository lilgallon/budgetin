rootProject.name = "conventions"

dependencyResolutionManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }

    versionCatalogs {
        create("libs") {
            from(files("../libs.versions.toml"))
        }
    }
}

include(
    "versioning",
    "kotlin",
    "settings"
)

enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")
