import { playerFactory } from "./index";
import { gameBoard } from "./index";

export default function beforeGame(type) {
    if (type === "p2") {
        const mainDiv = document.querySelector('.before-game-player');

        const empty1 = document.createElement('div');
        empty1.classList.add('empty');
        mainDiv.appendChild(empty1);

        const playerNames = document.createElement('div');
        playerNames.classList.add('player-names');

        const playerInput = document.createElement('div');
        playerInput.classList.add('player-input');

        const firstLabel = document.createElement('label');
        firstLabel.setAttribute('for', 'player1-name');
        firstLabel.textContent = 'Player 1 name';

        const input1 = document.createElement('input');
        input1.setAttribute('id', 'player1-name');
        input1.setAttribute('type', 'text');

        const secondLabel = document.createElement('label');
        secondLabel.setAttribute('for', 'player-one-marker');
        secondLabel.textContent = 'Choose Your marker';

        const select = document.createElement('select');
        select.setAttribute('id', 'player-one-marker');

        const optionX = document.createElement('option');
        optionX.setAttribute('value', 'X');
        optionX.textContent = 'X';

        const optionO = document.createElement('option');
        optionO.setAttribute('value', 'O');
        optionO.textContent = 'O';

        select.appendChild(optionX);
        select.appendChild(optionO);

        playerInput.appendChild(firstLabel);
        playerInput.appendChild(input1);
        playerInput.appendChild(secondLabel);
        playerInput.appendChild(select);

        const playerInput2 = document.createElement('div');
        playerInput2.classList.add('player-input');

        const label2 = document.createElement('label');
        label2.setAttribute('for', 'player2-name');
        label2.textContent = 'Player 2 name';

        const input2 = document.createElement('input');
        input2.setAttribute('id', 'player2-name');
        input2.setAttribute('type', 'text');

        playerInput2.appendChild(label2);
        playerInput2.appendChild(input2);

        playerNames.appendChild(playerInput);
        playerNames.appendChild(playerInput2);

        mainDiv.appendChild(playerNames);

        const empty2 = document.createElement('div');
        empty2.classList.add('empty');
        mainDiv.appendChild(empty2);

        const empty3 = document.createElement('div');
        empty3.classList.add('empty');
        mainDiv.appendChild(empty3);

        const startButton = document.createElement('button');
        startButton.classList.add('start-button');
        startButton.textContent = 'Start';
        mainDiv.appendChild(startButton);

        // Start button logic
        const startBtn = document.querySelector('.start-button');
        startBtn.addEventListener('click', function() {
            // Create playerOne
            const playerOneName = (document.querySelector('#player1-name')).value;
            if (playerOneName !== '') {
                const p1Name = document.querySelector('.player-one-score h2');
                p1Name.textContent = playerOneName;
            }
            const playerOneMarker = (document.querySelector('#player-one-marker')).value;
            const playerOne = playerFactory(playerOneName, playerOneMarker, 0, 0);
            // Create playerTwo
            const playerTwoName = (document.querySelector('#player2-name')).value;
            if (playerTwoName !== '') {
                const p2Name = document.querySelector('.player-two-score h2');
                p2Name.textContent = playerTwoName; 
            }
            const playerTwoMarker = playerOneMarker === 'X' ? 'O' : 'X';
            const playerTwo = playerFactory(playerTwoName, playerTwoMarker, 0, 0);
            // Add players to gameBoard
            gameBoard.initializePlayers(playerOne, playerTwo);
            // Show board and get rid of pre-game options
            const duringGame = document.querySelector('.during-game');
            duringGame.style.display = 'grid';
            const beforeGame = document.querySelector('.before-game-player');
            beforeGame.style.display = 'none';
})
    } else {
        // Create the main container div
        const mainDiv = document.querySelector('.before-game-ai');

        // Create an empty div
        const empty1 = document.createElement('div');
        empty1.classList.add('empty');

        // Create the setup container div
        const setupDiv = document.createElement('div');
        setupDiv.classList.add('setup');

        // Create the player input container div
        const playerInputDiv = document.createElement('div');
        playerInputDiv.classList.add('player-input');

        // Create a label for Player 1 name
        const player1NameLabel = document.createElement('label');
        player1NameLabel.setAttribute('for', 'player1-name');
        player1NameLabel.textContent = 'Player 1 name';

        // Create an input element for Player 1 name
        const player1NameInput = document.createElement('input');
        player1NameInput.setAttribute('id', 'player1-name');
        player1NameInput.setAttribute('type', 'text');

        // Create a label for Player 1 marker selection
        const playerOneMarkerLabel = document.createElement('label');
        playerOneMarkerLabel.setAttribute('for', 'player-one-marker');
        playerOneMarkerLabel.textContent = 'Choose Your marker';

        // Create a select element for Player 1 marker selection
        const playerOneMarkerSelect = document.createElement('select');
        playerOneMarkerSelect.setAttribute('id', 'player-one-marker');

        // Create two option elements for X and O markers
        const xMarkerOption = document.createElement('option');
        xMarkerOption.setAttribute('value', 'X');
        xMarkerOption.textContent = 'X';

        const oMarkerOption = document.createElement('option');
        oMarkerOption.setAttribute('value', 'O');
        oMarkerOption.textContent = 'O';

        // Append the options to the select element
        playerOneMarkerSelect.appendChild(xMarkerOption);
        playerOneMarkerSelect.appendChild(oMarkerOption);

        // Append the input elements and labels to the player input container div
        playerInputDiv.appendChild(player1NameLabel);
        playerInputDiv.appendChild(player1NameInput);
        playerInputDiv.appendChild(playerOneMarkerLabel);
        playerInputDiv.appendChild(playerOneMarkerSelect);

        // Create the AI inputs container div
        const aiInputsDiv = document.createElement('div');
        aiInputsDiv.classList.add('ai-inputs');

        // Create the AI input container div
        const aiInputDiv = document.createElement('div');
        aiInputDiv.classList.add('ai-input');

        // Create a label for AI difficulty
        const aiDifficultyLabel = document.createElement('label');
        aiDifficultyLabel.setAttribute('for', 'ai-difficulty');
        aiDifficultyLabel.textContent = 'AI Difficulty:';

        // Create an input element of type range for AI difficulty
        const aiDifficultyInput = document.createElement('input');
        aiDifficultyInput.setAttribute('type', 'range');
        aiDifficultyInput.setAttribute('id', 'ai-difficulty');
        aiDifficultyInput.setAttribute('name', 'ai-difficulty');
        aiDifficultyInput.setAttribute('min', '1');
        aiDifficultyInput.setAttribute('max', '3');
        aiDifficultyInput.setAttribute('value', '1');

        // Create the AI choice display
        const aiChoiceDiv = document.createElement('div');
        aiChoiceDiv.classList.add('ai-choice');
        aiChoiceDiv.textContent = 'Easy';

        aiDifficultyInput.addEventListener('input', () => {
            const diff = parseInt(aiDifficultyInput.value);
            if (diff === 1) {
                aiChoiceDiv.textContent = 'Easy';
            } else if (diff === 2) {
                aiChoiceDiv.textContent = 'Difficult';
            } else if (diff === 3) {
                aiChoiceDiv.textContent = 'Impossible';
            }
        });

        // Append the label and input for AI difficulty to the AI input container div
        aiInputDiv.appendChild(aiDifficultyLabel);
        aiInputDiv.appendChild(aiDifficultyInput);

        // Append the AI input container div and AI choice display to the AI inputs container div
        aiInputsDiv.appendChild(aiInputDiv);
        aiInputsDiv.appendChild(aiChoiceDiv);

        // Create two more empty divs
        const empty2 = document.createElement('div');
        empty2.classList.add('empty');

        const empty3 = document.createElement('div');
        empty3.classList.add('empty');

        // Create the start button
        const startButton = document.createElement('button');
        startButton.classList.add('start-button');
        startButton.textContent = 'Start';

        // Append all elements to the main container div
        mainDiv.appendChild(empty1);
        mainDiv.appendChild(setupDiv);
        setupDiv.appendChild(playerInputDiv);
        setupDiv.appendChild(aiInputsDiv);
        mainDiv.appendChild(empty2);
        mainDiv.appendChild(empty3);
        mainDiv.appendChild(startButton);

        // Button logic
        const startBtn = document.querySelector('.start-button');
        startBtn.addEventListener('click', function() {
            // Create playerOne
            const playerOneName = (document.querySelector('#player1-name')).value;
            if (playerOneName !== '') {
                const p1Name = document.querySelector('.player-one-score h2');
                p1Name.textContent = playerOneName;
            }
            const playerOneMarker = (document.querySelector('#player-one-marker')).value;
            const playerOne = playerFactory(playerOneName, playerOneMarker, 0, 0);
            // Create AI
            const aiName = 'AI';
            const p2Name = document.querySelector('.player-two-score h2');
            p2Name.textContent = aiName;
            const aiMarker = playerOneMarker === 'X' ? 'O' : 'X';
            const diff = parseInt(aiDifficultyInput.value);
            const ai = playerFactory(aiName, aiMarker, 0, diff);
            // Add players to gameBoard
            gameBoard.initializePlayers(playerOne, ai);
            // Show board and get rid of pre-game options
            const duringGame = document.querySelector('.during-game');
            duringGame.style.display = 'grid';
            const beforeGame = document.querySelector('.before-game-ai');
            beforeGame.style.display = 'none';
        })
    }
}
