# ReelBox watchlist and schedule evidence

The `before/` images are the three original screenshots supplied with the report. The `after/` images are captured from the fixed app in headless Chrome at 1280 × 900, with additional mobile viewport checks at 393 × 852.

| Reported issue | Before | After |
| --- | --- | --- |
| Breaking Bad appears saved on its detail page | [Detail](before/1-clicked-add-to-watchlist.png) | [Saved detail](after/1-clicked-add-to-watchlist.png) |
| Saved show missing from Watchlist | [Empty watchlist](before/2-then-opened-watchlist.png) | [Watchlist after reload](after/2-then-opened-watchlist.png) |
| Noon marked AM; Search and Schedule both highlighted | [Schedule](before/3-schedule-around-noon.png) | [Noon PM and only Schedule highlighted](after/3-schedule-around-noon.png) |

Additional captures: [mobile schedule](after/4-schedule-mobile.png), [mobile watchlist](after/5-watchlist-mobile.png).

The schedule after capture uses live October 4, 2026 listings, so its shows differ from the supplied October 2 screenshot. Fox News Live's API airtime is `12:00`, displayed as `12:00 PM`. Browser timezone: Asia/Kolkata; airtimes retain the API's broadcast times.

## Verification

- Added Breaking Bad through the detail page, navigated to Watchlist, and refreshed: the show persisted.
- Returned to its detail page, removed it, and verified the empty Watchlist persisted after refresh; re-added it successfully.
- Checked Search, Schedule, and Watchlist each identify only their own active header link.
- Verified noon in the live schedule and no horizontal page overflow in both mobile views.
- Checked the shared formatter at midnight, 00:30, 11:59, noon, 12:30, 13:00, 23:59, and empty input.
- Checked storage with an existing saved show, two shows, a duplicate addition, and removal of only the selected show.
- Production build passed. Existing Next.js image optimization warnings remain.
- `git diff --check` passed.

Changes are limited to the shared watchlist storage key, the noon AM/PM boundary, and active header matching with `aria-current`.
