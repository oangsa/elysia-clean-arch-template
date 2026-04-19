import { IServiceManager } from "../../Services/Core/IServiceManager";
import { ICoreAdapterManager } from "../CoreAdapterManager";
import { IExampleService } from "../../Services/Examples/IExampleService";
import { ExampleService } from "../../UseCases/Examples/ExampleService";

export class ServiceManager implements IServiceManager
{
	private readonly _coreAdapterManager: ICoreAdapterManager;

	// Services
	private readonly _exampleService: IExampleService;

	constructor(coreAdapterManager: ICoreAdapterManager)
	{
		this._coreAdapterManager = coreAdapterManager;

		this._exampleService = new ExampleService(coreAdapterManager);
	}

	get coreAdapterManager(): ICoreAdapterManager
	{
		return this._coreAdapterManager;
	}

	get exampleService(): IExampleService
	{
		return this._exampleService;
	}
}
