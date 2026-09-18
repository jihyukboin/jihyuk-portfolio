# OCI runtime configuration

GitHub Actions `production` environment is the source of truth for `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Every main deployment writes them atomically to `/opt/jihyuk-portfolio/shared/production.env` before the release build. It also synchronizes the user systemd unit and streams the deploy script from that same commit, so the OCI host has no separately maintained deployment code.

Bootstrap only provisions the deployment user, directories, SSH access, and user-systemd manager. `jihyuk-portfolio.service` and the release build both read the same file, so `NEXT_PUBLIC_*` values are correct when `next build` runs and for the running service. Changing either GitHub secret requires a deployment because Next.js inlines `NEXT_PUBLIC_*` values into browser bundles.
