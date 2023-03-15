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
let posLeft = getComputedStyle(snakeDisplay).left;
let posTop = getComputedStyle(snakeDisplay).top;
posLeft = Number(posLeft.split('').slice(0,-2).join(''));
posTop = Number(posTop.split('').slice(0,-2).join(''));
let newLeft = posLeft;
let newTop = posTop;
let foodLeft;
let foodTop;
let belly = [];


document.body.addEventListener('keydown', function(e){
    if(e.key === 'Enter') {
        endGame = false;
    }
    if(e.key === 'ArrowRight'){
        if(posLeft >= window.innerWidth - 30) return;
        changeDirection('right')
    }
    if(e.key === 'ArrowLeft'){
        if(posLeft <= 20) return;
        changeDirection('left')
    }
    if(e.key === 'ArrowDown'){
        if(posTop >= window.innerHeight - 50) return;
        changeDirection('down')
    }
    if(e.key === 'ArrowUp'){
        if(posTop <= 0) return;
        changeDirection('up')
    }
})

function changeDirection (dir){
    clearInterval(interval)
    interval = setInterval(()=>{
        switch(dir){
            case('right'): 
            snakeDisplay.style.cssText = 'transform: rotate(0deg)'
                newLeft += 10;
                break;
            case('left'):
                snakeDisplay.style.cssText = 'transform: rotate(180deg)';
                newLeft -= 10;
                break;
            case('up'):
                snakeDisplay.style.cssText = 'transform: rotate(270deg)'
                newTop -= 10;
                break;
            case('down'):
            snakeDisplay.style.cssText = 'transform: rotate(90deg)'
                newTop += 10;
                break;
        }
    if(posLeft === foodLeft && posTop === foodTop){
        setFood();
        belly.push(document.createElement('p'));
        belly[belly.length-1].innerText = '0';
        belly[belly.length-1].classList.add('belly');
        field.append(belly[belly.length-1]);
    }
    if(belly.length > 0){
        for(let i = belly.length-1; i >= 0; i--){
            if(i === 0){
                belly[i].style.left = `${posLeft}px`;
                belly[i].style.top = `${posTop}px`;
            } 
            else{ 
                belly[i].style.left = belly[i-1].style.left
                belly[i].style.top = belly[i-1].style.top
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
    foodLeft = (Math.floor((fieldWidth * Math.random()) / 10)) * 10 + 20;
    foodTop = (Math.floor((fieldHeight * Math.random()) / 10)) * 10 + 20;
    if(foodLeft >= fieldWidth - 40){
        foodLeft -= 20
    }
    if(foodTop >= fieldWidth - 40){
        foodTop -= 20
    }
    
    foodDisplay.style.left = `${foodLeft}px`
    foodDisplay.style.top = `${foodTop}px`
}

setFood(); 
field.append(snakeDisplay, foodDisplay)


 


