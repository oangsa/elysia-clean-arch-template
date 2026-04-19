import { IConfigurationManager } from "../Services/Core/IConfigurationManager";
import { IRepositoryManager } from "../../Domains/Repositories/Core/IRepositoryManager";
import { IMapperManager } from "../Mappers/Core/MapperManager";

export interface ICoreAdapterManager
{
	configurationManager: IConfigurationManager;
	repositoryManager: IRepositoryManager;
	mapperManager: IMapperManager;
}

export class CoreAdapterManager implements ICoreAdapterManager
{
	private readonly _configurationManager: IConfigurationManager;
	private readonly _repositoryManager: IRepositoryManager;
	private readonly _mapperManager: IMapperManager;

	constructor(configurationManager: IConfigurationManager, repositoryManager: IRepositoryManager, mapperManager: IMapperManager)
	{
		this._configurationManager = configurationManager;
		this._repositoryManager = repositoryManager;
		this._mapperManager = mapperManager;
	}

	get configurationManager(): IConfigurationManager
	{
		return this._configurationManager;
	}

	get repositoryManager(): IRepositoryManager
	{
		return this._repositoryManager;
	}

	get mapperManager(): IMapperManager
	{
		return this._mapperManager;
	}

}
