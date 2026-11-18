# e-eleksyon

E-Eleksyon is an online voting and election management platform designed for secure, transparent, and user-friendly digital elections.

## Tech stack

- Backend: Java with Spring Boot
- Frontend: React with Next.js (JavaScript)
- Database: PostgreSQL
- Containerization: Docker
- Security: Spring Security and JWT-based authentication patterns

## Project structure

- `backend/` – Spring Boot REST API and business logic
- `frontend/` – Next.js application for the user interface

## Features

- Candidate and election management
- Secure voter authentication and authorization
- Real-time vote processing and result aggregation
- Dashboard for election monitoring and reporting
- Responsive web interface for desktop and mobile

## Getting started

### Prerequisites

- Docker and Docker Compose, or Java 17, Maven, Node.js 18+, npm, and PostgreSQL

The quickest way to run the complete application is Docker Compose:

```bash
docker compose up --build
```

Then open `http://localhost:3000`. See [RUNNING.md](RUNNING.md) for local development, environment variables, production builds, and troubleshooting.

## Development workflow

- Build the Java backend with Maven/Gradle
- Run the Next.js frontend for local development
- Use Docker for database and environment setup
- Keep API contracts consistent between frontend and backend services

## License

This project is intended for educational and demonstration use unless otherwise specified by the repository owner.
