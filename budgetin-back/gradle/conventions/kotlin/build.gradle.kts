plugins {
    `kotlin-dsl`
    alias(libs.plugins.ktlint)
}
group = "conventions"

dependencies {
    implementation(projects.versioning)
    implementation(libs.gradle.ktlint)
    implementation(libs.gradle.kotlin)
}
