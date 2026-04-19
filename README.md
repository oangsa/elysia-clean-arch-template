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

## Example Endpoint

Template endpoint:

- GET /hello

Response shape:

```json
{
	"message": "Hello, World!",
	"generated_at": "2026-04-19T12:00:00.000Z"
}
```

## Architecture Notes

- Dependency direction: `Presentations -> Applications -> Domains`
- `Infrastructures` implements contracts defined by inner layers
- `src/index.ts` is the composition root for wiring

The `Example` feature demonstrates the full flow:

- controller calls application service
- service uses repository contracts and mapper manager
- repository returns persistence model
- mapper converts persistence model to response DTO
