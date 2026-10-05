# Werner Bau

Restrained editorial company website focused on renovation for schools, public facilities and managed properties in Hamburg.

Live test site: https://wernerbautest.ksqsebastian.workers.dev

## Commands

- `npm run dev` — local preview on http://127.0.0.1:4173
- `npm run check` — JavaScript syntax, local asset and anchor checks
- `npm run build` — self-contained Cloudflare Worker including all images
- `npm install` then `npm run deploy` — deploy using an authenticated Wrangler installation

The initial deployment used the connected Cloudflare API. No deployment credentials are stored in the repository. Images are embedded in the Worker; gallery thumbnails load locally. Optional original-image links open the former website. There is no dependency on GitHub.

## Behavior

The typography-led page uses compact navigation and inline service/reference disclosures. All 173 original gallery photographs are embedded locally in a filterable archive with pagination and keyboard-enabled image viewing. Four published qualification/membership badges are included; current certificates remain available by enquiry. Named references are the Oberfinanzdirektion façade renovation (2006) and the company-reported HAW Hamburg framework-contract collaboration. Unidentified company photos are presented separately as gallery insights. Contact includes an inquiry dialog and a callback dialog with preferred time. Both prepare an email locally; WhatsApp is an explicitly labeled placeholder until a number is provided. The visitor reviews and sends the email through their own email program. No server-side contact form or analytics are configured.

The test site is excluded from search indexing through metadata, HTTP headers and robots.txt. Corporate details and legal/hosting arrangements need review before transfer to the primary company domain.

Public company imagery and portrait associations follow the existing werner-bau.eu pages. Internal research documents remain local and are not included in this repository.
