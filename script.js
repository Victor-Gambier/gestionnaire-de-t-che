document.addEventListener('DOMContentLoaded', function() {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let currentPlayer = 'X';
    let gameover = false;

    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!gameover && cell.textContent === '') {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                
                board[row][col] = currentPlayer;
                cell.textContent = currentPlayer;
                
                if (checkWinner()) {
                    statusDisplay.textContent = `Le joueur ${currentPlayer} a gagné !`;
                    gameover = true;
                } else if (isBoardFull()) {
                    statusDisplay.textContent = "Match nul !";
                    gameover = true;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    statusDisplay.textContent = `C'est à ${currentPlayer} de jouer.`;
                }
            }
        });
    });

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    function checkWinner() {
        // Vérification des lignes
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
                return true;
            }
        }

        // Vérification des colonnes
        for (let j = 0; j < 3; j++) {
            if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') {
                return true;
            }
        }

        // Vérification des diagonales
        if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') ||
            (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '')) {
            return true;
        }

        return false;
    }

    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    function resetGame() {
        board.forEach(row => {
            row.fill('');
        });

        cells.forEach(cell => {
            cell.textContent = '';
        });

        currentPlayer = 'X';
        gameover = false;
        statusDisplay.textContent = `C'est à ${currentPlayer} de jouer.`;
    }
});
