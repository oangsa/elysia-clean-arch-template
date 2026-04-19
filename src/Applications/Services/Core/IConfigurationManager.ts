export interface IServerConfiguration
{
	port: number;
}

export interface IDatabaseConfiguration
{
	provider: string;
	connectionString: string | null;
}

export interface IConfigurationManager
{
	server: IServerConfiguration;
	database: IDatabaseConfiguration;
}
