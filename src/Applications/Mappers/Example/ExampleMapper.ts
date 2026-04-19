import { ExampleDto } from "../../DataTransferObjects/Example/ExampleDto";
import { ExampleEntity } from "../../../Infrastructures/Entities/Example/ExampleEntity";

export interface IExampleMapper
{
	exampleEntityToDto(exampleEntity: ExampleEntity): ExampleDto;
}

export class ExampleMapper implements IExampleMapper
{
	exampleEntityToDto(exampleEntity: ExampleEntity): ExampleDto
	{
		return {
			message: exampleEntity.message,
			generated_at: exampleEntity.generated_at.toISOString(),
		};
	}
}
