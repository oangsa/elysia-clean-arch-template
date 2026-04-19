# Elysia Clean Architecture Template

Backend API template using Bun runtime and Elysia framework with Clean Architecture.

## Prerequisites

- Bun 1.3+

## Setup

```bash
bun install
```

## Development

```bash
bun run dev
```

## API Docs

- Swagger UI: http://localhost:3000/swagger

## Project Guides

- Database integration: [docs/Database-Integration.md](docs/Database-Integration.md)
- New endpoint implementation: [docs/New-Endpoint-Guide.md](docs/New-Endpoint-Guide.md)

## Example Endpoint

Template endpoint:

- GET /hello

Response shape:

```json
{
	"message": "Hello, World!",
	"generatedAt": "2026-04-19T12:00:00.000Z"
}
```

## Architecture Notes

- Dependency direction: `Presentations -> Applications -> Domains`
- `Infrastructures` implements contracts defined by inner layers
- `src/index.ts` is the composition root for wiring

The `Example` feature demonstrates the full flow:

- controller calls application service
- service uses repository contracts and mapper manager
- repository returns infrastructure database entity
- mapper converts entity to response DTO

## Unit Testing

Run unit tests:

```bash
bun run test:unit
```

Current test structure follows layered mocks in `src/Unittests`:

- `MockRepository/Features`: feature-specific repository mocks (for example `MockExampleRepository`)
- `MockRepository/Core`: repository manager mock composition
- `MockService/MockICoreAdaptorManager`: core adapter mock composition
- `MockService/MockIServiceManager`: service manager mock entry point used by tests

`ExampleServiceTest.ts` demonstrates the recommended pattern:

1. Resolve service via `MockIServiceManager.getMock()`.
2. Exercise service methods.
3. Assert DTO output and behavior.
