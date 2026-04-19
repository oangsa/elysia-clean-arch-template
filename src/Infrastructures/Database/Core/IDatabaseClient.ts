export interface IDatabaseTransaction<TNativeClient = unknown>
{
	nativeClient: TNativeClient;
}

export interface IDatabaseClient<TNativeClient = unknown> extends IDatabaseTransaction<TNativeClient>
{
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	testConnection(): Promise<boolean>;
	runInTransaction<TResult>(callback: (transaction: IDatabaseTransaction<TNativeClient>) => Promise<TResult>): Promise<TResult>;
}
