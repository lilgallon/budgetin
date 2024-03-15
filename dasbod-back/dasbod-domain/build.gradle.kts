plugins {
    alias(libs.plugins.convention.kotlin)
    alias(libs.plugins.kotlinx.serialization)
}

dependencies {
    testImplementation(libs.kotlin.test)
    testImplementation(libs.kotest)
    testImplementation(libs.kotlinx.serialization.json)
}
