# TACTIX

> Master the Game.

A premium fantasy football platform for Botola Pro Inwi.

## Documentation

```
docs/
├── product/
│   ├── Product_Vision.md
│   ├── Market_Research.md
│   ├── PRD.md
│   ├── Business_Model.md
│   └── Roadmap.md
│
├── game/
│   ├── Fantasy_Engine.md
│   ├── League_System.md
│   ├── Scoring_System.md
│   ├── Transfers.md
│   ├── Pricing.md
│   └── Gamification.md
│
├── engineering/
│   ├── Backend.md
│   ├── Flutter.md
│   ├── Database.md
│   ├── API.md
│   ├── Security.md
│   └── Deployment.md
│
├── design/
│   ├── Design_System.md
│   ├── Mobile_Screens.md
│   ├── Components.md
│   └── Animations.md
│
└── ai/
    ├── AI_Agent_Guide.md
    ├── Coding_Standards.md
    └── Project_Structure.md
```

## Deploy

### Prerequisites

- Docker Engine 24+
- Docker Compose v2
- A `.env` file copied from `.env.example` with real values

### Production

```bash
# Build and start all services
docker compose -f docker-compose.prod.yml up -d --build

# Check health
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f

# Run migrations
docker compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy

# Stop
docker compose -f docker-compose.prod.yml down

# Rollback (redeploy previous image tag)
docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d
```

### CI/CD

- **PR** → `CI` workflow runs lint, typecheck, and unit tests
- **Push to `main`** → CI builds and pushes Docker images; CD deploys to staging
- **Git tag `v*`** → Flutter builds APK and App Bundle artifacts

### Environments

| Environment | Trigger | Target |
|---|---|---|
| Staging | Push to `main` | SSH + docker-compose |
| Production | Manual | SSH + docker-compose |
