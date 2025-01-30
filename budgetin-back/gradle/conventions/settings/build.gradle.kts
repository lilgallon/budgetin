plugins {
    `kotlin-dsl`
}

group = "settings"

dependencies {
    implementation(libs.gradle.enterprise) // it consumes the version catalog
}
