package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.budget.BudgetPlan
import dev.gallon.domain.budget.BudgetPlanService
import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.resources.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import kotlinx.serialization.Serializable
import org.koin.ktor.ext.inject

@Serializable
@Resource("/budgetPlans")
class BudgetPlans {
    @Resource("{id}")
    class Id(val id: String)
}

fun Application.configureBudgetPlanRouting() {
    val budgetPlanService by inject<BudgetPlanService>()

    routing {
//        authenticate("auth0") {
            get<BudgetPlans> {
                // get all
                call.respondText("list")
            }
            get<BudgetPlans.Id> { request ->
                budgetPlanService
                    .searchOneById(request.id)
                    ?.let { entity ->
                        call.respond(
                            HttpStatusCode.OK,
                            entity
                        )
                    }
                    ?: call.respond(HttpStatusCode.NotFound)
            }
            post<BudgetPlans> {
                call.respond(
                    HttpStatusCode.Created,
                    budgetPlanService.create(
                        data = call.receive<BudgetPlan>()
                    )
                )
            }
            put<BudgetPlans.Id> { request ->
                call.respond(
                    HttpStatusCode.OK,
                    budgetPlanService.update(
                        id = request.id,
                        data = call.receive<BudgetPlan>()
                    )
                )
            }
            delete<BudgetPlans.Id> { request ->
                call.respond(
                    HttpStatusCode.OK,
                    budgetPlanService.delete(
                        id = request.id
                    )
                )
            }
//        }
    }
}
