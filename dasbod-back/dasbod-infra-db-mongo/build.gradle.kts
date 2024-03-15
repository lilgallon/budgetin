plugins {
    alias(libs.plugins.convention.kotlin)
}

dependencies {
    implementation(project(":dasbod-domain"))

    implementation(libs.mongodb.kotlin) // for mongo driver to work
    implementation(libs.mongodb.bson.kotlinx) // for kotlin types to be serialized

    testImplementation(libs.testcontainers) // to run containers in tests
    testImplementation(libs.testcontainers.junit.jupiter) // wrapper for tests-containers to work with junit jupiter
    testImplementation(libs.testcontainers.mongodb) // support for mongo containers
}
