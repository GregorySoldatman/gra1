const grid = document.querySelector('.game__grid')

for (let i = 0; i < 2500; i++) {
    const cell = document.createElement('p')
    cell.setAttribute('id', 'c' + i)
    cell.setAttribute('data-state', '0')
    cell.classList.add('game__cell')
    
    if (i % 17 == 0) {
        cell.setAttribute('data-state', '1')
        cell.style.backgroundColor = 'crimson'
    }
    
    grid.appendChild(cell)
}
