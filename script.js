const snakeSizeInp = document.querySelector('#snake-size');
const fieldSizeInp = document.querySelector('#field-size');
const field = document.querySelector('#field');
const snakeDisplay = document.createElement('p');
const foodDisplay = document.createElement('p');
const handleKeyDown = function(event) {
    controlKeys(event);
}
snakeDisplay.innerText = '>'
foodDisplay.innerText = '0';
snakeDisplay.classList.add('snake');
foodDisplay.classList.add('food');
let snakeSize = 15;
let fieldSize = 400;
let windowWidth = Math.floor(window.innerWidth / 10) * 10;
let windowHeight = Math.floor(window.innerHeight / 10) * 10;
let posLeft = fieldSize / 2;
let posTop = fieldSize / 2;
let newLeft = posLeft;
let newTop = posTop;
snakeDisplay.style.left =`${posLeft}px`;
snakeDisplay.style.top = `${posTop}px`;
let foodLeft;
let foodTop;
let belly = [];
let interval;
let tempo = 80;
let gameEnd = false;
snakeSizeInp.addEventListener('click', (e) => {
    snakeSize = parseInt(e.target.value);
    updateSize();
})
fieldSizeInp.addEventListener('click', (e) => {
    fieldSize = parseInt(e.target.value);
    updateSize();
})

document.addEventListener('keydown', handleKeyDown)
function moveSnake (dir){
    clearInterval(interval)
    interval = setInterval(()=>{
        changeDirection(dir);
        if (gameEnd){
            gameOver()
            return;
        }
        if((
            posLeft >= foodLeft - snakeSize/2 && posLeft <= foodLeft + snakeSize/2) 
            && (posTop >= foodTop - snakeSize/2 && posTop <= foodTop + snakeSize/2)){
            eat();
        }
        if(belly.length > 0){
            for(let i = belly.length-1; i >= 0; i--){
                let item = belly[i]
                if(item.style.left === `${newLeft}px` && item.style.top === `${newTop}px`){
                    gameOver();
                    break;
                }
                if(i === 0){
                    item.style.left = `${posLeft}px`;
                    item.style.top = `${posTop}px`;
                    rotateBelly(item, i);
                } 
                else{ 
                    item.style.left = belly[i-1].style.left
                    item.style.top = belly[i-1].style.top
                    rotateBelly(item, i);
                }
            }
        }
        posLeft = newLeft;
        posTop = newTop;
        snakeDisplay.style.left = `${posLeft}px`;
        snakeDisplay.style.top = `${posTop}px`;
        }
    ,tempo);
}
function rotateBelly(item, i){
    let rotation = Number(snakeDisplay.style.transform.slice(7,-4)) + 90;
    setTimeout(()=>{
        item.style.transform = `rotate(${rotation}deg)`
    },i * tempo )
}
function controlKeys(e){
    disableBtn()
    if(e.key === 'Escape') {
        gameOver()
    }
    if(e.key === 'ArrowRight'){
        moveSnake('right')
    }
    if(e.key === 'ArrowLeft'){
        moveSnake('left')
    }
    if(e.key === 'ArrowDown'){
        moveSnake('down')
    }
    if(e.key === 'ArrowUp'){
        moveSnake('up')
    }
}
function changeDirection(dir){
    switch(dir){
        case('right'): 
        snakeDisplay.style.transform = 'rotate(0deg)'
            newLeft += snakeSize/1.5 - (snakeSize/1.5)%5;
            if(newLeft >= fieldSize) gameEnd = true;
            break;
        case('left'):
            snakeDisplay.style.transform = 'rotate(180deg)';
            newLeft -= snakeSize/1.5 - (snakeSize/1.5)%5;
            if(newLeft <= -snakeSize/2) gameEnd = true;
            break;
        case('up'):
            snakeDisplay.style.transform = 'rotate(270deg)'
            newTop -= snakeSize/1.5 - (snakeSize/1.5)%5;
            if(posTop <= 0 - snakeSize * 1.25) gameEnd = true;
            break;
        case('down'):
        snakeDisplay.style.transform = 'rotate(90deg)'
            newTop += snakeSize/1.5 - (snakeSize/1.5)%5;
            if(newTop >= fieldSize - snakeSize*1.5) gameEnd = true;
            break;
    }
}
function disableBtn(){
    snakeSizeInp.disabled = true;
    fieldSizeInp.disabled = true;
}
function unDisableBtn(){
    snakeSizeInp.disabled = false;
    fieldSizeInp.disabled = false;
}
function setFood(){
    left = fieldSize * Math.random();
    tp = fieldSize * Math.random() ;
    foodLeft = left - left % 5
    foodTop = tp - tp % 5 - snakeSize;
    if(foodLeft >= fieldSize - snakeSize){
        foodLeft -= snakeSize;
    }
    if(foodTop >= fieldSize - snakeSize * 2){
        foodTop -= snakeSize;
    }
    
    foodDisplay.style.left = `${foodLeft}px`
    foodDisplay.style.top = `${foodTop}px`
}
function gameOver(){
    clearInterval(interval);
    document.removeEventListener('keydown', handleKeyDown)
    alert('gameOver')
}
function eat(){
    setFood();
        belly.push(document.createElement('p'));
        let item = belly[belly.length-1];
        item.innerText = '0';
        item.classList.add('belly');
        item.style.fontSize = `${snakeSize}px`;
        field.append(item);
}
function updateSize(){
    snakeDisplay.style.fontSize = `${snakeSize}px`;
    foodDisplay.style.fontSize = `${snakeSize}px`;
    field.style.width = `${fieldSize}px`
    field.style.height = `${fieldSize}px`
    setFood()
}
function startGame(){
    unDisableBtn()
    setFood(); 
    field.append(snakeDisplay, foodDisplay)
    updateSize()
}



startGame()



