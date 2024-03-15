plugins {
    alias(libs.plugins.convention.kotlin)
    alias(libs.plugins.kotlinx.serialization)
}

dependencies {
    testImplementation(libs.kotlinx.serialization.json)
}
