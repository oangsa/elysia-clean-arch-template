import { IExampleRepository } from "../../../Domains/Repositories/Example/IExampleRepository";
import { ExampleEntity } from "../../../Infrastructures/Entities/Example/ExampleEntity";

export class MockExampleRepository
{
	public static getMock(seedExampleEntity?: ExampleEntity): IExampleRepository
	{
		let exampleEntity = seedExampleEntity !== undefined
			? this.cloneExampleEntity(seedExampleEntity)
			: this.getDefaultExampleEntity();

		return {
			GetHello: async (): Promise<ExampleEntity> =>
			{
				return this.cloneExampleEntity(exampleEntity);
			},
		};
	}

	private static getDefaultExampleEntity(): ExampleEntity
	{
		return {
			message: "Hello from mock",
			generatedAt: "2026-04-19T12:00:00.000Z",
		};
	}

	private static cloneExampleEntity(exampleEntity: ExampleEntity): ExampleEntity
	{
		return {
			...exampleEntity,
		};
	}
}
