import { Elysia } from "elysia";
import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";
import { ControllerBase } from "../../Controllers/Core/ControllerBase";

export class ExampleController extends ControllerBase
{
    constructor(serviceManager: IServiceManager)
    {
		super(serviceManager);
    }

    public RegisterRoutes( app: Elysia<any>): void
    {
        app.group("", (app) =>
			app.get("/hello",
				async ({ set }) =>
				{
					try
					{
						const result = await this._serviceManager.exampleService.GetHello();
						set.status = 200;

						return result;
					}
					catch (error)
					{
						return this.handleError(error, set);
					}
				}, {
					detail: {
						tags: ["Example"],
						summary: "Get a hello payload for template validation.",
					},
				})
        )
    }
}
