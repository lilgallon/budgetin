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

fun lib(alias: String): MinimalExternalModuleDependency = extensions
    .getByType<VersionCatalogsExtension>()
    .named("libs")
    .findLibrary(alias)
    .get()
    .get()

dependencies {
    // https://github.com/gradle/gradle/issues/15383
    // https://github.com/gradle/gradle/issues/17963

    // kotlinx
    implementation(lib("kotlinx.coroutines"))
    implementation(lib("kotlinx.datetime"))
    implementation(lib("kotlinx.serialization"))

    // logging
    implementation(lib("log4j.core")) // it says how log4j logs should be logged
    implementation(lib("log4j.slf4j2")) // it says how log4j logs should be logged
    implementation(lib("log4j.kotlin")) // kotlin wrapper for to log with log4j

    // test
    testImplementation(lib("kotest")) // kotlin test assertion lib
    testImplementation(platform(lib("junit.bom"))) // it aligns and manage all junit 5 dependency versions
    testImplementation("org.junit.jupiter:junit-jupiter") // junit jupiter
    testRuntimeOnly("org.junit.platform:junit-platform-launcher") // launcher for junit tests
}

tasks {
    test {
        useJUnitPlatform()
        testLogging {
            events("passed", "skipped", "failed")
            showStandardStreams = true
        }
    }
}
