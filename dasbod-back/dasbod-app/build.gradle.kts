plugins {
    alias(libs.plugins.convention.kotlin)
    application
}

application {
    mainClass.set("dev.gallon.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

dependencies {
    // domain
    implementation(project(":dasbod-domain"))

    // config
    implementation(libs.hoplite.core) // makes hoplite work
    implementation(libs.hoplite.yaml) // support for .yaml config files

    // mongo
    implementation(project(":dasbod-infra-db-mongo"))
    implementation(libs.mongodb.kotlin) // to initialize MongoDB client

    // ktor
    implementation(project(":dasbod-infra-http-ktor"))
    implementation(libs.ktor.server.core.jvm) // to start ktor server
    implementation(libs.ktor.server.netty.jvm) // framework on which the ktor server will be running

    // di
    implementation(libs.koin.core) // makes koin work
    implementation(libs.koin.ktor) // adds ktor integration, for intance: by inject<..>()

    // test
    testImplementation(libs.ktor.server.tests.host.jvm) // to start ktor server in tests
    testImplementation(libs.ktor.client.content.negociation) // for ktor to know how to serialize data
    testImplementation(libs.ktor.serialization.kotlinx.json.jvm) // to serialize using json
}
