# New Endpoint and Service Implementation Guide

Use this checklist when adding a new feature endpoint and its service.

## Flow Summary

1. Add validator schema in `Presentations`.
2. Add request/response DTO aliases in `Applications/DataTransferObjects`.
3. Add infrastructure entity in `Infrastructures/Entities`.
4. Add repository contract in `Domains/Repositories`.
5. Add repository implementation in `Infrastructures/Repositories`.
6. Add mapper in `Applications/Mappers`.
7. Add service contract and use case in `Applications/Services` and `Applications/UseCases`.
8. Register repository, mapper, service, and controller in registries.
9. Expose contracts through manager interfaces.
10. Add unit tests using layered mocks in `src/Unittests`.

---

## Step 1: Add Validator Schema

Create schemas in `src/Presentations/Validators/<Feature>/`.

Example:

```src/Presentations/Validators/Feature/FeatureResponseSchema.ts#L1-9
import { t } from "elysia";

export const FeatureResponseSchema = t.Object({
	id: t.String({ format: "uuid" }),
	name: t.String(),
	createdAt: t.String({ format: "date-time" }),
});
```

---

## Step 2: Add DTO Types

Create DTO aliases in `src/Applications/DataTransferObjects/<Feature>/`.

```src/Applications/DataTransferObjects/Feature/FeatureDto.ts#L1-3
import { FeatureResponseSchema } from "../../../Presentations/Validators/Feature/FeatureResponseSchema";

export type FeatureDto = typeof FeatureResponseSchema.static;
```

---

## Step 3: Add Infrastructure Entity

Create entity in `src/Infrastructures/Entities/<Feature>/<Feature>Entity.ts`.

```src/Infrastructures/Entities/Feature/FeatureEntity.ts#L1-6
export interface FeatureEntity
{
	id: string;
	name: string;
	createdAt: string;
}
```

---

## Step 4: Add Repository Contract

Create contract in `src/Domains/Repositories/<Feature>/IFeatureRepository.ts`.

```src/Domains/Repositories/Feature/IFeatureRepository.ts#L1-8
import { FeatureEntity } from "../../../Infrastructures/Entities/Feature/FeatureEntity";

export interface IFeatureRepository
{
	GetById(id: string): Promise<FeatureEntity | null>;
}
```

---

## Step 5: Implement Repository

Create repository in `src/Infrastructures/Repositories/<Feature>/FeatureRepository.ts`.

```src/Infrastructures/Repositories/Feature/FeatureRepository.ts#L1-16
import { IFeatureRepository } from "../../../Domains/Repositories/Feature/IFeatureRepository";
import { FeatureEntity } from "../../Entities/Feature/FeatureEntity";

export class FeatureRepository implements IFeatureRepository
{
	public async GetById(id: string): Promise<FeatureEntity | null>
	{
		void id;

		return null;
	}
}
```

Then register it in:

- `src/Infrastructures/Repositories/Core/RepositoryRegistry.ts`
- `src/Domains/Repositories/Core/IRepositoryManager.ts`

---

## Step 6: Add Mapper

Create mapper in `src/Applications/Mappers/<Feature>/FeatureMapper.ts`.

```src/Applications/Mappers/Feature/FeatureMapper.ts#L1-24
import { FeatureDto } from "../../DataTransferObjects/Feature/FeatureDto";
import { FeatureEntity } from "../../../Infrastructures/Entities/Feature/FeatureEntity";

export interface IFeatureMapper
{
	FeatureEntityToDto(featureEntity: FeatureEntity): FeatureDto;
}

export class FeatureMapper implements IFeatureMapper
{
	public FeatureEntityToDto(featureEntity: FeatureEntity): FeatureDto
	{
		return {
			id: featureEntity.id,
			name: featureEntity.name,
			createdAt: featureEntity.createdAt,
		};
	}
}
```

Then register it in:

- `src/Applications/Mappers/Core/MapperRegistry.ts`
- `src/Applications/Mappers/Core/MapperManager.ts` (`IMapperManager`)

---

## Step 7: Add Service Contract and Use Case

Create service contract in `src/Applications/Services/<FeaturePlural>/IFeatureService.ts`.

```src/Applications/Services/Features/IFeatureService.ts#L1-6
import { FeatureDto } from "../../DataTransferObjects/Feature/FeatureDto";

export interface IFeatureService
{
	GetById(id: string): Promise<FeatureDto>;
}
```

