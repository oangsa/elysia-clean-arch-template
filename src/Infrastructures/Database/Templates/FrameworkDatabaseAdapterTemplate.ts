import { IDatabaseAdapterFactory } from "../Core/IDatabaseAdapterFactory";
import { IDatabaseClient, IDatabaseTransaction } from "../Core/IDatabaseClient";

class FrameworkDatabaseTransactionTemplate<TNativeClient = unknown> implements IDatabaseTransaction<TNativeClient>
{
	private readonly _nativeClient: TNativeClient;

	constructor(nativeClient: TNativeClient)
	{
		this._nativeClient = nativeClient;
	}

	get nativeClient(): TNativeClient
	{
		return this._nativeClient;
	}
}

export class FrameworkDatabaseAdapterTemplate<TNativeClient = unknown> implements IDatabaseClient<TNativeClient>
{
	private readonly _nativeClient: TNativeClient;

	constructor(nativeClient: TNativeClient)
	{
		this._nativeClient = nativeClient;
	}

	get nativeClient(): TNativeClient
	{
		return this._nativeClient;
	}

	async connect(): Promise<void>
	{
		throw new Error("Not implemented. Wire this to your framework connect/init logic.");
	}

	async disconnect(): Promise<void>
	{
		throw new Error("Not implemented. Wire this to your framework disconnect logic.");
	}

	async testConnection(): Promise<boolean>
	{
		throw new Error("Not implemented. Run a lightweight ping/query for your framework.");
	}

	async runInTransaction<TResult>(
		callback: (transaction: IDatabaseTransaction<TNativeClient>) => Promise<TResult>,
	): Promise<TResult>
	{
		const transaction = new FrameworkDatabaseTransactionTemplate<TNativeClient>(this._nativeClient);

		return callback(transaction);
	}
}

export class FrameworkDatabaseAdapterFactoryTemplate<TNativeClient = unknown> implements IDatabaseAdapterFactory<TNativeClient>
{
	create(connectionString: string, options?: Record<string, unknown>): IDatabaseClient<TNativeClient>
	{
		void connectionString;
		void options;

		throw new Error("Not implemented. Create and return your framework adapter here.");
	}
}
