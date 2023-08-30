const gameBoard = (() => {
    let board = ['', '', '',
                   '', '', '' ,
                   '', '', ''];

    let playerOne;
    let playerTwo;

    const initializePlayers = (p1, p2) => {
        playerOne = p1;
        playerTwo = p2;
    };

    let turn = 0;

    const squares = [...document.querySelectorAll('.square')];

    const displayBoard = () => {
        for (let i = 0; i < board.length; i++) {
            squares[i].textContent = board[i];
        }
    }

    const gameOver = () => {
        // Check for a win

        // Check diagonals
        if (board[4] !== '') {
            // Check up-to-down diagonal
            if (board[0] === board[4] && board[4] === board[8]) return 'win';
            // Check down-to-up-diagonal
            if (board[3] === board[4] && board[4] === board[6]) return 'win';
        }
        // Check columns
        for (let i = 0; i <= 2; i++) {
            if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
                return 'win';
            }
        }
        // Check rows
        for (let i = 0; i <= 6; i += 3) {
            if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
                return 'win';
            }
        }

        // Check for a tie
        let emptySquares = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') emptySquares++;
        }
        if (emptySquares === 0) return 'tie';
    }

    const updateBoard = (id) => {
        // Check if square is already taken
        if (board[id] !== '') return;
        const currentPlayer = turn % 2 === 0 ? playerOne : playerTwo;
        board[id] = currentPlayer.marker;
        turn++;

        const gameResult = gameOver();
        if (typeof gameResult !== "string") return;

        // Game ended
        const modal = document.querySelector('.end-game-modal');
        // modal.classList.add('end-game-modal');

        if (gameResult === 'win') {
            console.log(playerOne.name);
            if (currentPlayer.name === '' && currentPlayer === playerOne) {
                modal.textContent = `Player One Wins`;
            } else if (currentPlayer.name === '' && currentPlayer === playerTwo) {
                modal.textContent = `Player Two Wins`;
            } else {
                modal.textContent = `${currentPlayer.name} wins`;
            }
            currentPlayer.score++;
            // Update Score
            const p1Score = document.querySelector('.player-one-score p');
            p1Score.textContent = playerOne.score;
            const p2Score = document.querySelector('.player-two-score p');
            p2Score.textContent = playerTwo.score;
        }

        if (gameResult === 'tie') {
            modal.textContent = `It's a tie`
        }


        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'RESET';
        resetBtn.addEventListener('click', function() {
            board = ['', '', '',
                     '', '', '' ,
                     '', '', ''];
            displayBoard();

            modal.style.display = 'none';
            modal.close();
        })

        modal.appendChild(resetBtn);

        modal.style.display = 'grid';
        modal.showModal();

    }

    return {initializePlayers, updateBoard, displayBoard};
})();




const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('click', function () {
        // Find square id
        const squareId = parseInt((square.id).match(/\d/));
        // Add marker to square
        gameBoard.updateBoard(squareId);
        gameBoard.displayBoard();
    })
})


const playerFactory = (name, marker, score) => {
    return {
        name, 
        marker,
        score
    };
};

const startBtn = document.querySelector('.start-button');
startBtn.addEventListener('click', function() {
     // Create playerOne
     const playerOneName = (document.querySelector('#player1-name')).value;
     if (playerOneName !== '') {
        const p1Name = document.querySelector('.player-one-score h2');
        p1Name.textContent = playerOneName;
     }
     const playerOneMarker = (document.querySelector('#player-one-marker')).value;
     const playerOne = playerFactory(playerOneName, playerOneMarker, 0);
     // Create playerTwo
     const playerTwoName = (document.querySelector('#player2-name')).value;
     if (playerTwoName !== '') {
        const p2Name = document.querySelector('.player-two-score h2');
        p2Name.textContent = playerTwoName; 
     }
     const playerTwoMarker = playerOneMarker === 'X' ? 'O' : 'X';
     const playerTwo = playerFactory(playerTwoName, playerTwoMarker, 0);
     // Add players to gameBoard
     gameBoard.initializePlayers(playerOne, playerTwo);
     // Show board and get rid of pre-game options
    const duringGame = document.querySelector('.during-game');
    duringGame.style.display = 'grid';
    const beforeGame = document.querySelector('.before-game');
    beforeGame.style.display = 'none';
})