import { DomainException } from "../../../Domains/Exceptions/DomainException";

export interface IHttpErrorResponse
{
	error: string;
	message: string;
}

export class ExceptionHttpMapper
{
	public static Map(error: unknown, set: any): IHttpErrorResponse
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
