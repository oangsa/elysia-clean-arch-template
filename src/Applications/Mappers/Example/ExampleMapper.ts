import { ExampleDto } from "../../DataTransferObjects/Example/ExampleDto";
import { ExampleEntity } from "../../../Infrastructures/Entities/Example/ExampleEntity";

export interface IExampleMapper
{
	ExampleEntityToDto(exampleEntity: ExampleEntity): ExampleDto;
}

export class ExampleMapper implements IExampleMapper
{
	ExampleEntityToDto(exampleEntity: ExampleEntity): ExampleDto
	{
		return {
			message: exampleEntity.message,
			generatedAt: exampleEntity.generatedAt,
		};
	}
}
