const grid = document.querySelector('.game__grid')
const startButton = document.querySelector('.game__start')
const stopButton = document.querySelector('.game__stop')

const cellArray = []
let row = []

let life

for (let i = 1; i <= 2500; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('id', 'c' + i)
    cell.classList.add('game__cell')

    if (i % 3 == 0) {
        cell.classList.add('alive')
    }

    row.push(cell)

    if (row.length == 50) {
        cellArray.push(row)
        row = []
    }
    grid.appendChild(cell)
}

const checkNeighbours = (row, pos) => {
    let counter = 0
    let neighbours = []

    if (row == 0 && pos == 0) {
        neighbours.push(cellArray[row][pos + 1])
        neighbours.push(cellArray[row + 1][pos])
        neighbours.push(cellArray[row + 1][pos + 1])
    }
    else if (row == 0 && pos == 49) {
        neighbours.push(cellArray[row][pos - 1])
        neighbours.push(cellArray[row + 1][pos - 1])
        neighbours.push(cellArray[row + 1][pos])
    }
    else if (row == 49 && pos == 0) {
        neighbours.push(cellArray[row - 1][pos])
        neighbours.push(cellArray[row - 1][pos + 1])
        neighbours.push(cellArray[row][pos + 1])
    }
    else if (row == 49 && pos == 49) {
        neighbours.push(cellArray[row - 1][pos - 1])
        neighbours.push(cellArray[row - 1][pos])
        neighbours.push(cellArray[row][pos - 1])
    }
    else if (row == 0) {
        neighbours.push(cellArray[row][pos - 1])
        neighbours.push(cellArray[row][pos + 1])
        neighbours.push(cellArray[row + 1][pos - 1])
        neighbours.push(cellArray[row + 1][pos])
        neighbours.push(cellArray[row + 1][pos + 1])
    }
    else if (row == 49) {
        neighbours.push(cellArray[row - 1][pos - 1])
        neighbours.push(cellArray[row - 1][pos])
        neighbours.push(cellArray[row - 1][pos + 1])
        neighbours.push(cellArray[row][pos - 1])
        neighbours.push(cellArray[row][pos + 1])
    }
    else if (pos == 0) {
        neighbours.push(cellArray[row - 1][pos])
        neighbours.push(cellArray[row - 1][pos + 1])
        neighbours.push(cellArray[row][pos + 1])
        neighbours.push(cellArray[row + 1][pos])
        neighbours.push(cellArray[row + 1][pos + 1])
    }
    else if (pos == 49) {
        neighbours.push(cellArray[row - 1][pos - 1])
        neighbours.push(cellArray[row - 1][pos])
        neighbours.push(cellArray[row][pos - 1])
        neighbours.push(cellArray[row + 1][pos - 1])
        neighbours.push(cellArray[row + 1][pos])
    }
    else {
        neighbours.push(cellArray[row - 1][pos - 1])
        neighbours.push(cellArray[row - 1][pos])
        neighbours.push(cellArray[row - 1][pos + 1])
        neighbours.push(cellArray[row][pos - 1])
        neighbours.push(cellArray[row][pos + 1])
        neighbours.push(cellArray[row + 1][pos - 1])
        neighbours.push(cellArray[row + 1][pos])
        neighbours.push(cellArray[row + 1][pos + 1])
    }

    for (const element of neighbours) {
        if (element.classList.contains('alive')) {
            counter++
        }
    }
    return counter
}

const tick = () => {
    let y = 0   // row number
    let x = 0   // position in the row
    let ln = 0  // living neighbours

    let newborn = []
    let dying = []

    for (i = 1; i <= 2500; i++) {
        ln = checkNeighbours(y, x)
        if (cellArray[y][x].classList.contains('alive')) {
            if (ln < 2) {
                dying.push(cellArray[y][x])
            }
            else if (ln > 3) {
                dying.push(cellArray[y][x])
            }
            else if (ln == 2 || ln == 3) {
                // Do nothing
            }
            else {
                dying.push(cellArray[y][x])
            }
        }
        else {
            if (ln == 3) {
                newborn.push(cellArray[y][x])
            }
            else {
                // Do nothing
            }
        }

        if (x == 49) {
            y++
            x = 0
        }
        else {
            x++
        }
    }
    for (const cell of newborn) {
        cell.classList.add('alive')
    }
    for (const cell of dying) {
        cell.classList.remove('alive')
    }
}

startButton.addEventListener('click', () => {
    life = setInterval(() => {tick()}, 333)
})

stopButton.addEventListener('click', () => {
    clearInterval(life)
})