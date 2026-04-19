import { Elysia } from "elysia";
import { IServiceManager } from "../../../Applications/Services/Core/IServiceManager";
import { DomainException } from "../../../Domains/Exceptions/DomainException";

export abstract class ControllerBase
{
    protected readonly _serviceManager: IServiceManager;

    constructor(serviceManager: IServiceManager)
    {
        this._serviceManager = serviceManager;
    }

	public abstract RegisterRoutes(app: Elysia<any>): void;

	protected handleError(error: unknown, set: any)
	{
        if (error instanceof DomainException)
        {
            set.status = error.statusCode;

            return {
                error: error.errorCode,
                message: error.message,
            };
        }

        set.status = 500;

        return {
            error: "INTERNAL_SERVER_ERROR",
            message: "Internal server error.",
        };
    }
}
