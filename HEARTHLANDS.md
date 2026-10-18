# The Hearthlands · class competition campaigns

Open **Gathering Hall → The Hearthlands** to manage campaigns. This is an instructor-owned, local-first system. No account, paid backend, or independent student cloud world is required.

## Set up two competing classes

1. Create a named campaign, such as **EMT 2027 League**.
2. Add **Monday / Wednesday** and **Tuesday / Thursday** as separate classes inside that campaign. Each class starts with its own named teams and empty settlements. There can be 1–30 teams per class.
3. Use the Campaign and Class selectors to switch. Teams, supplies, buildings, and session history remain separate. Switching does not reset progress. Create another campaign for another term or league.
4. Use **Download all campaigns** to back up everything. Imported backups become new campaign copies; they do not overwrite the saved campaigns. Browser saves do not automatically synchronize across computers. Close other campaign editing tabs or reload them before making changes; stale writes are blocked.

## Let students create teams

Anyone who joins a campaign room can create a named team or join an existing team while the instructor is in the lobby. **Students may create or join teams in the lobby** is on by default in live setup; the instructor may turn it off. Team names must be distinct within the class. New teams start at zero without changing existing settlements. Up to 30 teams are allowed per class.

The instructor can also add a team from **+ Create a team in this class** on the campaign page, rename teams, and assign students using lobby dropdowns. Team creation and changes lock when the lesson starts. Late joiners are automatically assigned to an existing team for that session; they can arrange another team before the next session. Team membership is session-based, not tied to authenticated student accounts. Have returning students select their existing team in the lobby.

## Teach and award supplies

1. Build or open a presentation in Gathering Hall. In setup, select a campaign and its class, then enter an activity ID, such as **cardiology-1**. This context stays attached to the session even if the selected class changes elsewhere.
2. Use the same activity ID and equivalent questions for both classes. Keep the device arrangement consistent: one device per student, or one per team for discussion.
3. Host a live room. Students choose nicknames and characters as usual, then create or join teams in the lobby. The instructor can adjust assignments before starting.
4. Finish the session and select **Award campaign supplies** once. Live responses are totaled by team. Each completed session has a unique award ID; awarding it twice is rejected. Slides, polls, previews, and sessions without scored answers earn nothing.
5. Learners receive a read-only view of their class settlements through the live connection. After awarding, the instructor broadcasts the updated balances/maps. Instructor and students can browse team settlements. Only the instructor's campaign page spends supplies on construction.
6. Open settlements and choose which buildings to construct or upgrade. Download a campaign backup after awarding, particularly if a browser storage warning appears. A backup button is also available on the completed session's award panel.

Each team with at least one scored response earns:

- 10 supplies for participation;
- rounded `30 × accuracy` supplies, with unanswered opportunities counted as incorrect;
- rounded `10 × improvement` supplies over that team's previous best accuracy for the same activity (no improvement bonus on a first attempt).

A team with no scored responses earns zero. Scores, speed bonuses, class size, and question timers do not directly award supplies. Build a lodge, library, infirmary, watchtower, garden, or bridge for 30 supplies. Levels 2 and 3 cost 60 and 90. Wrong answers never subtract supplies.

## League and shared landmark

The league includes only activity IDs completed by **every class in the campaign**. It averages each class's best accuracy on those shared activities, giving each activity equal weight. Repeating an activity can improve its best accuracy; repeats do not add league points. Improvement from each first attempt is shown separately. Classes of different sizes are compared by percentages, not raw points. Equivalent content and comparable participation still require instructor judgment; this is a friendly classroom game, not a controlled assessment.

All correctly answered opportunities also contribute to the campaign's shared landmark: campfire → wayside shelter at 100 → timber hall at 250 → Great Gathering Hall at 500. Practice repeats contribute to this cooperative goal. It is not a mastery credential.

## Storage and verification

Storage key: `field_notes_hearthlands_v1`. Limits: 10 campaigns, 10 classes per campaign, 30 teams per class, 200 sessions per class, 4 MB backup. Only aggregate team results are stored; live nicknames and answer keys are not included in campaign backups. Existing exam, flashcard, achievement, streak, and study-plan storage is untouched. Campaigns use their own backup controls.

If browser storage is blocked or full, the interface warns that progress exists only in the current tab and offers a backup. Corrupt stored campaign data is not silently overwritten. If another tab has changed stored data, stale campaign-page writes are rejected. Live awards re-read current storage and apply the session to its original class, preserving newer class selections and upgrades.

Automated checks cover progression, class isolation, common-activity league calculations, backups/import copies, duplicate awards, team creation/limits, reload, stale-tab protection, storage failure, browser layouts, host/student team creation and locking, result awards, and world broadcasts. Host/student tests use a simulated peer transport. Real school-network WebRTC connectivity and classroom-scale image delivery remain deployment checks inherited from Gathering Hall 2.0.
