import { t } from "elysia";

export const ExampleResponseSchema = t.Object({
	message: t.String(),
	generated_at: t.String({ format: "date-time" }),
});
