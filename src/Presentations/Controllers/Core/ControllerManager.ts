import Elysia from "elysia";
import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";
import { ExampleController } from "../Examples/ExampleController";

export class ControllerManager
{
	private readonly _exampleController: ExampleController;

    constructor(serviceManager: IServiceManager)
    {
		this._exampleController = new ExampleController(serviceManager);
    }

    public RegisterRoutes(app: Elysia<any>): void
    {
		this._exampleController.RegisterRoutes(app);
    }
}
