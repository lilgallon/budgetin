package dev.gallon.domain.budget

import dev.gallon.domain.common.Entity
import dev.gallon.domain.common.EntityMetadata
import dev.gallon.domain.common.ModificationLog
import dev.gallon.domain.common.ModificationsLog
import io.kotest.assertions.throwables.shouldNotThrowAny
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlin.test.Test

class BudgetPlanSerializationTest {

    @Test
    fun budgetPlanMarshalling() {
        val entity = Entity(
            id = "xxx",
            metadata = EntityMetadata(
                modificationsLog = ModificationsLog(
                    created = ModificationLog(
                        timestamp = Clock.System.now(),
                        source = "xx",
                        user = "vv"
                    )
                ),
                owner = "sss"
            ),
            data = BudgetPlan(
                moneyAtStart = 0.2f,
                expectedIncome = 0.3f,
                startDate = Clock.System.now().toLocalDateTime(TimeZone.UTC).date,
                endDate = Clock.System.now().toLocalDateTime(TimeZone.UTC).date,
                categories = listOf(
                    BudgetCategory(
                        name = "xfqf",
                        amount = 0.5f
                    )
                )
            )
        )

        shouldNotThrowAny {
            val string = Json.encodeToString(entity)
            Json.decodeFromString<Entity<BudgetPlan>>(string)
        }
    }
}
