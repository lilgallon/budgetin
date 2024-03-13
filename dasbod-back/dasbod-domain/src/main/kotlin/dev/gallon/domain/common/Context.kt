package dev.gallon.domain.common

import kotlin.coroutines.AbstractCoroutineContextElement
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.coroutineContext

data class CallContext(
    val user: String,
    val source: String
) : AbstractCoroutineContextElement(CallContext) {
    companion object Key : CoroutineContext.Key<CallContext>
}

private val defaultCallContext = CallContext(user = "system", source = "system")

suspend fun currentCallContext(): CallContext =
    coroutineContext[CallContext] ?: defaultCallContext
