import { MapperManager } from "../../Applications/Mappers/Core/MapperManager";
import { IConfigurationManager } from "../../Applications/Services/Core/IConfigurationManager";
import { ICoreAdapterManager } from "../../Applications/UseCases/CoreAdapterManager";
import { MockRepositoryManager } from "../MockRepository/Core/MockRepositoryManager";

export class MockICoreAdaptorManager
{
	public static getMock(): ICoreAdapterManager
	{
		const configurationManager: IConfigurationManager = {
			server: {
				port: 3000,
			},
			database: {
				provider: "custom",
				connectionString: null,
			},
		};

		const repositoryManager = MockRepositoryManager.getMock();
		const mapperManager = new MapperManager();

		return {
			configurationManager,
			repositoryManager,
			mapperManager,
		};
	}
}
