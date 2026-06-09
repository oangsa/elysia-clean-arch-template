import { IExampleMapper, ExampleMapper } from "../Example/ExampleMapper";

export interface IMapperRegistry
{
	exampleMapper: IExampleMapper;
}

export class MapperRegistry
{
	public static Create(): IMapperRegistry
	{
		return {
			exampleMapper: new ExampleMapper(),
		};
	}
}
