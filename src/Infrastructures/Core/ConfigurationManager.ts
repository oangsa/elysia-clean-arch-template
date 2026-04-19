import {
	IConfigurationManager,
	IDatabaseConfiguration,
	IServerConfiguration,
} from "../../Applications/Services/Core/IConfigurationManager";

export class ConfigurationManager implements IConfigurationManager
{
	private readonly _server: IServerConfiguration;
	private readonly _database: IDatabaseConfiguration;

	constructor()
	{
		this._server = this.LoadServerConfiguration();
		this._database = this.LoadDatabaseConfiguration();
	}

	get server(): IServerConfiguration
	{
		return this._server;
	}

	get database(): IDatabaseConfiguration
	{
		return this._database;
	}


	private LoadServerConfiguration(): IServerConfiguration
	{
		const raw = process.env.PORT
		const port = raw !== undefined ? Number(raw) : 3000;

		if (isNaN(port) || port < 1 || port > 65535)
		{
			throw new Error(`Invalid port number: ${process.env.PORT}`)
		}

		return { port };
	}

	private LoadDatabaseConfiguration(): IDatabaseConfiguration
	{
		const provider = process.env.DATABASE_PROVIDER !== undefined
			? process.env.DATABASE_PROVIDER.trim()
			: "custom";

		if (provider.length === 0)
		{
			throw new Error("Invalid database provider: DATABASE_PROVIDER cannot be empty.")
		}

		const rawConnectionString = process.env.DATABASE_URL;
		const connectionString = rawConnectionString !== undefined && rawConnectionString.trim().length > 0
			? rawConnectionString.trim()
			: null;

		return {
			provider,
			connectionString,
		};
	}
}
