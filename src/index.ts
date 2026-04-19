import { ConfigurationManager } from "./Infrastructures/Core/ConfigurationManager";
import { ServiceManager } from "./Applications/UseCases/Core/ServiceManager";
import { Application } from "./Presentations/Application";
import { RepositoryManager } from "./Infrastructures/Repositories/Core/RepositoryManager";
import { CoreAdapterManager } from "./Applications/UseCases/CoreAdapterManager";
import { IConfigurationManager } from "./Applications/Services/Core/IConfigurationManager";
import { IRepositoryManager } from "./Domains/Repositories/Core/IRepositoryManager";
import { MapperManager } from "./Applications/Mappers/Core/MapperManager";

const configurationManager: IConfigurationManager = new ConfigurationManager();
const mapperManager = new MapperManager();
const repositoryManager: IRepositoryManager = new RepositoryManager();

const coreAdapterManager = new CoreAdapterManager(configurationManager, repositoryManager, mapperManager);
const serviceManager = new ServiceManager(coreAdapterManager);

const app = new Application(configurationManager, serviceManager);

app.start();
