import { ExampleEntity } from "../../../Infrastructures/Entities/Example/ExampleEntity";

export interface IExampleRepository
{
	GetHello(): Promise<ExampleEntity>;
}
