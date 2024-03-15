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
    implementation(libs.hoplite.core)
    implementation(libs.hoplite.yaml)

    // mongo
    implementation(project(":dasbod-infra-db-mongo"))
    implementation(libs.mongodb.kotlin)

    // ktor
    implementation(project(":dasbod-infra-http-ktor"))
    implementation(libs.ktor.server.core.jvm)
    implementation(libs.ktor.server.netty.jvm)
    implementation(libs.ktor.serialization.kotlinx.json.jvm)

    // di
    implementation(libs.koin.core)
    implementation(libs.koin.ktor)

    // test
    testImplementation(libs.ktor.client.content.negociation)
    testImplementation(libs.ktor.server.tests.jvm)
    testImplementation("io.ktor:ktor-server-test-host-jvm:2.3.8")
}
