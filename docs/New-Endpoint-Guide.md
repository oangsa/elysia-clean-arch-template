# New Endpoint Implementation Guide

Use this checklist when adding a new feature endpoint.

## Flow Summary

1. Add validator schema in `Presentations`.
2. Add response/request DTO aliases in `Applications/DataTransferObjects`.
3. Add infrastructure entity in `Infrastructures/Entities`.
4. Add repository contract in `Domains/Repositories`.
5. Add repository implementation in `Infrastructures/Repositories`.
6. Add mapper in `Applications/Mappers`.
7. Add service contract and use case in `Applications/Services` and `Applications/UseCases`.
8. Register service in `ServiceManager` and expose via `IServiceManager`.
9. Add controller in `Presentations/Controllers` and register in `ControllerManager`.
10. Add unit tests using layered mocks in `src/Unittests`.

## Step 1: Add Validator Schema

Create schemas in `src/Presentations/Validators/<Feature>/`.

Example:

```ts
import { t } from "elysia";

export const FeatureResponseSchema = t.Object({
	id: t.String({ format: "uuid" }),
	name: t.String(),
	createdAt: t.String({ format: "date-time" }),
});
```

## Step 2: Add DTO Types

Create DTO aliases in `src/Applications/DataTransferObjects/<Feature>/`.

```ts
import { FeatureResponseSchema } from "../../../Presentations/Validators/Feature/FeatureResponseSchema";

export type FeatureDto = typeof FeatureResponseSchema.static;
```

## Step 3: Add Database Entity

Create entity in `src/Infrastructures/Entities/<Feature>/<Feature>Entity.ts`.

```ts
export interface FeatureEntity
{
	id: string;
	name: string;
	createdAt: string;
}
```

## Step 4: Add Repository Contract

Create contract in `src/Domains/Repositories/<Feature>/IFeatureRepository.ts`.

```ts
import { FeatureEntity } from "../../../Infrastructures/Entities/Feature/FeatureEntity";

export interface IFeatureRepository
{
	GetById(id: string): Promise<FeatureEntity | null>;
}
```

Then expose it through `IRepositoryManager`.

## Step 5: Implement Repository

Create repository in `src/Infrastructures/Repositories/<Feature>/FeatureRepository.ts`.

```ts
import { IFeatureRepository } from "../../../Domains/Repositories/Feature/IFeatureRepository";
import { FeatureEntity } from "../../Entities/Feature/FeatureEntity";

export class FeatureRepository implements IFeatureRepository
{
	async GetById(id: string): Promise<FeatureEntity | null>
	{
		void id;

		return null;
	}
}
```

Register this repository in `src/Infrastructures/Repositories/Core/RepositoryManager.ts`.

## Step 6: Add Mapper

Create mapper in `src/Applications/Mappers/<Feature>/FeatureMapper.ts`.

```ts
import { FeatureDto } from "../../DataTransferObjects/Feature/FeatureDto";
import { FeatureEntity } from "../../../Infrastructures/Entities/Feature/FeatureEntity";

export interface IFeatureMapper
{
	FeatureEntityToDto(featureEntity: FeatureEntity): FeatureDto;
}

export class FeatureMapper implements IFeatureMapper
{
	FeatureEntityToDto(featureEntity: FeatureEntity): FeatureDto
	{
		return {
			id: featureEntity.id,
			name: featureEntity.name,
			createdAt: featureEntity.createdAt,
		};
	}
}
```

Expose mapper through `MapperManager`.

## Step 7: Add Service Contract and Use Case

Create service contract in `src/Applications/Services/<Feature>/IFeatureService.ts`.

```ts
import { FeatureDto } from "../../DataTransferObjects/Feature/FeatureDto";

export interface IFeatureService
{
	GetById(id: string): Promise<FeatureDto>;
}
```

Create service implementation in `src/Applications/UseCases/<Feature>/FeatureService.ts`.

```ts
import { ICoreAdapterManager } from "../CoreAdapterManager";
import { IFeatureService } from "../../Services/Feature/IFeatureService";
import { FeatureDto } from "../../DataTransferObjects/Feature/FeatureDto";

export class FeatureService implements IFeatureService
{
	private readonly _coreAdapterManager: ICoreAdapterManager;

	constructor(coreAdapterManager: ICoreAdapterManager)
	{
		this._coreAdapterManager = coreAdapterManager;
	}

	async GetById(id: string): Promise<FeatureDto>
	{
		const featureEntity = await this._coreAdapterManager.repositoryManager.featureRepository.GetById(id);

		if (featureEntity === null)
		{
			throw new Error("Feature not found.");
		}

		return this._coreAdapterManager.mapperManager.featureMapper.FeatureEntityToDto(featureEntity);
	}
}
```

Expose new service in:

- `src/Applications/Services/Core/IServiceManager.ts`
- `src/Applications/UseCases/Core/ServiceManager.ts`

## Step 8: Add Controller Endpoint

Create controller in `src/Presentations/Controllers/<Feature>/FeatureController.ts`.

```ts
import { Elysia } from "elysia";
import { ControllerBase } from "../Core/ControllerBase";
import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";

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
			try
			{
				const result = await this._serviceManager.featureService.GetById(params.id);
				set.status = 200;
				return result;
			}
			catch (error)
			{
				return this.handleError(error, set);
			}
		});
	}
}
```

Register it in `src/Presentations/Controllers/Core/ControllerManager.ts`.

## Step 9: Add Unit Tests with Layered Mocks

Add test and mocks under `src/Unittests`:

- `MockRepository/Features/MockFeatureRepository.ts`
- `MockRepository/Core/MockRepositoryManager.ts`
- `MockService/MockICoreAdaptorManager.ts`
- `MockService/MockIServiceManager.ts`
- `<Feature>ServiceTest.ts`

Recommended usage in tests:

```ts
const serviceManager = MockIServiceManager.getMock();
const featureService = serviceManager.featureService;
```

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
