package dev.gallon.infra.http.ktor.budget

import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.services.BudgetPlanService
import dev.gallon.infra.http.ktor.common.logger
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import org.koin.ktor.ext.inject


fun Route.configureBudgetPlanRouting() {
    logger.info("BudgetPlan routing init")
    val budgetPlanService by inject<BudgetPlanService>()

    route("/budgetPlan") {
        get {
            call.respondText("list")
        }

        post {
            call.respond(
                HttpStatusCode.Created,
                budgetPlanService.create(
                    data = call.receive<BudgetPlan>()
                )
            )
        }

        route("/{id}") {
            get {
                val id = call.parameters["id"]!!
                budgetPlanService
                    .searchOneById(id)
                    ?.let { entity ->
                        call.respond(
                            HttpStatusCode.OK,
                            entity
                        )
                    }
                    ?: call.respond(HttpStatusCode.NotFound)
            }

            put {
                val id = call.parameters["id"]!!
                call.respond(
                    HttpStatusCode.OK,
                    budgetPlanService.update(
                        id = id,
                        data = call.receive<BudgetPlan>()
                    )
                )
            }
            delete {
                val id = call.parameters["id"]!!
                call.respond(
                    HttpStatusCode.OK,
                    budgetPlanService.delete(
                        id = id
                    )
                )
            }
        }
    }

}
