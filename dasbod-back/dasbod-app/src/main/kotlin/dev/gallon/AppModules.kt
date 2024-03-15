package dev.gallon

import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import com.sksamuel.hoplite.ConfigLoaderBuilder
import com.sksamuel.hoplite.addResourceSource
import dev.gallon.domain.repositories.BudgetPlanEntityRepository
import dev.gallon.domain.services.BudgetPlanService
import dev.gallon.infra.db.mongo.budget.BudgetPlanMongoRepository
import kotlinx.datetime.Clock
import org.koin.dsl.module

object AppModules {
    val common = module {
        single<Clock> { Clock.System }
        single {
            ConfigLoaderBuilder.default()
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
    }

    val services = module {
        single { BudgetPlanService(get()) }
    }
}
