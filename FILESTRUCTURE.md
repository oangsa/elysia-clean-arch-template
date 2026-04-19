# FILESTRUCTURE

Developer reference for this backend using **Clean Architecture**.

## Clean Architecture Rules

1. Dependency direction is inward: `Presentations -> Applications -> Domains`.
2. `Infrastructures` implements contracts from inner layers.
3. `Domains` must not depend on frameworks.
4. Ports/interfaces live in inner layers (`Applications`/`Domains`), adapters live in `Infrastructures`.
5. `index.ts` is the composition root (wiring only, no business logic).

## Runtime

- Bun runtime
- Elysia HTTP framework
- Swagger plugin for API docs

## Documentation

- `docs/Database-Integration.md`: how to implement and wire a real database adapter
- `docs/New-Endpoint-Guide.md`: step-by-step endpoint implementation guide

## Important Structure

### `src/index.ts`

Entry point and dependency wiring:

- instantiates infrastructure adapters
- wires adapters to inner ports (`IConfigurationManager`, `IRepositoryManager`, `IMapperManager`)
- builds core adapters + service manager
- creates and starts `Application`

### `src/Presentations/`

Framework-facing layer (delivery mechanism).

- `Application.ts`: creates Elysia app, Swagger, and starts server
- `Controllers/Core/ControllerBase.ts`: base controller contract
- `Controllers/Core/ControllerManager.ts`: registers all controllers/routes
- `Controllers/Examples/ExampleController.ts`: sample `GET /hello` endpoint
- `Plugins/`: Elysia plugin registrations
- `Validators/`: request/body validation schemas for the presentation layer

### `src/Applications/`

Use case orchestration and service contracts.

- `Services/Core/IConfigurationManager.ts`: application-level configuration port
- `Services/Core/IServiceManager.ts`: aggregated service contract used by presentation layer
- `Services/Examples/IExampleService.ts`: example use case contract
- `Mappers/Core/MapperManager.ts`: centralized mapper aggregation used by services and repositories
- `Mappers/Example/ExampleMapper.ts`: example mapping contract and implementation
- `UseCases/Core/ServiceManager.ts`: concrete service manager (service composition)
- `UseCases/CoreAdapterManager.ts`: bundles shared adapters (config + repositories + mappers)
- `UseCases/Examples/ExampleService.ts`: example use case implementation
- `DataTransferObjects/`: request/response DTOs

### `src/Domains/`

Business-centric contracts and rules.

- `DataTransferObjects/`: DTOs that connect Presentation, Service, and Repository layers. DTO shape should mirror validator schemas.
- `Repositories/Core/IRepositoryManager.ts`: repository boundary contract
- `Exceptions/`: domain exceptions and business errors

DTO example:

```ts
import { DepartmentResponseSchema } from "@/Presentations/Validators/DepartmentSchemaValidation"

export type DepartmentDto = typeof DepartmentResponseSchema.static
```

### `src/Infrastructures/`

Technical implementations and external concerns.

- `Core/ConfigurationManager.ts`: env/config loading adapter implementing application configuration port
- `Database/Core/IDatabaseClient.ts`: framework-agnostic database lifecycle + transaction contract
- `Database/Core/IDatabaseAdapterFactory.ts`: adapter factory contract for any DB framework
- `Database/Core/DatabaseManager.ts`: singleton lifecycle manager for DB adapter instances
- `Database/Templates/FrameworkDatabaseAdapterTemplate.ts`: copy-ready template skeleton for custom adapters
- `Repositories/Core/RepositoryManager.ts`: concrete repository manager
- `Repositories/Example/ExampleRepository.ts`: example repository implementation
- `Repositories/Masters/`: master/reference-data repositories
- `Database/`: db connection/bootstrap
- `Entities/`: database entities shaped like table columns (database-oriented contracts)

### `src/Shared/`

Cross-cutting utilities/types reused across layers.

## Request Flow (Simple)

1. Controller receives HTTP request.
2. Controller calls service via `IServiceManager`.
3. Service executes use case, applies application mappers, and accesses repository contracts.
4. Infrastructure repositories provide data implementations and return database entities.
5. Application mappers convert entities into response DTOs.
6. Controller returns HTTP response.
