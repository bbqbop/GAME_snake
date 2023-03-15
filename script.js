const snake = '>'
const food = '0';
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
let foodLeft;
let foodTop;
posLeft = Number(posLeft.split('').slice(0,-2).join(''));
posTop = Number(posTop.split('').slice(0,-2).join(''));

document.body.addEventListener('keydown', function(e){
    console.log(e.key)
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
                posLeft += 10;
                break;
            case('left'):
                posLeft -= 10;
                break;
            case('up'):
                posTop -= 10;
                break;
            case('down'):
                posTop += 10;
                break;
        }
    snakeDisplay.style.left = `${posLeft}px`;
    snakeDisplay.style.top = `${posTop}px`;
    },200);
}

function setFood(){
    foodLeft = (Math.floor((window.innerWidth * Math.random()) / 10)) * 10
    foodTop = (Math.floor((window.innerHeight * Math.random()) / 10)) * 10
    foodDisplay.style.left = `${foodLeft}px`
    foodDisplay.style.top = `${foodTop}px`
}

setFood(); 
body.append(snakeDisplay, foodDisplay)

if(posLeft === foodLeft && posTop === foodTop){
    alert('FEAST')
    setFood();
    snake += food;
    snakeDisplay.innerText = snake
}

 


