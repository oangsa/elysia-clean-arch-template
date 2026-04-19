import { IDatabaseClient } from "./IDatabaseClient";

export interface IDatabaseAdapterFactory<TNativeClient = unknown>
{
	create(connectionString: string, options?: Record<string, unknown>): IDatabaseClient<TNativeClient>;
}
