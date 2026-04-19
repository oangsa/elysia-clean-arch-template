# Database Integration Guide

This template provides a framework-agnostic database abstraction so each project can plug in any driver/ORM.

## Overview

Core contracts are in:

- `src/Infrastructures/Database/Core/IDatabaseClient.ts`
- `src/Infrastructures/Database/Core/IDatabaseAdapterFactory.ts`
- `src/Infrastructures/Database/Core/DatabaseManager.ts`

Template starter classes are in:

- `src/Infrastructures/Database/Templates/FrameworkDatabaseAdapterTemplate.ts`

## Environment Variables

Set these values before app startup:

- `DATABASE_PROVIDER` (example: `postgres`, `mysql`, `sqlite`, `mongodb`, `custom`)
- `DATABASE_URL` (connection string)

`ConfigurationManager` exposes these values through `configurationManager.database`.

## Step 1: Create a Real Adapter

Create an adapter file, for example:

- `src/Infrastructures/Database/Adapters/PostgresDatabaseAdapter.ts`

Implement `IDatabaseClient` and `IDatabaseAdapterFactory`.

```ts
import { IDatabaseAdapterFactory } from "../Core/IDatabaseAdapterFactory";
import { IDatabaseClient, IDatabaseTransaction } from "../Core/IDatabaseClient";

class PostgresTransaction implements IDatabaseTransaction<unknown>
{
	private readonly _nativeClient: unknown;

	constructor(nativeClient: unknown)
	{
		this._nativeClient = nativeClient;
	}

	get nativeClient(): unknown
	{
		return this._nativeClient;
	}
}

class PostgresDatabaseAdapter implements IDatabaseClient<unknown>
{
	private readonly _nativeClient: unknown;

	constructor(nativeClient: unknown)
	{
		this._nativeClient = nativeClient;
	}

	get nativeClient(): unknown
	{
		return this._nativeClient;
	}

	async connect(): Promise<void>
	{
		// initialize connection pool / client
	}

	async disconnect(): Promise<void>
	{
		// close client / pool
	}

	async testConnection(): Promise<boolean>
	{
		try
		{
			// run lightweight ping query
			return true;
		}
		catch
		{
			return false;
		}
	}

	async runInTransaction<TResult>(
		callback: (transaction: IDatabaseTransaction<unknown>) => Promise<TResult>,
	): Promise<TResult>
	{
		// begin transaction in real implementation
		const tx = new PostgresTransaction(this._nativeClient);
		const result = await callback(tx);
		// commit / rollback in real implementation
		return result;
	}
}

export class PostgresDatabaseAdapterFactory implements IDatabaseAdapterFactory<unknown>
{
	create(connectionString: string, options?: Record<string, unknown>): IDatabaseClient<unknown>
	{
		void connectionString;
		void options;

		// create your native client with driver/ORM of choice
		const nativeClient: unknown = {};

		return new PostgresDatabaseAdapter(nativeClient);
	}
}
```

## Step 2: Initialize Database in Composition Root

Update `src/index.ts` to initialize the adapter during startup.

```ts
import { DatabaseManager } from "./Infrastructures/Database";
import { PostgresDatabaseAdapterFactory } from "./Infrastructures/Database/Adapters/PostgresDatabaseAdapter";

async function bootstrap(): Promise<void>
{
	const configurationManager: IConfigurationManager = new ConfigurationManager();
	const mapperManager = new MapperManager();
	const repositoryManager: IRepositoryManager = new RepositoryManager();

	const databaseClient = DatabaseManager.initialize(
		configurationManager,
		new PostgresDatabaseAdapterFactory(),
	);

	await databaseClient.connect();

	const isConnected = await databaseClient.testConnection();

	if (!isConnected)
	{
		throw new Error("Database connection test failed.");
	}

	const coreAdapterManager = new CoreAdapterManager(configurationManager, repositoryManager, mapperManager);
	const serviceManager = new ServiceManager(coreAdapterManager);
	const app = new Application(configurationManager, serviceManager);

	app.start();
}

bootstrap().catch((error) =>
{
	console.error("Failed to bootstrap application:", error);
	process.exit(1);
});
```

## Step 3: Disconnect Gracefully

On shutdown, disconnect once:

```ts
process.on("SIGTERM", async () =>
{
	await DatabaseManager.disconnect();
	process.exit(0);
});

process.on("SIGINT", async () =>
{
	await DatabaseManager.disconnect();
	process.exit(0);
});
```

## Step 4: Use Adapter from Repositories

Repository implementations should use a concrete DB client (or typed native client) and return infrastructure entities.

Example pattern:

- Entity model in `src/Infrastructures/Entities/<Feature>/<Feature>Entity.ts`
- Query logic in `src/Infrastructures/Repositories/<Feature>/<Feature>Repository.ts`
- Service maps entity to response DTO through `Applications/Mappers`

## Notes

- Keep driver/ORM details inside `Infrastructures` only.
- Keep domain/application contracts free from framework-specific types where possible.
- Repositories should return entities shaped like database tables.
