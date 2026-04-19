import { DomainException } from "./DomainException";

export class DomainNotFoundException extends DomainException
{
	constructor(message: string = "Resource not found.")
	{
		super(message, 404, "NOT_FOUND");
	}
}
