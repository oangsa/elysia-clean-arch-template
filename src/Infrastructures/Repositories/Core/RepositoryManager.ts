import { IRepositoryManager } from "../../../Domains/Repositories/Core/IRepositoryManager";
import { IExampleRepository } from "../../../Domains/Repositories/Example/IExampleRepository";
import { RepositoryRegistry } from "./RepositoryRegistry";

export class RepositoryManager implements IRepositoryManager
{
	private readonly _exampleRepository: IExampleRepository;

	constructor()
	{
		const repositoryRegistry = RepositoryRegistry.Create();

		this._exampleRepository = repositoryRegistry.exampleRepository;
	}

	get exampleRepository(): IExampleRepository
	{
		return this._exampleRepository;
	}
}
