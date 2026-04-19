import { ExampleEntity } from "../../../Infrastructures/Entities/Example/ExampleEntity";

export interface IExampleRepository
{
	getHello(): Promise<ExampleEntity>;
}
