# Updating the featured blog card

The scheduled job checks Substack every six hours. When Substack returns 403, times out, or supplies an invalid/stale feed, the job preserves the current card and reports **unavailable — blog NOT updated** in its Actions summary. That expected condition does not fail the job or request a website rebuild. Programming errors, invalid local data, invalid manual input, failed Git writes, and failed Pages builds still fail visibly.

This handles the blocked-feed failure; it does not claim to restore automatic access to Substack.

## Reliable manual update

After this change is merged:

1. Open the repository's **Actions → Refresh latest blog preview → Run workflow**.
2. Select `main`.
3. Enter the public Substack article URL, its title, a brief description (up to 220 characters), and the article image's public HTTPS URL. Open the image in a new tab to copy its address; use the image URL rather than the article URL.
4. Optionally enter the actual publication timestamp with timezone, such as `2026-11-02T12:00:00Z`. Leave it blank rather than guessing.
5. Run the workflow. It validates the fields, updates the card data, and requests a Pages rebuild. It needs no request to Substack. A repeat manual run also requests a rebuild even if the same card data is already saved.

The current article becomes the first item; up to four older links stay available. The blog card's position, website layout, image styling, and trivia are unchanged.

Leave the article URL blank to perform an automatic RSS check. Without a publication date, automatic updates conservatively retain the manually selected card until that article appears in a valid feed; supplying its actual date allows newer feed posts to replace it by date.

The first live run after merge must verify GitHub Actions/Pages permissions and deployment. A green run with **unavailable** means the existing card was preserved, not that a newer article was fetched.
