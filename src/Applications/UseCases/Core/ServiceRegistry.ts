import { ICoreAdapterManager } from "../CoreAdapterManager";
import { IExampleService } from "../../Services/Examples/IExampleService";
import { ExampleService } from "../Examples/ExampleService";

export interface IServiceRegistry
{
	exampleService: IExampleService;
}

export class ServiceRegistry
{
	public static Create(coreAdapterManager: ICoreAdapterManager): IServiceRegistry
	{
		return {
			exampleService: new ExampleService(coreAdapterManager),
		};
	}
}
