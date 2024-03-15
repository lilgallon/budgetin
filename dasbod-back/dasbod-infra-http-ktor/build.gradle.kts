plugins {
    alias(libs.plugins.convention.kotlin)
    alias(libs.plugins.ktor)
    alias(libs.plugins.kotlinx.serialization)
}

dependencies {
    implementation(project(":dasbod-domain"))

    implementation(libs.koin.ktor) // to use koin in ktor context, for instance: val something by inject<Something>()
    implementation(libs.ktor.server.core.jvm) // for ktor to work
    implementation(libs.ktor.server.status.pages.jvm) // to handle errors and return specific stuff
    implementation(libs.ktor.server.swagger.jvm) // to generate swagger doc
    implementation(libs.ktor.server.cors.jvm) // for cors management
    implementation(libs.ktor.server.content.negotiation.jvm) // for ktor to know how to serialize stuff
    implementation(libs.ktor.serialization.kotlinx.json.jvm) // for ktor to serialize using json

    // auth
    implementation(libs.ktor.server.auth.jvm) // for auth
    implementation(libs.ktor.server.auth.jwt.jvm) // for auth based on jwt
    implementation(libs.auth0.jwts) // for auth0 jwt verification

    // logging
    implementation(libs.ktor.server.call.logging.jvm) // add logs for ktor
}
