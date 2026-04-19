import { IServiceManager } from "../../Applications/Services/Core/IServiceManager";
import { ICoreAdapterManager } from "../../Applications/UseCases/CoreAdapterManager";
import { ServiceManager } from "../../Applications/UseCases/Core/ServiceManager";
import { MockICoreAdaptorManager } from "./MockICoreAdaptorManager";

export class MockIServiceManager
{
	public static getMock(coreAdapterManager?: ICoreAdapterManager): IServiceManager
	{
		const resolvedCoreAdapterManager = coreAdapterManager ?? MockICoreAdaptorManager.getMock();

		return new ServiceManager(resolvedCoreAdapterManager);
	}
}
