import { beforeEach, describe, expect, it } from "bun:test";
import { IExampleService } from "../Applications/Services/Examples/IExampleService";
import { MockIServiceManager } from "./MockService/MockIServiceManager";

describe("ExampleService", () =>
{
	let exampleService: IExampleService;

	beforeEach(() =>
	{
		const serviceManager = MockIServiceManager.getMock();
		exampleService = serviceManager.exampleService;
	});

	it("GetHello returns mapped example dto", async () =>
	{
		const result = await exampleService.GetHello();

		expect(result).toBeDefined();
		expect(result.message).toBe("Hello from mock");
		expect(result.generatedAt).toBe("2026-04-19T12:00:00.000Z");
	});
});
