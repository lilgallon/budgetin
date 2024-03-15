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
    implementation(lib("log4j.core"))
    implementation(lib("log4j.slf4j2"))

    // test
    testImplementation(lib("kotest"))
    testImplementation(platform("org.junit:junit-bom:5.10.2"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
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
