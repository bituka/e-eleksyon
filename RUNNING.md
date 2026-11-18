# Running E-Eleksyon

This guide starts the full application locally. The project has three services:

| Service | Local address | Source directory |
| --- | --- | --- |
| Frontend | http://localhost:3000 | `frontend/` |
| Backend API | http://localhost:8080/api | `backend/` |
| PostgreSQL | `localhost:5432` | Docker service |

## Prerequisites

Choose one of the following setups:

- **Docker:** Docker Engine with Docker Compose
- **Local development:** Java 17, Maven, Node.js 18+, npm, and PostgreSQL

## Run with Docker Compose

From the repository root:

```bash
docker compose up --build
```

Wait until the `eeleksyon-db`, `eeleksyon-backend`, and `eeleksyon-frontend` containers are running, then open http://localhost:3000.

To start the containers in the background:

```bash
docker compose up --build -d
```

Stop the containers while keeping database data:

```bash
docker compose down
```

Stop the containers and remove the PostgreSQL volume:

```bash
docker compose down -v
```

The Compose setup provides these default database credentials:

```text
Database: eeleksyon
Username: eeleksyon
Password: eeleksyon
Port: 5432
```

## Run locally without Docker

### 1. Start PostgreSQL

Create a PostgreSQL database and user matching the defaults below:

```sql
CREATE DATABASE eeleksyon;
CREATE USER eeleksyon WITH PASSWORD 'eeleksyon';
GRANT ALL PRIVILEGES ON DATABASE eeleksyon TO eeleksyon;
```

### 2. Configure and start the backend

From the repository root:

```bash
cd backend
cp .env.example .env
./mvnw spring-boot:run
```

The `.env` file is a reference for the environment variables used by Spring Boot. Export them in your shell before starting the backend, or copy the values into the environment of the process that starts Maven.

If `.env` is not loaded automatically by your shell, use explicit environment variables:

```bash
DB_HOST=localhost \
DB_PORT=5432 \
DB_NAME=eeleksyon \
DB_USER=eeleksyon \
DB_PASSWORD=eeleksyon \
JWT_SECRET=your-very-long-secret-key-here-at-least-256-bits \
JWT_EXPIRATION=86400000 \
./mvnw spring-boot:run
```

The API will be available at http://localhost:8080.

### 3. Configure and start the frontend

In a second terminal:

```bash
cd frontend
cp .env.example .env.local
npm ci
npm run dev
```

Open http://localhost:3000.

`NEXT_PUBLIC_API_URL` must point to the backend's `/api` base path. The default is `http://localhost:8080/api`.

## Build and run production bundles

Build the backend JAR:

```bash
cd backend
./mvnw clean package
java -jar target/eeleksyon-backend-1.0.0.jar
```

Build and start the frontend:

```bash
cd frontend
npm ci
npm run build
npm run start
```

## Useful checks

```bash
# Backend container/API logs
docker compose logs -f backend

# Frontend container logs
docker compose logs -f frontend

# Check container status
docker compose ps
```

## Troubleshooting

- If port `3000`, `8080`, or `5432` is already in use, stop the process using that port or change the corresponding port mapping.
- If the backend cannot connect to PostgreSQL, verify `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`.
- If the frontend cannot call the API, verify `NEXT_PUBLIC_API_URL` and restart the Next.js development server after changing `.env.local`.
- If Docker keeps an older frontend or backend image, rebuild with `docker compose up --build --force-recreate`.
