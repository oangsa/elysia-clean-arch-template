import { IExampleMapper } from "../Example/ExampleMapper";
import { MapperRegistry } from "./MapperRegistry";

export interface IMapperManager
{
	exampleMapper: IExampleMapper;
}

export class MapperManager implements IMapperManager
{
	private readonly _exampleMapper: IExampleMapper;

	constructor()
	{
		const mapperRegistry = MapperRegistry.Create();

		this._exampleMapper = mapperRegistry.exampleMapper;
	}

	get exampleMapper(): IExampleMapper
	{
		return this._exampleMapper;
	}
}
