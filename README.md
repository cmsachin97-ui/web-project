## KodNestCareers Monorepo

This repository contains the monorepo scaffold for **KodNestCareers**, based on **PRD-KNC-001 v3.0**.

> Note: This initial scaffold only sets up the directory structure and basic Git/documentation; no application or service logic has been added yet.

### High-Level Structure

- `apps/web-dashboard` – Next.js candidate-facing dashboard
- `apps/admin-portal` – Internal admin management interface
- `services/auth-service` – Identity, authentication, and RBAC
- `services/job-tracker` – Job ingestion and matching engine
- `services/readiness-engine` – JD analysis and readiness checklists
- `services/resume-builder` – ATS-aware resume builder and PDF export
- `services/notification-service` – Email and digest notification flows
- `packages/database` – Shared database schemas (Prisma/TypeORM)
- `packages/shared-schemas` – Canonical integration contracts and DTOs
- `packages/ui-library` – Shared, accessible UI components
- `infra/docker` – Containerization assets
- `infra/k8s` – Kubernetes manifests
- `infra/ci-cd` – CI/CD configuration

### Getting Started

1. Ensure you have a recent LTS version of **Node.js** and **npm** (or **pnpm/yarn**) installed.
2. Clone this repository and navigate into it:

   ```bash
   git clone <REPLACE_WITH_REPO_URL>
   cd kodnestcareers
   ```

3. Install workspace dependencies once the package management and app/service scaffolds are added.

### Next Steps

- Add workspace configuration (`package.json` / `pnpm-workspace.yaml` / `turbo.json`, etc.).
- Scaffold each app and service according to **PRD-KNC-001 v3.0**.
- Implement database schemas in `packages/database` and shared contracts in `packages/shared-schemas`.
- Build shared UI components in `packages/ui-library`.
- Configure Docker, Kubernetes, and CI/CD workflows under `infra/`.
