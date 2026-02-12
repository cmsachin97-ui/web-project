# KodNestCareers

This repository contains the monorepo scaffold for **KodNestCareers**, based on **PRD-KNC-001 v3.0**.

## Structure

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

> Note: This commit only sets up the directory structure and basic documentation; no application logic is added yet.

# 💕 Valentine's Day Proposal Website

A beautiful, full-stack Valentine's Day proposal website with real-time server, database storage, and a multi-step proposal flow. Every name entered is stored in the database forever!

## Features

- **6-Step Proposal Flow**: Welcome → Your Name → Their Name → Style → Message → Final Proposal
- **Database Storage**: SQLite database stores all names and proposal data
- **Real-time Server**: Express.js with Socket.IO for live updates
- **Beautiful UI**: Romantic design with floating hearts, gradients, and smooth animations
- **Relationship Types**: Crush, Boyfriend, or Girlfriend
- **Proposal Styles**: Romantic, Playful, Classic, or Poetic

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: JSON file storage (no build tools required)
- **Real-time**: Socket.IO
- **Frontend**: HTML5, CSS3, Vanilla JavaScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Navigate to the project folder:
   ```bash
   cd valentines-proposal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and visit: **http://localhost:3000**

## Project Structure

```
valentines-proposal/
├── server.js          # Express server with API routes & Socket.IO
├── database.js        # SQLite database setup and queries
├── package.json
├── public/
│   ├── index.html     # Main HTML with all steps
│   ├── styles.css     # Beautiful romantic styling
│   └── app.js         # Frontend logic
└── data.json          # JSON database (created on first run)
```

## API Endpoints

- `POST /api/proposals` - Save a new proposal (user name, partner name, etc.)
- `GET /api/proposals` - Get all saved proposals
- `GET /api/names` - Get all stored partner names

## Data Storage

**data.json** stores:
- **proposals** - Full proposal data (user_name, partner_name, relationship_type, proposal_style, love_message)
- **partner_names** - All entered names with relationship type

---

Made with 💕 for Valentine's Day
