import { ExampleEntity } from "../../Entities/Example/ExampleEntity";
import { IExampleRepository } from "../../../Domains/Repositories/Example/IExampleRepository";

export class ExampleRepository implements IExampleRepository
{
	async getHello(): Promise<ExampleEntity>
	{
		return {
			message: "Hello, World!",
			generated_at: new Date(),
		};
	}
}
