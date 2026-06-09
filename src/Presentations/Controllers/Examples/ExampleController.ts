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
					return this.ExecuteWithHandling(set, async () =>
					{
						return this._serviceManager.exampleService.GetHello();
					});
				}, {
					detail: {
						tags: ["Example"],
						summary: "Get a hello payload for template validation.",
					},
				})
        )
    }
}
