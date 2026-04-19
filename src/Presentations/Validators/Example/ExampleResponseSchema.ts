import { t } from "elysia";

export const ExampleResponseSchema = t.Object({
	message: t.String(),
	generatedAt: t.String({ format: "date-time" }),
});
