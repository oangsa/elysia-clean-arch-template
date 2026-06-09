export class SearchRequestNormalizer
{
	public static Normalize<TRequest extends Record<string, any>>(request: Partial<TRequest> | null | undefined, defaults: TRequest): TRequest
	{
		return {
			...defaults,
			...(request ?? {}),
		};
	}
}
