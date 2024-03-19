# dasbod

[![Dasbod Back CI](https://github.com/lilgallon/dasbod/actions/workflows/ci-back.yml/badge.svg?event=push)](https://github.com/lilgallon/dasbod/actions/workflows/ci-back.yml)
[![Dasbod Front CI](https://github.com/lilgallon/dasbod/actions/workflows/ci-front.yml/badge.svg?event=push)](https://github.com/lilgallon/dasbod/actions/workflows/ci-front.yml)

Your modular dashboard

## 1. Overview

### 1.1. Budget module

*work in progress*

## 2. Deployment

*work in progress*

## 3. Stack

### 3.1. CI

- Build / test: `github actions` - https://github.com/features/actions
- Code quality:
  - `qodana` - https://www.jetbrains.com/qodana/
  - `sonarcloud` - https://docs.sonarsource.com/sonarcloud/

### 3.2. Backend

- HTTP Server: `ktor` - https://ktor.io/
- DI: `koin` - https://insert-koin.io/
- Serialization: `kotlinx.serialization` - https://github.com/Kotlin/kotlinx.serialization
- Auth: `auth0` - https://auth0.com/
- Db: `official kotlin driver` - https://www.mongodb.com/docs/drivers/kotlin-drivers/
- Testing:
  - `kotest` - https://kotest.io/
  - `junit 5` - https://junit.org/junit5/docs/current/user-guide/
  - `test-containers` - https://java.testcontainers.org/
- config: `hoplite` - https://github.com/sksamuel/hoplite
- formatting: `ktlint` - https://pinterest.github.io/ktlint/latest/

Using gradle 8 with the best practices
- convention plugins for common gradle configuration
- version catalog

### 3.3. Frontend
- Framework:
  - `react 18` - https://react.dev/
  - `nextjs` - https://nextjs.org/
- Styling / components:
  - `tailwind` - https://tailwindcss.com/
  - `shadcn` - https://ui.shadcn.com/
- Formatting:
  - `eslint` - https://eslint.org/
  - `prettier` - https://prettier.io/
