const cells = document.getElementsByClassName('col');
const divOverlay = document.getElementById('winnerOverlay');
const winnerName = document.getElementById('winnerName');
let currentPlayer = 'X';
let arr = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;

function clickCell(el) {
    const id = Number(el.id);
    if (arr[id] !== null) return; // Ignore clicks on already filled cells
    
    arr[id] = currentPlayer;
    el.innerText = currentPlayer;

    if (winner()) {
        // Update the score
        currentPlayer === 'X' ? scoreX++ : scoreO++;
        document.getElementById('scoreX').innerText = scoreX;
        document.getElementById('scoreO').innerText = scoreO;

        // Show the winner overlay
        divOverlay.style.display = 'block';
        winnerName.innerHTML = `Winner: ${currentPlayer}`;

        // Reset the board after 1 second
        setTimeout(() => {


            resetBoard();
        }, 1500); // Delay reset by 1 second to show winner message
    } else if (!arr.some(e => e === null)) {
        // It's a draw if no empty cells are left
        // Create a new div element
const drawMessageDiv = document.createElement('div');
drawMessageDiv.style.display = 'block';
drawMessageDiv.textContent = "It's a draw!";
drawMessageDiv.classList.add('drawMessage');
document.body.appendChild(drawMessageDiv);
setTimeout(() => {
    drawMessageDiv.remove(); // Removes the div after the timeout
}, 1500);


        // Reset the board after 1 second
        setTimeout(() => {
            removeOverlay();
            resetBoard();
        }, 1500); // Delay reset by 1 second to show draw message
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function winner() {
    // Check all possible winning combinations
    if (arr[0] !== null && arr[0] === arr[1] && arr[1] === arr[2]) return arr[0];
    if (arr[3] !== null && arr[3] === arr[4] && arr[4] === arr[5]) return arr[3];
    if (arr[6] !== null && arr[6] === arr[7] && arr[7] === arr[8]) return arr[6];
    if (arr[0] !== null && arr[0] === arr[3] && arr[3] === arr[6]) return arr[0];
    if (arr[1] !== null && arr[1] === arr[4] && arr[4] === arr[7]) return arr[1];
    if (arr[2] !== null && arr[2] === arr[5] && arr[5] === arr[8]) return arr[2];
    if (arr[0] !== null && arr[0] === arr[4] && arr[4] === arr[8]) return arr[0];
    if (arr[2] !== null && arr[2] === arr[4] && arr[4] === arr[6]) return arr[2];
    return null; // No winner yet
}

function resetBoard() {
    arr.fill(null); // Reset the array
    Array.from(cells).forEach(cell => (cell.innerText = '')); // Clear the cells
    currentPlayer = 'X'; // Reset the player to 'X'
}

Array.from(cells).forEach(cell => {
    cell.addEventListener('click', function () {
        clickCell(this);
    });
});

function removeOverlay() {
    divOverlay.style.display = 'none'; // Hide the overlay
    winnerName.innerHTML = ''; // Clear the winner message
}
