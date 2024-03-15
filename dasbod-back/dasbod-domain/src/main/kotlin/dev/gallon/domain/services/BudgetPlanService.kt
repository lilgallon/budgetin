package dev.gallon.domain.services

import dev.gallon.domain.repositories.BudgetPlanEntityRepository
import dev.gallon.domain.entities.BudgetPlan

class BudgetPlanService(
    repository: BudgetPlanEntityRepository
) : EntityService<BudgetPlan>(repository)
