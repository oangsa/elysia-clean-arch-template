import { IRepositoryManager } from "../../../Domains/Repositories/Core/IRepositoryManager";
import { IExampleRepository } from "../../../Domains/Repositories/Example/IExampleRepository";
import { ExampleRepository } from "../Example/ExampleRepository";

export class RepositoryManager implements IRepositoryManager
{
	private readonly _exampleRepository: IExampleRepository;

	constructor()
	{
		this._exampleRepository = new ExampleRepository();
	}

	get exampleRepository(): IExampleRepository
	{
		return this._exampleRepository;
	}
}
