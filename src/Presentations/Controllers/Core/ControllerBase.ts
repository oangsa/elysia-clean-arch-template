import { Elysia } from "elysia";
import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";
import { ExceptionHttpMapper } from "./ExceptionHttpMapper";

export abstract class ControllerBase
{
    protected readonly _serviceManager: IServiceManager;

    constructor(serviceManager: IServiceManager)
    {
        this._serviceManager = serviceManager;
    }

	public abstract RegisterRoutes(app: Elysia<any>): void;

	protected async ExecuteWithHandling<TResponse>(set: any, action: () => Promise<TResponse>, successStatusCode: number = 200): Promise<TResponse | { error: string; message: string }>
	{
		try
		{
			const result = await action();
			set.status = successStatusCode;

			return result;
		}
		catch (error)
		{
			return this.handleError(error, set);
		}
	}

	protected handleError(error: unknown, set: any)
	{
		return ExceptionHttpMapper.Map(error, set);
	}
}
