# Gathering Hall 2.0

Open `instructor-corner.html` to teach or join a class. Review and Exam modes on the main website remain separate.

## Prepare a lesson

1. Choose **Build a Session**. Select a category to draw from the question bank, choose the timer and optional game scoring, then select **Review Questions**. Or choose **Start a blank presentation**.
2. Add multiple-choice, select-all, typed-answer, ordering, poll, or teaching-slide items. Use the arrows to arrange the lesson. For a true/false question, use two multiple-choice answers.
3. Select the correct answers. Enter ordering steps in the correct order; learners receive shuffled steps. Typed answers match the accepted list while ignoring capitalization and repeated spaces. Add accepted abbreviations or equivalent wording explicitly.
4. Upload JPG, PNG, or WebP images and provide image descriptions. Images appear on the instructor and student screens. Image-identification questions use an image with an ordinary question type. Images are resized to at most 1280 pixels on the longest edge and compressed for sharing, so inspect fine details such as ECG labels in Preview before teaching. Original files stay unchanged.
5. **Save Presentation** downloads a JSON file containing the lesson and its images. Use **Open saved presentation** in setup to reopen it. The editor is kept only in this tab; save before closing or refreshing. Decks allow 60 items / 10 MB; source images allow 8 MB / 40 megapixels each.
6. **Preview on this device** runs the lesson without opening a room or requiring students. Use it for a projected presentation. Preview is instructor paced.

## Teach a class

- Choose **Open Live Room** and share the six-digit code or QR code. Learners use nicknames and choose a woodland character. Duplicate nicknames receive a number. Instructors can remove learners from the lobby.
- Start with or without students. Late joiners see the current question or slide; those arriving during the response reveal wait for the next item.
- Select-all and ordering answers require a Submit action. Answers lock after the host acknowledges them. A timed question closes at the instructor's deadline; the host rejects late responses.
- Teaching slides advance manually and do not have timers. Polls collect class feedback without awarding points. Typed class responses are visible on the instructor's response screen.
- Scored questions award one correct answer in review mode. Game mode awards up to 1,000 points, with a speed bonus only for timed questions. Untimed correct answers award 1,000 points. Polls and slides are excluded from accuracy and scores. The final leaderboard appears only in game mode.
- Sounds are optional and initially off on each device. The instructor gets join, countdown and reveal cues; students get result sounds. Use Full screen where the browser supports it.
- Download the results CSV before closing the room. Disconnected learners remain in the results. Rejoining creates a new learner entry; this is a classroom review tool, not authenticated exam software.

## Connections and verification

The existing PeerJS / WebRTC transport and QR library remain in use. Live sessions need internet for the hosted connection libraries and signaling service. Some school networks or NAT configurations prevent WebRTC peer connections; no TURN relay or paid backend has been added. Keep the instructor's tab open. A 60-join limit bounds a room; it is not a tested 60-device capacity guarantee. Large images may take longer to reach student devices, especially over slow instructor uplinks.

Presentation images and results are not uploaded to a Hearth storage server. Live content travels over the room's peer connections. Save de-identified teaching images that you have permission to use. Saved lesson JSON files contain the answer key and should stay with the instructor.

The live protocol is version 2. Instructors and students must reload the updated page before joining; mixed old/new sessions are rejected with a reload message.

Run `node tests/instructor-corner-engine.test.cjs` for deck and grading checks. Run `node tests/instructor-corner.test.cjs` with Playwright and a Chromium executable configured in `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for editor and host/student UI coverage. The browser test uses a simulated peer transport; an actual instructor/student connection test on the target school network is still needed before classroom use.

## Optional quiz music

Turn on **Quiz music · instructor only** to play RandomMind’s CC0 fantasy instrumental **The Bard’s Tale** during question screens. Music is off by default, with independent volume and mute controls. Teaching slides, answer reveals, the session end, leaving the room, and hiding the tab stop the loop. Student devices do not start it. The compressed MP3 is hosted locally and cached for offline use. See `audio/README.md` for source and license details.

Question-bank selection uses only Foundations, Medical, Trauma, Operations, Pediatrics, and OB/GYN (plus Comprehensive to mix them). These are shared with the Question Workshop and Review/Exam.
