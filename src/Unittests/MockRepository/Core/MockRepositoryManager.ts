import { IRepositoryManager } from "../../../Domains/Repositories/Core/IRepositoryManager";
import { MockExampleRepository } from "../Features/MockExampleRepository";

export class MockRepositoryManager
{
	public static getMock(): IRepositoryManager
	{
		const exampleRepository = MockExampleRepository.getMock();

		return {
			exampleRepository,
		};
	}
}
