import { IExampleMapper, ExampleMapper } from "../Example/ExampleMapper";

export interface IMapperManager
{
	exampleMapper: IExampleMapper;
}

export class MapperManager implements IMapperManager
{
	private readonly _exampleMapper: IExampleMapper;

	constructor()
	{
		this._exampleMapper = new ExampleMapper();
	}

	get exampleMapper(): IExampleMapper
	{
		return this._exampleMapper;
	}
}
