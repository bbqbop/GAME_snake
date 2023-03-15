const snake = '>'
const body = document.querySelector('#body');
const snakeDisplay = document.createElement('p');
let interval;
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
        changeDirection('right')
    }
    if(e.key === 'ArrowLeft'){
        if(currentPosLeft <= 20) return;
        changeDirection('left')
    }
    if(e.key === 'ArrowDown'){
        if(currentPosTop >= window.innerHeight - 50) return;
        changeDirection('down')
    }
    if(e.key === 'ArrowUp'){
        if(currentPosTop <= 0) return;
        changeDirection('up')
    }
})

function changeDirection (dir){
    clearInterval(interval)
    interval = setInterval(()=>{
        switch(dir){
            case('right'): 
                currentPosLeft += 10;
                break;
            case('left'):
                currentPosLeft -= 10;
                break;
            case('up'):
                currentPosTop -= 10;
                break;
            case('down'):
                currentPosTop += 10;
                break;
        }
    snakeDisplay.style.left = `${currentPosLeft}px`;
    snakeDisplay.style.top = `${currentPosTop}px`;
    },200);
}


    


 


