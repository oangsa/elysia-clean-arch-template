import { DomainException } from "./DomainException";

export class DomainValidationException extends DomainException
{
	constructor(message: string = "Validation failed.")
	{
		super(message, 422, "VALIDATION_ERROR");
	}
}
