package dev.gallon

import com.sksamuel.hoplite.ConfigLoaderBuilder
import com.sksamuel.hoplite.addResourceSource
import dev.gallon.domain.budget.BudgetPlanEntityRepository
import dev.gallon.domain.budget.BudgetPlanService
import dev.gallon.infra.mongodb.budget.BudgetPlanMongoRepository
import kotlinx.datetime.Clock
import org.koin.dsl.module

object AppModules {

    val common = module {
        single { Clock.System }
        single {
            ConfigLoaderBuilder.default()
                .addResourceSource("/app-config.yaml")
                .build()
                .loadConfigOrThrow<AppConfig>()
        }
    }

    val mongoRepositories = module {
        single<BudgetPlanEntityRepository> { BudgetPlanMongoRepository(get(), get()) }
    }

    val services = module {
        single { BudgetPlanService(get()) }
    }
}
