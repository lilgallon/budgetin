package dev.gallon

import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import com.sksamuel.hoplite.ConfigLoaderBuilder
import com.sksamuel.hoplite.addResourceSource
import dev.gallon.domain.repositories.BudgetCategoryEntityRepository
import dev.gallon.domain.repositories.BudgetPlanEntityRepository
import dev.gallon.domain.repositories.BudgetTransactionEntityRepository
import dev.gallon.domain.services.BudgetCategoryService
import dev.gallon.domain.services.BudgetPlanService
import dev.gallon.domain.services.BudgetTransactionService
import dev.gallon.infra.db.mongo.budget.*
import kotlinx.datetime.Clock
import org.koin.dsl.module

object AppModules {
    val common = module {
        single<Clock> { Clock.System }
    }

    fun configModule(appConfig: AppConfig? = null) = module {
        single {
            appConfig ?: ConfigLoaderBuilder
                .default()
                .addResourceSource("/app-config.yaml")
                .build()
                .loadConfigOrThrow<AppConfig>()
        }
    }

    val mongo = module {
        single<MongoDatabase> {
            val databaseConfig = get<AppConfig>().databaseConfig
            MongoClient.create(databaseConfig.uri)
                .getDatabase(databaseConfig.dbName)
        }
        single<BudgetPlanEntityRepository> { BudgetPlanMongoRepository(get(), get()) }
        single<BudgetCategoryEntityRepository> { BudgetCategoryMongoRepository(get(), get()) }
        single<BudgetTransactionEntityRepository> { BudgetTransactionMongoRepository(get(), get()) }
    }

    val services = module {
        single { BudgetPlanService(get()) }
        single { BudgetCategoryService(get()) }
        single { BudgetTransactionService(get()) }
    }
}
