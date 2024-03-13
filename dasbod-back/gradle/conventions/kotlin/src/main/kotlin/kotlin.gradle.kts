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

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.6.0-RC.2")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.6.3")
}
