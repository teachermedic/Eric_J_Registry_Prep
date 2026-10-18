# Question Workshop creation lock and homepage placement

The homepage now features Gathering Hall near the top of the first panel, with direct links to live classes, team campaigns, and Question Workshop. Gathering Hall also has its own navigation tab rather than appearing only in the footer. The original non-JavaScript homepage section remains as a fallback.

## Choose the Workshop password once

1. Merge/deploy this change, then open `instructor-access.html` from the Workshop's password-setup link.
2. Choose a password of 12–200 characters, confirm it, and select **Download password configuration**.
3. Upload the generated `instructor-access-config.js` to the repository root through GitHub and commit the replacement. You can instead provide that exported configuration file to the assistant for a reviewed GitHub update. There is no need to share the password itself in chat.
4. After GitHub Pages deployment, refresh Question Workshop and enter the password. The configuration asset uses network-first fetching under the service worker so a changed password file does not require another service-worker cache version.

The default configuration is deliberately unconfigured: normal Workshop editing stays locked until a password configuration is published. There is no shared/default password in the site code. Anyone can generate a configuration on their own device, but only repository editors can publish a replacement.

The setup page uses a random 16-byte salt and PBKDF2/SHA-256 (210,000 iterations) to generate a 32-byte password verifier. It exports the salt/verifier, not the plaintext password. No server receives the entered password. Unlock state stays in page memory; no password or reusable unlock token is stored in localStorage/sessionStorage. Reloading, manual **Lock Question Workshop**, or the 30-minute unlock expiry hides/inerts the authoring interface. Reopening within the same page preserves the form. Browser drafts remain in their existing storage format; this change does not encrypt drafts or make them confidential.

Wrong passwords, cancelled prompts and verification failures leave the Workshop closed. The prompt guards the whole normal question-authoring workflow: creating, editing, importing, backups and publishing-file export. It does **not** change student joining, hosting live lessons, Review/Exam, campaign team creation, or access to already published questions.

## Security boundary

**This is a browser-side deterrent for casual use, not server-enforced authentication or authorization.** The site is public static GitHub Pages. Someone who modifies browser code can bypass a client-side gate; public scripts, already published content, and existing browser draft storage are not protected by this mechanism. It must not be presented as a private administrator account, confidential question vault, or access control against a determined visitor.

GitHub's actual sign-in and repository permissions continue to protect publication of website changes. Truly private online authoring with enforced roles would require a server-side authentication/data service, which has not been added here. Reset a forgotten password by publishing a new configuration using GitHub write access.

## Validation

`tests/instructor-access.test.cjs` exercises unconfigured closed state, generated verifier correctness, absence of plaintext password in exports, wrong/correct passwords, cancel/manual lock, timeout, reload, preserved form, student joining, and prominent homepage links/layouts. Updated Workshop tests unlock with a **test-only configuration fixture**; the deployed configuration remains unconfigured. Dashboard regression tests include the new Gathering Hall tab, existing study flows, light/dark/mobile layouts, and offline operation.
