# Werner Bau

German company website focused on renovation for schools, public facilities and managed properties in Hamburg.

Live test site: https://wernerbautest.ksqsebastian.workers.dev

## Commands

- `npm run dev` — local preview on http://127.0.0.1:4173
- `npm run check` — JavaScript syntax, local asset and anchor checks
- `npm run build` — self-contained Cloudflare Worker including all images
- `npm install` then `npm run deploy` — deploy using an authenticated Wrangler installation

The initial deployment used the connected Cloudflare API. No deployment credentials are stored in the repository. Images are embedded in the Worker; there is no runtime dependency on the former website or GitHub.

## Behavior

Service disclosures, project dialogs and mobile navigation are functional. Contact uses telephone and prepared email links. The visitor reviews and sends the email through their own email program. No server-side contact form or analytics are configured.

The test site is excluded from search indexing through metadata, HTTP headers and robots.txt. Corporate details and legal/hosting arrangements need review before transfer to the primary company domain.

Public company imagery and portrait associations follow the existing werner-bau.eu pages. Internal research documents remain local and are not included in this repository.
