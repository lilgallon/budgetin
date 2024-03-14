package dev.gallon.domain.budget

import dev.gallon.domain.common.EntityService

class BudgetPlanService(
    repository: BudgetPlanEntityRepository
) : EntityService<BudgetPlan>(repository)
