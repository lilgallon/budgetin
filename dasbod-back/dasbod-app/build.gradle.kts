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
    implementation(project(":dasbod-infra-mongodb"))
    implementation(libs.mongodb.kotlin)

    // ktor
    implementation(project(":dasbod-infra-http-ktor"))
    implementation(libs.ktor.server.core.jvm)
    implementation(libs.ktor.server.netty.jvm)

    // logging
    implementation(libs.log4j.core)
    implementation(libs.log4j.slf4j2)

    // di
    implementation(libs.koin.core)
    implementation(libs.koin.ktor)

    // test
    testImplementation(libs.ktor.server.tests.jvm)
    testImplementation(libs.kotlin.test)
    testImplementation("io.ktor:ktor-server-test-host-jvm:2.3.8")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:1.9.22")
}
