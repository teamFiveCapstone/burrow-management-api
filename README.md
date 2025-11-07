# Ragline Backend API

## Architecture

- src/repository: Contains implementations for all outbound communication (whether that's database or other APIs).
- src/service: Contains all the business logic.
- src/config: single place for all configuration (from environment variables)

## Testing

- TBD

## How to Run

1. `cp .env.example .env` (and edit if necessary)
1. `npm ci`
1. `npm run start`
