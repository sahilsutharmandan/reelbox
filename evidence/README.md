# ReelBox search repair evidence

Before images are the original screenshots supplied by the user. After images were captured against the production export with live TVmaze results on October 3, 2026, using headless Chrome at 1280 × 900 (full-page captures, matching the supplied desktop width). Mobile captures use a 393 × 852 viewport; these are responsive emulation, not physical-device tests.

| Issue | Before | After |
| --- | --- | --- |
| Missing Office: Blackmail poster and unequal card heights | [Office before](before/1-search-the-office.png) | [Office after](after/1-search-the-office.png) |
| Law & Order missing from its search | [Law before](before/2-search-law-and-order.png) | [Law after](after/2-search-law-and-order.png) |

Additional responsive evidence: [Office mobile](after/3-search-the-office-mobile.png), [Law & Order mobile](after/4-search-law-and-order-mobile.png).

## Changes

- Encode the full search query so ampersands remain part of the search value.
- Display “No image available” when a poster is missing or fails to load, preserving the poster area.
- Stretch each card to its grid row height, including cards with missing genres or longer titles.

## Verification

- Live searches returned the Office results and the original Law & Order (show ID 562). The outgoing query preserved `law & order` as `law%20%26%20order`.
- All desktop cards within each row had equal measured heights: Office 362.5px; Law & Order 362.5px or 385px depending on the row.
- No broken rendered images in either desktop result set. Separately blocked poster downloads and confirmed fallback text replaced failed images.
- Both searches fit the 393px mobile viewport without horizontal overflow.
- Opened the original Law & Order result and verified its detail heading. Clearing search restored the initial prompt.
- Production build and `git diff --check` passed. Build retains existing Next.js recommendations to replace plain image elements with optimized images.
