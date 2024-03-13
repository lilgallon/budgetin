package conventions

plugins {
    // Currently, it is not possible to use version catalogs here…
    kotlin("jvm")
    id("conventions.versioning")
    id("org.jlleitschuh.gradle.ktlint")
}

repositories {
    mavenCentral()
    google()
}

fun Project.versionCatalog(): VersionCatalog = extensions
    .getByType<VersionCatalogsExtension>()
    .named("libs")

dependencies {
    // https://github.com/gradle/gradle/issues/15383
    // https://github.com/gradle/gradle/issues/17963
    implementation(versionCatalog().findLibrary("kotlinx.coroutines").get().get())
    implementation(versionCatalog().findLibrary("kotlinx.datetime").get().get())
    implementation(versionCatalog().findLibrary("kotlinx.serialization").get().get())
}
