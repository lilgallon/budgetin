plugins {
    alias(libs.plugins.convention.kotlin)
}

dependencies {
    implementation(project(":dasbod-domain"))

    implementation(libs.mongodb.kotlin)
    implementation(libs.mongodb.bson.kotlinx)
}
