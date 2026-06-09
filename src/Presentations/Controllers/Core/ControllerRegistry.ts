import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";
import { ControllerBase } from "./ControllerBase";
import { ExampleController } from "../Examples/ExampleController";

export class ControllerRegistry
{
	public static Create(serviceManager: IServiceManager): ControllerBase[]
	{
		return [
			new ExampleController(serviceManager),
		];
	}
}
