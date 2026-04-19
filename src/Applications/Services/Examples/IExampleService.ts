import { ExampleDto } from "../../DataTransferObjects/Example/ExampleDto";

export interface IExampleService
{
	getHello(): Promise<ExampleDto>;
}
