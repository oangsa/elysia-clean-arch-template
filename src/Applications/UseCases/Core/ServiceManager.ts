import { IServiceManager } from "../../Services/Core/IServiceManager";
import { ICoreAdapterManager } from "../CoreAdapterManager";
import { IExampleService } from "../../Services/Examples/IExampleService";
import { ServiceRegistry } from "./ServiceRegistry";

export class ServiceManager implements IServiceManager
{
	private readonly _coreAdapterManager: ICoreAdapterManager;

	// Services
	private readonly _exampleService: IExampleService;

	constructor(coreAdapterManager: ICoreAdapterManager)
	{
		this._coreAdapterManager = coreAdapterManager;

		const serviceRegistry = ServiceRegistry.Create(coreAdapterManager);

		this._exampleService = serviceRegistry.exampleService;
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
