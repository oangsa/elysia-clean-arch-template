import { ExampleEntity } from "../../Entities/Example/ExampleEntity";
import { IExampleRepository } from "../../../Domains/Repositories/Example/IExampleRepository";

export class ExampleRepository implements IExampleRepository
{
	async GetHello(): Promise<ExampleEntity>
	{
		return {
			message: "Hello, World!",
			generatedAt: new Date().toISOString(),
		};
	}
}
