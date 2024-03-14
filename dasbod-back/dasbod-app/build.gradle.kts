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
    implementation(project(":dasbod-infra-http-ktor"))
    implementation(libs.ktor.server.core.jvm)
    implementation(libs.ktor.server.netty.jvm)
    implementation(libs.log4j.core)
    implementation(libs.log4j.slf4j2)
    implementation(libs.koin.core)
    implementation(libs.koin.ktor)
}
