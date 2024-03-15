package dev.gallon.domain.services

import dev.gallon.domain.entities.BudgetPlan
import dev.gallon.domain.repositories.BudgetPlanEntityRepository

class BudgetPlanService(
    repository: BudgetPlanEntityRepository,
) : EntityService<BudgetPlan>(repository)
