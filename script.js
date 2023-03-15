let food = '0';
const field = document.querySelector('#field');
let fieldWidth = Number((getComputedStyle(field).width).split('').slice(0,-2).join(''))
let fieldHeight = Number((getComputedStyle(field).height).split('').slice(0,-2).join(''))
const snakeDisplay = document.createElement('p');
const foodDisplay = document.createElement('p');
let interval;
snakeDisplay.innerText = '>'
snakeDisplay.classList.add('snake');
foodDisplay.innerText = food;
foodDisplay.classList.add('food');
let endGame = true;
let posLeft = 20;
let posTop = 0;
// posLeft = Number(posLeft.split('').slice(0,-2).join(''));
// posTop = Number(posTop.split('').slice(0,-2).join(''));
let newLeft = posLeft;
let newTop = posTop;
snakeDisplay.style.left =`${posLeft}px`;
snakeDisplay.style.top = `${posTop}px`;
let foodLeft;
let foodTop;
let belly = [];


document.body.addEventListener('keydown', function(e){
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
})

function moveSnake (dir){
    clearInterval(interval)
    interval = setInterval(()=>{
        changeDirection(dir);
        if(posLeft === foodLeft && posTop === foodTop){
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
                } 
                else{ 
                    item.style.left = belly[i-1].style.left
                    item.style.top = belly[i-1].style.top
                }
            }
        }
        posLeft = newLeft;
        posTop = newTop;
        snakeDisplay.style.left = `${posLeft}px`;
        snakeDisplay.style.top = `${posTop}px`;
        
        },50);
}

function setFood(){
    foodLeft = (Math.floor((window.innerWidth * Math.random()) / 10)) * 10 + 20;
    foodTop = (Math.floor((window.innerHeight * Math.random()) / 10)) * 10;
    if(foodLeft >= window.innerWidth - 20){
        foodLeft -= 30;
    }
    if(foodTop >= window.innerHeight - 20){
        foodTop -= 30;
    }
    
    foodDisplay.style.left = `${foodLeft}px`
    foodDisplay.style.top = `${foodTop}px`
}



function gameOver(){
    clearInterval(interval);
    alert('gameOver')
}
function changeDirection(dir){
    switch(dir){
        case('right'): 
        snakeDisplay.style.cssText = 'transform: rotate(0deg)'
            newLeft += 10;
            if(newLeft >= window.innerWidth - 20) gameOver();
            break;
        case('left'):
            snakeDisplay.style.cssText = 'transform: rotate(180deg)';
            newLeft -= 10;
            if(newLeft <= 10) gameOver();
            break;
        case('up'):
            snakeDisplay.style.cssText = 'transform: rotate(270deg)'
            newTop -= 10;
            if(posTop <= 0) gameOver();
            break;
        case('down'):
        snakeDisplay.style.cssText = 'transform: rotate(90deg)'
            newTop += 10;
            if(newTop >= window.innerHeight - 20) gameOver();
            break;
    }
}
function eat(){
    setFood();
        belly.push(document.createElement('p'));
        belly[belly.length-1].innerText = '0';
        belly[belly.length-1].classList.add('belly');
        field.append(belly[belly.length-1]);
}

setFood(); 
field.append(snakeDisplay, foodDisplay)
