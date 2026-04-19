export class DomainException extends Error
{
	private readonly _statusCode: number;
	private readonly _errorCode: string;

	constructor(message: string, statusCode: number, errorCode: string)
	{
		super(message);

		this.name = this.constructor.name;
		this._statusCode = statusCode;
		this._errorCode = errorCode;
	}

	get statusCode(): number
	{
		return this._statusCode;
	}

	get errorCode(): string
	{
		return this._errorCode;
	}
}
