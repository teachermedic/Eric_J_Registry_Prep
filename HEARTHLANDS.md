# The Hearthlands · class competition campaigns

Open **Gathering Hall → The Hearthlands** to manage campaigns. This is an instructor-owned, local-first system. No account, paid backend, or independent student cloud world is required.

## Start a team in three steps

1. **Team Name**: enter one name. There are no prefilled teams or required campaign names.
2. **Class**: choose a saved class or name a new one. The first collection is created automatically. Returning teams use the team selector instead of creating another team.
3. **Ready**: review the team and class, then select **Create team**. Nothing is saved until this final step. Back and Cancel keep existing progress intact.

The everyday view has three numbered sections: choose your team, play a quiz, and build. **Open a quiz for this class** carries the selected class into Gathering Hall. Students enter the room PIN and choose their team. At the end the instructor selects **Save team progress**, then opens the island to spend supplies. All previous campaigns, classes, teams, upgrades, and backups remain compatible.

**More options** holds collections/terms, additional classes, league, history, the shared landmark, and backups. A collection is the previous campaign grouping under a simpler label. Use **Download progress backup** before switching devices or clearing browser data. Import creates copies, never replacements. Empty-state restoration is available below the setup form.

## Let students create teams

Anyone who joins a campaign room can create a named team or join an existing team while the instructor is in the lobby. **Students may create or join teams in the lobby** is on by default in live setup; the instructor may turn it off. Team names must be distinct within the class. New teams start at zero without changing existing settlements. Up to 30 teams are allowed per class.

The instructor can also add a team from **+ Add a team** on the campaign page, rename teams, and assign students using lobby dropdowns. Team creation and changes lock when the lesson starts. Late joiners are automatically assigned to an existing team for that session; they can arrange another team before the next session. Team membership is session-based, not tied to authenticated student accounts. Have returning students select their existing team in the lobby.

## Teach and award supplies

1. Build or open a presentation in Gathering Hall. In setup, choose a class under **Save team progress**. A session name is generated automatically. Under **More options**, you can name a repeat or shared quiz, such as **cardiology-1**. This context stays attached to the session even if the selected class changes elsewhere.
2. For the optional class league or repeat improvement, use the same session name and equivalent questions for both classes. Keep the device arrangement consistent: one device per student, or one per team for discussion.
3. Host a live room. Students choose nicknames and characters as usual, then create or join teams in the lobby. The instructor can adjust assignments before starting.
4. Finish the session and select **Save team progress** once. Live responses are totaled by team. Each completed session has a unique award ID; awarding it twice is rejected. Slides, polls, previews, and sessions without scored answers earn nothing.
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

## Illustrated island and building upgrades

Use the owner-supplied island as a fixed background. All six saved building IDs and levels stay unchanged. Each building has matching generated raster artwork for levels 1–3, anchored to an existing plot. A seventh celebration garden appears automatically when all six buildings reach at least level 1; it costs nothing and adds no new stored progression state. The original cottage, wizard, horse, dragon, mountains and coast remain part of the background.

On the instructor page, select a plot with a pointer or keyboard to focus its building card; this action never spends supplies. Construction still requires the explicit Build/Upgrade button. The live student map remains read-only. An accessible progress line shows 6 plots and 18 upgrade levels. No animation is used. The old motion script is retained as a no-op entry point for compatibility with cached pages. Artwork and source notes are in `assets/hearthlands/README.md`; the assets are precached for offline use.
