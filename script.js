const gamebox = document.querySelectorAll('.box')
const box = document.querySelector('.gamebox')
const turn = document.getElementById('turn');
const restart = document.getElementById('restart');
const textWin = document.getElementById('text-win');
let switchPlayer;
const x_player = 'x';
const o_player = 'o';
const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

startgame()

function startgame() {
    gamebox.forEach(cell => {
        cell.classList.remove('boxR')
        
    })
    box.classList.remove('gameboxR')

    switchPlayer = false
    gamebox.forEach(cell => {
        cell.addEventListener('click', handClick, { once: true })
    })
}

function handClick(e) {
    const cell = e.target
    const currentclass = switchPlayer ? o_player : x_player
    const turns = currentclass === "o" ? "X's Turn" : "O's Turn"
    turn.textContent = turns
    placeMark(cell, currentclass)
    if (checkWin(currentclass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentclass) {
    cell.textContent = currentclass
    cell.classList.add(currentclass)
}

function checkWin(currentclass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return gamebox[index].classList.contains(currentclass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        textWin.innerText = 'Draw!'
        textWin.setAttribute('style', 'opacity: 100%; transform: scale(5); visibility: visible;');
        turn.setAttribute('style', ' opacity: 0%; ');
        gamecompletes();
        drawcolor();
    } else {
        textWin.innerText = `${switchPlayer ? "O " : "X "} Wins!`;
        textWin.setAttribute('style', 'opacity: 100%;transform: scale(5); visibility: visible;');
        turn.setAttribute('style', ' opacity: 0%; ');
        gamecompletes();
        wincolor();
    }
}

function isDraw() {
    return [...gamebox].every(cell => {
        return cell.classList.contains(x_player) || cell.classList.contains(o_player)
    })
}

function swapTurns() {
    switchPlayer = !switchPlayer;
}

restart.addEventListener('click', function () {
    gamebox.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('o');
        cell.classList.remove('x');
        cell.setAttribute('style', ' background-color: rgb(33, 79, 230);')
    })
    turn.textContent = "X's Turn";
    turn.setAttribute('style', ' opacity: 100%; ')
    textWin.setAttribute('style', 'transform: scale(1);visibility: hidden;')
    restart.setAttribute('style', ' opacity: 0%; ')
    restart.classList.remove('blue-hover');
    startgame()
})

function gamecompletes() {
    gamebox.forEach(cell => {
        cell.classList.add('boxR')
        cell.removeEventListener('click', handClick)
    })
    box.classList.add('gameboxR')
    
}

function drawcolor(){
    gamebox.forEach(cell => {
        cell.setAttribute('style', 'box-shadow: 0px 0px 45px 6px rgba(255,0,0,0.30); background-color: red;')
    })
    restart.setAttribute('style', ' background: #0edf0e; transform: scale(1); ')
}

function wincolor(){
    gamebox.forEach(cell => {
        cell.setAttribute('style', 'box-shadow: 0px 0px 45px 6px rgba(5,255,0,0.30); background-color: #0edf0e;')
    })
    restart.setAttribute('style', ' background-color: rgb(33, 79, 230); transform: scale(1); ')
    restart.classList.add('blue-hover');
}
