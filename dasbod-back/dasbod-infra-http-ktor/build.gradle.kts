plugins {
    alias(libs.plugins.convention.kotlin)
    alias(libs.plugins.ktor)
    alias(libs.plugins.kotlinx.serialization)
}

dependencies {
    implementation(project(":dasbod-domain"))
    implementation(libs.koin.core)
    implementation(libs.koin.ktor)
    implementation(libs.ktor.server.core.jvm)
    implementation(libs.ktor.server.auth.jvm)
    implementation(libs.ktor.server.auth.jwt.jvm)
    implementation(libs.ktor.server.resources)
    implementation(libs.ktor.server.host.common.jvm)
    implementation(libs.ktor.server.status.pages.jvm)
    implementation(libs.ktor.server.cors.jvm)
    implementation(libs.ktor.server.swagger.jvm)
    implementation(libs.ktor.server.call.logging.jvm)
    implementation(libs.ktor.server.content.negotiation.jvm)
    implementation(libs.ktor.serialization.kotlinx.json.jvm)
    implementation(libs.log4j.core)
    implementation(libs.log4j.slf4j2)
    implementation(libs.log4j.kotlin)
    implementation(libs.auth0.jwts)
}
