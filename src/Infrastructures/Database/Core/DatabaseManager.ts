import { IConfigurationManager } from "../../../Applications/Services/Core/IConfigurationManager";
import { IDatabaseAdapterFactory } from "./IDatabaseAdapterFactory";
import { IDatabaseClient } from "./IDatabaseClient";

let databaseInstance: IDatabaseClient<unknown> | null = null;

export class DatabaseManager
{
	static initialize(configurationManager: IConfigurationManager, databaseAdapterFactory: IDatabaseAdapterFactory<unknown>, options?: Record<string, unknown>): IDatabaseClient<unknown>
	{
		if (!databaseInstance)
		{
			const connectionString = configurationManager.database.connectionString;

			if (connectionString === null)
			{
				throw new Error("Database not configured. Set DATABASE_URL before initialization.");
			}

			databaseInstance = databaseAdapterFactory.create(connectionString, options);
		}

		return databaseInstance;
	}

	static getInstance(): IDatabaseClient<unknown>
	{
		if (!databaseInstance)
		{
			throw new Error("Database is not initialized. Call DatabaseManager.initialize() first.");
		}

		return databaseInstance;
	}

	static async disconnect(): Promise<void>
	{
		if (databaseInstance)
		{
			await databaseInstance.disconnect();
			databaseInstance = null;
		}
	}

	static isInitialized(): boolean
	{
		return databaseInstance !== null;
	}
}
