const snakeSizeInp = document.querySelector('#snake-size');
const fieldSizeInp = document.querySelector('#field-size');
const field = document.querySelector('#field');
const points = document.querySelector('#points')
const end = document.querySelector('#game-over');
const highScoreDisplay = document.querySelector('div.highscore')
const snakeDisplay = document.createElement('p');
const foodDisplay = document.createElement('p');
const handleKeyDown = function(event) {
    controlKeys(event);
}
const keys = document.querySelector("#svg2")
const keysUp = document.querySelector('path#up');
const keysRight = document.querySelector('path#right');
const keysDown = document.querySelector('path#down');
const keysLeft = document.querySelector('path#left');
const keysArray = [keysUp,keysRight,keysDown,keysLeft]
keysArray.forEach(key => {
    key.addEventListener('click', function(e){
        moveSnake(e.target.id)
    })
})

const arrowSwitch = document.querySelector("input[type='checkbox']");
arrowSwitch.addEventListener('change', ()=>{
    keys.classList.toggle("arrowDeactivated")
})


snakeDisplay.innerText = '>'
foodDisplay.innerText = '0';
snakeDisplay.classList.add('snake');
foodDisplay.classList.add('food');
field.append(snakeDisplay, foodDisplay);
let snakeSize = 15;
let fieldSize = 400;
let windowWidth = fieldSize;
let windowHeight = fieldSize;
let posLeft;
let posTop;
let newLeft;
let newTop;
let foodLeft;
let foodTop;
let belly = [];
let interval;
let bgInterval;
let tempo = 80;
let pointsCounter = 0;
let gameEnd = false;
let currentBgAlpha = 0;
let highScore;
let isNewHighScore = false;
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
            if(newLeft >= windowWidth) gameEnd = true;
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
            if(newTop >= windowHeight - snakeSize*1.5) gameEnd = true;
            break;
    }
}
function disableBtn(){
    snakeSizeInp.disabled = true;
    fieldSizeInp.disabled = true;
    arrowSwitch.disabled = true;
}
function unDisableBtn(){
    snakeSizeInp.disabled = false;
    fieldSizeInp.disabled = false;
    arrowSwitch.disabled = false;
}
function setFood(){
    left = windowWidth * Math.random();
    tp = windowHeight * Math.random() ;
    foodLeft = left - left % 5
    foodTop = tp - tp % 5 - snakeSize;
    if(foodLeft >= windowWidth - snakeSize){
        foodLeft -= snakeSize;
    }
    if(foodTop >= windowHeight - snakeSize * 2){
        foodTop -= snakeSize;
    }
    
    foodDisplay.style.left = `${foodLeft}px`
    foodDisplay.style.top = `${foodTop}px`
}
function eat(){
    setFood();
        belly.push(document.createElement('p'));
        let item = belly[belly.length-1];
        item.innerText = '0';
        item.classList.add('belly');
        item.style.fontSize = `${snakeSize}px`;
        field.append(item);
        if (belly.length % 2 != 0){
            item.style.color = 'rgb(71, 227, 255)';
        }
        if(belly.length % 3 === 0){
            levelUp()
        }
        pointsCounter++;
        points.innerText = pointsCounter
}
function levelUp(){
    tempo *= 0.9;
    currentBgAlpha += 0.1;
    if (currentBgAlpha >= 1.05){
        animateBgColor()
    }
    field.style.backgroundColor = `rgba(255, 99, 71, ${currentBgAlpha})`
}
function animateBgColor() {
    let i = 0;
    let colors = ['#ff6347', '#4787ff', '#47ffbf'];
    bgInterval = setInterval (()=>{
        field.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length
    }, tempo * 50)
}
function updateSize(){
    snakeDisplay.style.fontSize = `${snakeSize}px`;
    foodDisplay.style.fontSize = `${snakeSize}px`;
    windowWidth = fieldSize;
    windowHeight = fieldSize;
    if(windowWidth >= window.innerWidth - 40){
        windowWidth = window.innerWidth - 40;
    }
    if(windowHeight >= window.innerHeight - 125){
        windowHeight = window.innerHeight - 125;
    }
    field.style.width = `${windowWidth}px`
    field.style.height = `${windowHeight}px`
    setFood()
}
function startGame(){
    unDisableBtn()
    setFood(); 
    drawSnake();
    updateSize()
}
function gameOver(){
    clearInterval(interval);
    clearInterval (bgInterval);
    document.removeEventListener('keydown', handleKeyDown);
    end.classList.toggle('active');
    points.classList.toggle('score');
    snakeDisplay.classList.toggle('inactive')
    foodDisplay.classList.toggle('inactive')
    let bellySel = document.querySelectorAll('.belly');
    bellySel.forEach(item => item.classList.toggle('inactive'));
    points.style.right = `${windowWidth / 2 - 90}px`;
    points.style.top = `${windowHeight / 2 - 90}px`;
    getHighScore();
    points.innerHTML = `SCORE <div>${pointsCounter}</div> <div class="play-again">PLAY AGAIN<div>`;
    points.addEventListener('click', restart);
    document.addEventListener('keydown', keyRestart)
    if(isNewHighScore){
        highScoreDisplay.classList.toggle('inactive');
        highScoreDisplay.textContent = 'NEW HIGHSCORE';
    }
}
function keyRestart(event){
    if(event.key === 'Enter'){
        document.querySelector('.play-again').classList.toggle('hover');
        document.removeEventListener('keydown', keyRestart)
        setTimeout(()=>{
            restart()
        }, 500)
    }
}
function getHighScore(){
    if(highScore === undefined || pointsCounter >= highScore){
        highScore = pointsCounter;
        isNewHighScore = true;
    }
}
function drawSnake(){
    posLeft = windowWidth / 2;
    posTop = windowHeight / 2;
    newLeft = posLeft;
    newTop = posTop;
    snakeDisplay.style.left =`${posLeft}px`;
    snakeDisplay.style.top = `${posTop}px`;
}
function resetSnake(){
    let bellySel = document.querySelectorAll('.belly');
    bellySel.forEach(item => item.remove())
    pointsCounter = 0;
    gameEnd = false;
    currentBgAlpha = 0;
    tempo = 80;
    belly = [];
}
function restart(){
    resetSnake()
    if(isNewHighScore){
        highScoreDisplay.textContent = `HIGHSCORE ${highScore}`
        isNewHighScore = false;
        highScoreDisplay.classList.toggle('inactive');
    }
    snakeDisplay.classList.toggle('inactive')
    foodDisplay.classList.toggle('inactive')
    end.classList.toggle('active');
    points.classList.toggle('score');
    points.innerText = `${pointsCounter}`
    points.style.cssText = '';
    points.removeEventListener('click', restart);
    document.addEventListener('keydown', handleKeyDown);
    field.style.backgroundColor = 'white';
    startGame()
}



startGame()




