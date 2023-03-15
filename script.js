let snake = '>'
let food = '0';
const body = document.querySelector('#body');
const snakeDisplay = document.createElement('p');
const foodDisplay = document.createElement('p');
let interval;
snakeDisplay.innerText = snake
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
                newLeft += 10;
                break;
            case('left'):
                newLeft -= 10;
                break;
            case('up'):
                newTop -= 10;
                break;
            case('down'):
                newTop += 10;
                break;
        }
    if(posLeft === foodLeft && posTop === foodTop){
        setFood();
        belly.push(document.createElement('p'));
        belly[belly.length-1].innerText = '0';
        belly[belly.length-1].classList.add('belly');
        body.append(belly[belly.length-1]);
    }
    if(belly.length > 0){
        for(let i = belly.length-1; i >= 0; i--){
            console.log(i);
            if(i === 0){
                belly[i].style.left = `${posLeft}px`;
                belly[i].style.top = `${posTop}px`;
            } 
            else{ 
                console.log(i, belly[i]);
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
    foodLeft = (Math.floor((window.innerWidth * Math.random()) / 10)) * 10
    foodTop = (Math.floor((window.innerHeight * Math.random()) / 10)) * 10
    foodDisplay.style.left = `${foodLeft}px`
    foodDisplay.style.top = `${foodTop}px`
}

setFood(); 
body.append(snakeDisplay, foodDisplay)


 


