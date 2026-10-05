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

The typography-led page uses compact navigation and inline service disclosures. All 173 original gallery photographs are included in a searchable archive with category filters, image wall/grid views and progressive loading. The viewer supports keyboard navigation, touch swipes, zoom, native fullscreen, direct picture links. Seven verified before/after pairs have an interactive comparison slider. An image can be carried into an inquiry. Company portraits open in a large, uncropped, keyboard-accessible dialog with the corresponding name, role and email. A restrained fixed contact strip provides the published telephone number and the inquiry dialog; mobile dialogs use a bottom sheet. Four published qualification/membership badges are included; current certificates remain available by enquiry. The separate named-reference chapter has been removed; the photo archive remains the main project showcase. Contact includes an inquiry dialog and a callback dialog with preferred time. Both currently prepare an email to ksqsebastian@gmail.com locally; WhatsApp is an explicitly labeled placeholder until a number is provided. The visitor reviews and sends the email through their own email program. A server-side Resend route is implemented with a secret binding, fixed recipient, origin validation, payload validation, size limits, honeypot and rate limiting. It is disabled with CONTACT_ENABLED=false because the onboarding sender rejects the requested Gmail recipient (403). Enable only after verifying an appropriate sender domain. No analytics are configured.

The test site is excluded from search indexing through metadata, HTTP headers and robots.txt. Corporate details and legal/hosting arrangements need review before transfer to the primary company domain.

Public company imagery and portrait associations follow the existing werner-bau.eu pages. Internal research documents remain local and are not included in this repository.

## Saved baseline and visual references

The previously approved minimalist variant is preserved in the annotated Git tag `werner-minimal-approved-2026-10-05` (commit `05fa710`). A local archive is kept outside the published repository. The current page retains its restrained serif typography and uses a pure white background.

Mobbin screens were searched and visually inspected for this feature iteration:

- [Cosmos image wall](https://mobbin.com/screens/ee4a791c-3f16-463e-b6c7-1de26258b5e1): natural image proportions, quiet category controls.
- [Cosmos image detail](https://mobbin.com/screens/13584351-6cb4-47ef-ac9c-02a717c4056e): dominant photograph and restrained side actions.
- [Airbnb contact overlay](https://mobbin.com/screens/9d92d901-4d5d-4893-8d16-af4c61e47b42): compact focused contact surface. This screen depicts messaging; Werner's implementation prepares an email rather than claiming live chat.

Desktop and 390px mobile live checks covered search/reset, layout switching, comparison, saved-list persistence, picture deep links, image-to-inquiry transfer and callback email preparation. No test email or call was sent.

## Digital gallery iteration

The expanded archive has adjustable image sizes, a six-image filmstrip, quick saving, shareable picture selections and selection-to-inquiry transfer. Entry points distinguish maintenance/damage from renovation projects. Tender documentation and next-step explanations use only existing company evidence. No new project dates or PQ number were invented.

Current Mobbin reference: https://mobbin.com/screens/88989e22-126c-49fc-aef2-f1012718995b (Cosmos image density controls). The approved visual language remains white with serif headings and fine dividers; real company photos retain their original proportions.

Validation: backend tests cover fixed recipient, wrong origin, invalid email/callback fields, oversized requests, rate limits and provider failure. Live desktop and 390px checks cover filters, search, density, grid, comparison, image loading and inquiry/callback preparation to the exact Gmail recipient. Resend delivery has not succeeded; the UI does not claim that an email was sent.

## Studio motion iteration

The prior archive is preserved in tag `werner-archive-approved-2026-10-05` (commit `571e904`). The gallery now uses a compact sticky capsule toolbar, an editorial masonry arrangement, image hover actions, an animated filter indicator, staggered reveals, FLIP position changes and shared-image open/close transitions. Density changes recompose the same real photos. Full-sized images are loaded progressively without changing the viewer geometry. An OS reduced-motion preference bypasses JavaScript animations and CSS transitions. The company copy and contact delivery configuration retain their previous behavior.

Implementation lives in `public/gallery-motion.js` and `public/gallery.css`. CSS-only grid/columns remain a fallback when motion enhancement is absent. Real photos are deliberately cropped in the wall to create varying proportions; the viewer shows the full image. No generated project imagery is published.

Current-session Mobbin reference: https://mobbin.com/screens/f50a3921-35cc-4d7f-ae07-0f2643c05bae (Cosmos collection, variable image sizes and quiet chrome). Browser checks at 1280×720 and 390×844 cover search, no-result reset, category filters, size and layout changes, opening animation, filmstrip, keyboard close, comparison slider, saved selections and picture-to-inquiry transfer.

## Opening photograph selection

The first 18 pictures are curated from the original company archive, led by historic masonry, a school courtyard, a covered walkway, an iron balcony and a finished timber floor with panelled doors. Per-picture proportions and focal positions preserve the important architectural details in the masonry wall; the full photograph remains available in the viewer. The first five thumbnails load eagerly. All 173 photographs, IDs, saved selections and before/after comparisons are retained.

The gallery wall now displays the available 1000px photographs directly, rather than enlarged 480px thumbnails. The opening five still load eagerly; the remaining photographs load lazily. Photo services and original assets are unchanged.

## Careers

The top-right application button opens `/karriere`, an internal careers page in the same design. Three draft example roles (masonry, painting, project/site management) and an unsolicited application are included at the user's request; the page labels them as examples pending confirmation. A selected role carries into the application form. After review, applications open an unsent email addressed to info@werner-bau.eu; CVs are attached in the visitor's email client. This does not use or change the disabled Resend inquiry integration.

## Gallery simplification

Removed the saved list, quick-save buttons, selection sharing/inquiry controls and the four image-detail actions (save, copy link, download, original source). The viewer keeps photo navigation, zoom/fullscreen, comparison and the single inquiry action. No saved-list browser storage is read or written. Existing individual picture links remain supported for photo-related inquiries.

## Mobile layout repair

Phone layouts use a shared inline menu, larger type and touch targets, a category selector instead of clipped gallery tabs, two meaningful image-size choices, and a contact dock that appears after the hero contact options leave view. The photo archive starts with 12 images on phones and 18 on desktop. Gallery scroll anchoring is disabled and phone animations are shorter. Inquiry/callback dialogs fill the phone viewport; careers and legal pages share the mobile styles. Initial fragment navigation is restored after font/layout settling unless the visitor has already interacted.

Browser verification at 320, 390, 414 and 1280px covered page rendering, overflow, menu navigation, gallery search/no-results/reset, category selection, density, layout changes, pagination, comparison, portraits, inquiry/callback preparation and the application flow. No message or call was sent. Console checks found no application errors. These are Chromium browser viewport checks; actual iOS Safari keyboard and device safe-area behavior still need device verification.

## Restrained mobile design

Removed decorative Unicode arrows across the company and careers pages. Functional photo navigation uses words; close and comparison controls use simple drawn shapes. Application/contact entries use quiet text links. The phone menu is a compact text control, gallery layout choices are labelled, filtering/search use fine underlines, and enlarged photographs sit directly on white. Contact docks only appear after the hero contact links leave view. Existing photo motion, search, category selection, comparison, zoom and inquiry features are retained.

A current Mobbin search returned Squarespace and Julienne, rather than Inkwell. The inspected Julienne screen (https://mobbin.com/screens/55efafcc-c31a-40fc-941b-20db82a4ea56) informed the restrained serif hierarchy and simple navigation; it is not an exact clone or an Inkwell reference.
