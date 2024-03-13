package dev.gallon.domain.common

suspend fun <T, R> T.let(block: suspend (T) -> R): R {
    return block(this)
}
