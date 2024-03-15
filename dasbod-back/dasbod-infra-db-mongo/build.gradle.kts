plugins {
    alias(libs.plugins.convention.kotlin)
}

dependencies {
    implementation(project(":dasbod-domain"))

    implementation(libs.mongodb.kotlin)
    implementation(libs.mongodb.bson.kotlinx)

    testImplementation("org.testcontainers:testcontainers:1.19.7")
    testImplementation("org.testcontainers:junit-jupiter:1.19.7")
    testImplementation("org.testcontainers:mongodb:1.19.7")
}
