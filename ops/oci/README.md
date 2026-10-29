# OCI runtime configuration

GitHub Actions secrets are the source of truth for `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `OPENAI_API_KEY`, and `DATABASE_URL`. The deploy job uses the `production` environment; environment secrets override repository secrets of the same name. Every main deployment writes these values atomically to `/opt/jihyuk-portfolio/shared/production.env` before the release build. It also synchronizes the user systemd unit and streams the deploy script from that same commit, so the OCI host has no separately maintained deployment code.

Bootstrap only provisions the deployment user, directories, SSH access, and user-systemd manager. `jihyuk-portfolio.service` and the release build both read the same file, so `NEXT_PUBLIC_*` values are correct when `next build` runs and for the running service. Changing a GitHub secret requires a deployment to synchronize it; Next.js also inlines `NEXT_PUBLIC_*` values into browser bundles. Deployment stops if `DATABASE_URL` or `OPENAI_API_KEY` is missing.

## MySQL

The native Node.js service connects to the existing `oci-mysql` container over its private Docker network. `/opt/mysql/docker-compose.yml` reserves the container's address as `172.25.0.2` on the external `database` network. MySQL does not publish a host port.

The `jihyuk_portfolio` database uses `utf8mb4_0900_ai_ci`. Its dedicated `jihyuk_portfolio` account accepts connections from the host's Docker gateway (`172.25.0.1`) and has privileges only on `jihyuk_portfolio.*`, including the DDL privileges needed by Drizzle migrations. `DATABASE_URL` is stored in the GitHub `production` environment and in the mode-600 OCI environment file; credentials are never committed.

The standalone release includes `drizzle/`. Server startup applies pending migrations before accepting requests and exits on connection or migration failure. No production test database or `TEST_DATABASE_URL` is required.

After a successful OCI release, the workflow purges `/`, `/robots.txt`, and `/sitemap.xml` through Cloudflare. Add `CLOUDFLARE_API_TOKEN` (zone-scoped `Cache Purge` permission) and `CLOUDFLARE_ZONE_ID` to the same GitHub `production` environment.
