import { IExampleRepository } from "../../../Domains/Repositories/Example/IExampleRepository";
import { ExampleRepository } from "../Example/ExampleRepository";

export interface IRepositoryRegistry
{
	exampleRepository: IExampleRepository;
}

export class RepositoryRegistry
{
	public static Create(): IRepositoryRegistry
	{
		return {
			exampleRepository: new ExampleRepository(),
		};
	}
}
