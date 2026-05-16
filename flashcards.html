<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clinical Flashcards | Eric J's Field Notes</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        .flashcard-wrapper {
            width: 100%;
            max-width: 450px;
            height: 340px;
            margin: 0 auto;
            perspective: 1000px;
            cursor: pointer;
        }
        .flashcard {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .flashcard.is-flipped {
            transform: rotateY(180deg);
        }
        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            padding: 25px;
            box-sizing: border-box;
            backface-visibility: hidden;
            border-radius: 15px;
            background: var(--card-bg, #ffffff);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--border-color, #e0e0e0);
        }
        .card-front {
            text-align: center;
        }
        .card-back {
            transform: rotateY(180deg);
            align-items: flex-start;
            justify-content: flex-start;
            overflow-y: auto;
        }
        .card-icon {
            font-size: 3rem;
            color: var(--accent-blue);
            margin-bottom: 10px;
        }
        .flip-hint {
            position: absolute;
            bottom: 12px;
            color: var(--text-muted);
            font-style: italic;
            font-size: 0.8rem;
        }
        .cheat-sheet-badge {
            margin-top: auto;
            background: #f5f5f5;
            border-left: 4px solid var(--primary-blue);
            padding: 10px;
            font-size: 0.85rem;
            border-radius: 4px;
            width: 100%;
            box-sizing: border-box;
        }
    </style>
</head>
<body>

    <div id="quiz-container">
        <a href="index.html" style="display:inline-flex; align-items:center; text-decoration:none; color:var(--primary-blue); font-weight:bold; margin-bottom:20px;">
            <span class="material-icons">arrow_back</span> Back to Quiz Menu
        </a>

        <div style="text-align: center; margin-bottom: 15px;">
            <span id="card-progress" style="font-weight: bold; color: var(--text-muted);">Card Loading...</span>
        </div>

        <div class="flashcard-wrapper" onclick="flipCard()">
            <div class="flashcard" id="main-card">
                
                <div class="card-face card-front">
                    <span class="material-icons card-icon">psychology</span>
                    <p id="card-question-text">Loading question scenario...</p>
                    <small class="flip-hint">Tap card to reveal clinical truth</small>
                </div>
                
                <div class="card-face card-back">
                    <h4 style="margin:0 0 8px 0; color:var(--primary-blue);">Clinical Truth:</h4>
                    <p id="card-answer-text" style="font-weight: bold; font-size: 1.1rem; margin-bottom: 10px;"></p>
                    <hr style="border:0; border-top:1px solid #eee; margin:10px 0; width:100%;">
                    <p id="card-rationale-text" style="font-size: 0.85rem; line-height: 1.4; margin-bottom: 15px;"></p>
                    <div id="card-cheat-sheet" class="cheat-sheet-badge"></div>
                </div>

            </div>
        </div>

        <div style="display: flex; justify-content: space-between; max-width: 450px; margin: 25px auto 0 auto; gap: 15px;">
            <button class="mode-btn" style="background-color: #e0e0e0; color: #333;" onclick="prevCard(event)">
                <span class="material-icons">arrow_back</span> Previous
            </button>
            <button class="mode-btn" style="background-color: var(--primary-blue);" onclick="nextCard(event)">
                Next <span class="material-icons">arrow_forward</span>
            </button>
        </div>
    </div>

    <script src="flashcard_data.js"></script>
    <script src="flashcards.js"></script>
</body>
</html>
