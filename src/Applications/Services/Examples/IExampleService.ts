import { ExampleDto } from "../../DataTransferObjects/Example/ExampleDto";

export interface IExampleService
{
	GetHello(): Promise<ExampleDto>;
}
