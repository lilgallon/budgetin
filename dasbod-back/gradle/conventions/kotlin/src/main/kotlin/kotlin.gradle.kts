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
