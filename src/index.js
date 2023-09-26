import beforeGame from "./beforeGame";
import './style.css';
import './fonts/crossed_out/Crossed\ Out.ttf';

export const gameBoard = (() => {
    let board = ['', '', '',
                   '', '', '' ,
                   '', '', ''];

    let playerOne;
    let playerTwo;

    let isAITurn = false;

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
        if (typeof gameOver(board) === 'string') return;
        // If it is AI's turn
        if (isAITurn === true) {
            isAITurn = false;
            aiMove(playerTwo.diff);
            displayBoard();
        }
    }

    const gameOver = (board) => {
        // Check for a win

        // Check diagonals
        if (board[4] !== '') {
            // Check up-to-down diagonal
            if (board[0] === board[4] && board[4] === board[8]) return 'win';
            // Check down-to-up-diagonal
            if (board[2] === board[4] && board[4] === board[6]) return 'win';
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

        if (playerTwo.diff > 0 && currentPlayer === playerOne) isAITurn = true;

        const gameResult = gameOver(board);
        if (typeof gameResult !== 'string') return;

        // Game ended
        const modal = document.querySelector('.end-game-modal');
        // modal.classList.add('end-game-modal');

        if (gameResult === 'win') {
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

    const minimax = (position, depth, maximizingPlayer, playerMarker, aiMarker) => {
        // Check if game finished last turn
        const beforeState = gameOver(position);
        if (typeof beforeState === 'string') {
            if (beforeState === 'win' && maximizingPlayer) {
                console.log('yes');
                return -1;
            } else if (beforeState === 'win') {
                return 1;
            } else {
                return 0;
            }
        }
        // If last depth check
        if (depth === 0) {
            const state = gameOver(position);
            if (typeof state !== 'string' || state === 'tie') {
                console.log('Depth : 0', 0);
                return 0;
            } else if (state === 'win' && maximizingPlayer) {
                console.log('Depth : 0', -1);
                return -1;
            } else {
                console.log('Depth : 0', 1);
                return 1;
            }
        }
        
        // Initialize the best move and score
        let bestMove = -1;
        let bestScore = maximizingPlayer ? -Infinity : Infinity;

        const possibleMoves = nextMoves(position, maximizingPlayer ? playerMarker : aiMarker);

        for (let i = 0; i < possibleMoves.length; i++) {
            const move = possibleMoves[i].copyBoard;
            const value = minimax(move, depth - 1, !maximizingPlayer, playerMarker, aiMarker);

            if (maximizingPlayer && value > bestScore) {
                bestScore = value;
                bestMove = possibleMoves[i].idx;
            } else if (!maximizingPlayer && value < bestScore) {
                bestScore = value;
                bestMove = possibleMoves[i].idx;
            }
        }

        return bestMove;
    }

    const nextMoves = (position, marker) => {
        const possibleMoves = [];
        // Find empty squares
        const emptyArr = [];
        for (let i = 0; i < position.length; i++) {
            if (position[i] === '') {
                emptyArr.push(i);
            }
        }
        // Add marker to empty squares and push to possibleMoves
        for (let i = 0; i < emptyArr.length; i++) {
            const copyBoard = [...position];
            copyBoard[emptyArr[i]] = marker;
            possibleMoves.push({copyBoard, idx: emptyArr[i]});
        }
        return possibleMoves;
    } 

    // blockWin takes an arr of possible moves generated by nextMoves and determines
    //   if there is an immediate win for the opponent
    const blockWin = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (gameOver(arr[i].copyBoard) === 'win') return arr[i].idx;
        }
        return -1;
    }

    const winGame = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (gameOver(arr[i].copyBoard) === 'win') return arr[i].idx;
        }
        return -1;
    }

    const doHard = () => {
        if (board[4] === '') {
            updateBoard(4);
            return true;
        } 
        const copyBoard = [...board];
        const possibleWin = nextMoves(copyBoard, playerTwo.marker);
        const win = winGame(possibleWin);
        if (win !== -1) {
            updateBoard(win);
            return true;
        }
        const possibleBlock = nextMoves(copyBoard, playerOne.marker);
        const block = blockWin(possibleBlock);
        if (block !== -1) {
            updateBoard(block);
            return true;
        }
    }

    const middle = () => {
        let middle = true;
            for (let i = 0; i < board.length; i++) {
                if (i === 4) continue;
                if (board[i] !== '') {
                    middle = false;
                    break;
                }
            }
            if (middle) {
                console.log('yes');
                const options = [0, 2, 6, 8];
                let idx = Math.floor(Math.random() * 4);
                if (idx === 4) idx = 3;
                updateBoard(options[idx]);
                return true;
            }
    }

    const aiMove = (difficulty) => {
        if (difficulty === 1) {
            // Put all possibilities in the array emptySquare then select an indice at random
            const emptySquares = [];
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    emptySquares.push(i);
                }
            }
            const idx = Math.floor(Math.random() * emptySquares.length);
            const randomIdx = idx === emptySquares.length ? idx - 1 : idx;
            updateBoard(emptySquares[randomIdx]);
        } else if (difficulty === 2) {
            if (doHard()) return;
            const idx = minimax([...board], 5, false, playerOne.marker, playerTwo.marker);
            updateBoard(idx);
        } else {
            if (doHard() || middle()) return;
            const idx = minimax([...board], 5, false, playerOne.marker, playerTwo.marker);
            updateBoard(idx);
        }
    }

    return {initializePlayers, updateBoard, displayBoard};
})();

gameBoard.displayBoard();

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

export const playerFactory = (name, marker, score, diff) => {
    return {
        name, 
        marker,
        score,
        diff,
    };
};

const preGameChoice = document.querySelector('.ai-or-p2'),
  aiBtn = document.querySelector('.ai'),
  p2Btn = document.querySelector('.p2');
p2Btn.addEventListener('click', () => {
  preGameChoice.style.display = 'none';
  const before = document.querySelector('.before-game-player');
  beforeGame('p2');
  before.style.display = 'grid';
});
aiBtn.addEventListener('click', () => {
  preGameChoice.style.display = 'none';
  const before = document.querySelector('.before-game-ai');
  beforeGame('ai');
  before.style.display = 'grid';
})
