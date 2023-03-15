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
let PosLeft = getComputedStyle(snakeDisplay).left;
let PosTop = getComputedStyle(snakeDisplay).top;
let foodPosLeft;
let foodPosTop;
PosLeft = Number(PosLeft.split('').slice(0,-2).join(''));
PosTop = Number(PosTop.split('').slice(0,-2).join(''));

document.body.addEventListener('keydown', function(e){
    console.log(e.key)
    if(e.key === 'Enter') {
        endGame = false;
    }
    if(e.key === 'ArrowRight'){
        if(PosLeft >= window.innerWidth - 30) return;
        changeDirection('right')
    }
    if(e.key === 'ArrowLeft'){
        if(PosLeft <= 20) return;
        changeDirection('left')
    }
    if(e.key === 'ArrowDown'){
        if(PosTop >= window.innerHeight - 50) return;
        changeDirection('down')
    }
    if(e.key === 'ArrowUp'){
        if(PosTop <= 0) return;
        changeDirection('up')
    }
})

function changeDirection (dir){
    clearInterval(interval)
    interval = setInterval(()=>{
        switch(dir){
            case('right'): 
                PosLeft += 10;
                break;
            case('left'):
                PosLeft -= 10;
                break;
            case('up'):
                PosTop -= 10;
                break;
            case('down'):
                PosTop += 10;
                break;
        }
    snakeDisplay.style.left = `${PosLeft}px`;
    snakeDisplay.style.top = `${PosTop}px`;
    },200);
}

function setFood(){
    foodPosLeft = (Math.floor((window.innerWidth * Math.random()) / 10)) * 10
    foodPosTop = (Math.floor((window.innerHeight * Math.random()) / 10)) * 10
    foodDisplay.style.left = `${foodPosLeft}px`
    foodDisplay.style.top = `${foodPosTop}px`
}

if(PosLeft === foodPosLeft && PosTop === foodPosTop)
   
setFood(); 
body.append(snakeDisplay, foodDisplay)

 


