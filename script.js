const snake = '>'
const body = document.querySelector('#body');
const bodyWidth = window.innerWidth;
const bodyHeight = window.innerHeight;
const snakeDisplay = document.createElement('p');
snakeDisplay.textContent = snake
snakeDisplay.classList.add('snake')
body.append(snakeDisplay)

let endGame = true;
let currentPosLeft = getComputedStyle(snakeDisplay).left;
let currentPosTop = getComputedStyle(snakeDisplay).top;
currentPosLeft = Number(currentPosLeft.split('').slice(0,-2).join(''));
currentPosTop = Number(currentPosTop.split('').slice(0,-2).join(''));

document.body.addEventListener('keydown', function(e){
    console.log(e.key)
    if(e.key === 'Enter') {
        endGame = false;
    }
    if(e.key === 'ArrowRight'){
        if(currentPosLeft >= window.innerWidth - 30) return;
        currentPosLeft += 10;
        snakeDisplay.style.left = `${currentPosLeft}px`;
    }
    if(e.key === 'ArrowLeft'){
        if(currentPosLeft <= 20) return;
        currentPosLeft -= 10;
        snakeDisplay.style.left = `${currentPosLeft}px`;
    }
    if(e.key === 'ArrowDown'){
        if(currentPosTop >= window.innerHeight - 50) return;
        currentPosTop += 10;
        snakeDisplay.style.top = `${currentPosTop}px`;
    }
    if(e.key === 'ArrowUp'){
        if(currentPosTop <= 0) return;
        currentPosTop -= 10;
        snakeDisplay.style.top = `${currentPosTop}px`;
    }
})



    


 


