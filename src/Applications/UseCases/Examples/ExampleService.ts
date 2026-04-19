import { IExampleService } from "../../Services/Examples/IExampleService";
import { ICoreAdapterManager } from "../CoreAdapterManager";
import { IRepositoryManager } from "../../../Domains/Repositories/Core/IRepositoryManager";
import { IMapperManager } from "../../Mappers/Core/MapperManager";
import { ExampleDto } from "../../DataTransferObjects/Example/ExampleDto";


export class ExampleService implements IExampleService
{
	private readonly _repositoryManager: IRepositoryManager;
	private readonly _mapperManager: IMapperManager;

	constructor(coreAdapterManager: ICoreAdapterManager)
	{
		this._repositoryManager = coreAdapterManager.repositoryManager;
		this._mapperManager = coreAdapterManager.mapperManager;
	}

	async GetHello(): Promise<ExampleDto>
	{
		const exampleEntity = await this._repositoryManager.exampleRepository.getHello();

		return this._mapperManager.exampleMapper.ExampleEntityToDto(exampleEntity);
	}
}
