# Werner Bau

Restrained editorial company website focused on renovation for schools, public facilities and managed properties in Hamburg.

Live test site: https://wernerbautest.ksqsebastian.workers.dev

## Commands

- `npm run dev` — local preview on http://127.0.0.1:4173
- `npm run check` — JavaScript syntax, local asset and anchor checks
- `npm run build` — Cloudflare site Worker and three photo service Workers
- `npm install` then `npm run deploy` — deploy using an authenticated Wrangler installation

The initial deployment used the connected Cloudflare API. No deployment credentials are stored in the repository. WebP thumbnails are embedded in the site Worker. Larger WebP images load on demand through three service Workers, reached under the same website domain. Deploy the photo Workers before the site Worker; service bindings are declared in wrangler.jsonc. Optional original-image links open the former website. There is no dependency on GitHub.

## Behavior

The typography-led page uses compact navigation and inline service/reference disclosures. All 173 original gallery photographs are included in a searchable archive with category filters, image wall/grid views and progressive loading. The viewer supports keyboard navigation, touch swipes, zoom, native fullscreen, image downloads, direct picture links and a local browser-only saved list. Seven verified before/after pairs have an interactive comparison slider. An image can be carried into an inquiry. Company portraits open in a large, uncropped, keyboard-accessible dialog with the corresponding name, role and email. A restrained fixed contact strip provides the published telephone number and the inquiry dialog; mobile dialogs use a bottom sheet. Four published qualification/membership badges are included; current certificates remain available by enquiry. Named references are the Oberfinanzdirektion façade renovation (2006) and the company-reported HAW Hamburg framework-contract collaboration. Unidentified company photos are presented separately as gallery insights. Contact includes an inquiry dialog and a callback dialog with preferred time. Both prepare an email locally; WhatsApp is an explicitly labeled placeholder until a number is provided. The visitor reviews and sends the email through their own email program. No server-side contact form or analytics are configured.

The test site is excluded from search indexing through metadata, HTTP headers and robots.txt. Corporate details and legal/hosting arrangements need review before transfer to the primary company domain.

Public company imagery and portrait associations follow the existing werner-bau.eu pages. Internal research documents remain local and are not included in this repository.

## Saved baseline and visual references

The previously approved minimalist variant is preserved in the annotated Git tag `werner-minimal-approved-2026-10-05` (commit `05fa710`). A local archive is kept outside the published repository. The current page retains its restrained serif typography and uses a pure white background.

Mobbin screens were searched and visually inspected for this feature iteration:

- [Cosmos image wall](https://mobbin.com/screens/ee4a791c-3f16-463e-b6c7-1de26258b5e1): natural image proportions, quiet category controls.
- [Cosmos image detail](https://mobbin.com/screens/13584351-6cb4-47ef-ac9c-02a717c4056e): dominant photograph and restrained side actions.
- [Airbnb contact overlay](https://mobbin.com/screens/9d92d901-4d5d-4893-8d16-af4c61e47b42): compact focused contact surface. This screen depicts messaging; Werner's implementation prepares an email rather than claiming live chat.

Desktop and 390px mobile live checks covered search/reset, layout switching, comparison, saved-list persistence, picture deep links, image-to-inquiry transfer and callback email preparation. No test email or call was sent.
