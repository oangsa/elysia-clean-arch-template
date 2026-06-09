import Elysia from "elysia";
import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";
import { ControllerBase } from "./ControllerBase";
import { ControllerRegistry } from "./ControllerRegistry";

export class ControllerManager
{
	private readonly _controllers: ControllerBase[];

    constructor(serviceManager: IServiceManager)
    {
		this._controllers = ControllerRegistry.Create(serviceManager);
    }

    public RegisterRoutes(app: Elysia<any>): void
    {
		for (const controller of this._controllers)
		{
			controller.RegisterRoutes(app);
		}
    }
}