Create service implementation in `src/Applications/UseCases/<FeaturePlural>/FeatureService.ts`.

```src/Applications/UseCases/Features/FeatureService.ts#L1-35
import { IRepositoryManager } from "../../../Domains/Repositories/Core/IRepositoryManager";
import { DomainNotFoundException } from "../../../Domains/Exceptions/DomainNotFoundException";
import { IMapperManager } from "../../Mappers/Core/MapperManager";
import { FeatureDto } from "../../DataTransferObjects/Feature/FeatureDto";
import { IFeatureService } from "../../Services/Features/IFeatureService";
import { ICoreAdapterManager } from "../CoreAdapterManager";

export class FeatureService implements IFeatureService
{
	private readonly _repositoryManager: IRepositoryManager;
	private readonly _mapperManager: IMapperManager;

	constructor(coreAdapterManager: ICoreAdapterManager)
	{
		this._repositoryManager = coreAdapterManager.repositoryManager;
		this._mapperManager = coreAdapterManager.mapperManager;
	}

	public async GetById(id: string): Promise<FeatureDto>
	{
		const featureEntity = await this._repositoryManager.featureRepository.GetById(id);

		if (featureEntity === null)
		{
			throw new DomainNotFoundException("Feature not found.");
		}

		return this._mapperManager.featureMapper.FeatureEntityToDto(featureEntity);
	}
}
```

Then register it in:

- `src/Applications/UseCases/Core/ServiceRegistry.ts`
- `src/Applications/Services/Core/IServiceManager.ts`

---

## Step 8: Add Controller Endpoint

Create controller in `src/Presentations/Controllers/<FeaturePlural>/FeatureController.ts`.

Use `ExecuteWithHandling(...)` from `ControllerBase` instead of manual try/catch.

```src/Presentations/Controllers/Features/FeatureController.ts#L1-29
import { Elysia } from "elysia";
import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";
import { ControllerBase } from "../Core/ControllerBase";

export class FeatureController extends ControllerBase
{
	constructor(serviceManager: IServiceManager)
	{
		super(serviceManager);
	}

	public RegisterRoutes(app: Elysia<any>): void
	{
		app.get("/features/:id", async ({ params, set }) =>
		{
			return this.ExecuteWithHandling(set, async () =>
			{
				return this._serviceManager.featureService.GetById(params.id);
			});
		});
	}
}
```

Then register it in:

- `src/Presentations/Controllers/Core/ControllerRegistry.ts`

You do not need controller-local exception mapping if default behavior is enough because `ControllerBase` already uses `ExceptionHttpMapper`.

---

## Step 9: Optional Search Endpoint Normalization

For `/search` endpoints, normalize defaults once using:

- `src/Presentations/Controllers/Core/SearchRequestNormalizer.ts`

Example usage:

```src/Presentations/Controllers/Features/FeatureController.ts#L31-47
const normalized = SearchRequestNormalizer.Normalize(requestBody, {
	pageNumber: 1,
	pageSize: 20,
	deleted: false,
});
```

---

## Step 10: Add Unit Tests with Layered Mocks

Add test and mocks under `src/Unittests`:

- `MockRepository/Features/MockFeatureRepository.ts`
- `MockRepository/Core/MockRepositoryManager.ts`
- `MockService/MockICoreAdaptorManager.ts`
- `MockService/MockIServiceManager.ts`
- `FeatureServiceTest.ts`

Recommended test access pattern:

```src/Unittests/FeatureServiceTest.ts#L1-4
const serviceManager = MockIServiceManager.getMock();
const featureService = serviceManager.featureService;
```

---

## New Service Wiring Checklist (Quick)

When you add a brand-new service, update these in order:

1. `src/Applications/Services/<FeaturePlural>/I<Feature>Service.ts`
2. `src/Applications/UseCases/<FeaturePlural>/<Feature>Service.ts`
3. `src/Applications/UseCases/Core/ServiceRegistry.ts`
4. `src/Applications/Services/Core/IServiceManager.ts`
5. Controller usage and route registration (`ControllerRegistry`)
6. Mocks for unit tests (`MockRepositoryManager` and related feature mocks)

---

## Final Checklist

- Validator added
- DTO aliases added
- Infrastructure entity added
- Repository contract + implementation added
- Mapper added and registered
- Service contract + use case added and registered
- Controller added and registered
- Unit tests + layered mocks added
- Typecheck passes (`bunx tsc --noEmit`)
