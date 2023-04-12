window.addEventListener('load', function() {
    snowFall();

    let buttons = document.querySelectorAll('button');
    let boxes = document.querySelectorAll('.container-game div');

    let reset = document.getElementsByClassName('restart')[0];

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            setTimeout(() => {
                // hidden button
                document.getElementsByClassName('container-buttons')[0].style.display = 'none';
                
                // show game, score and button restart
                document.getElementsByClassName('container-game')[0].style.display = 'grid';
                document.getElementsByClassName('container-score')[0].style.display = 'grid';
                document.getElementsByClassName('restart')[0].style.display = 'grid';
            }, 500);
        });
    });

    reset.addEventListener('click', function() {
        resetGame();

        score = document.querySelector('.score-x');
        score.textContent = 0;
        score = document.querySelector('.score-o');
        score.textContent = 0;
        score = document.querySelector('.score-tie');
        score.textContent = 0;
    });

    let player1 = 0;
    let player2 = 0;

    boxes.forEach(function(box) {
        box.addEventListener('click', function() {
            let element = checkElement(player1, player2);
            
            if (this.childNodes.length == 0) {
                this.appendChild(element.cloneNode(true));

                if (player1 == player2) {
                    player1++;
                } else {
                    player2++;
                }

                checkWinCondition();
            }
        });
    });
});

function createSnow(snow) {
    snow.style.width = '5px';
    snow.style.height = '5px';
    snow.style.backgroundColor = 'white';
    snow.style.position = 'absolute';
    snow.style.left = Math.floor(Math.random() * window.innerWidth - 10) + 'px';
    snow.style.top = '0px';
    snow.style.borderRadius = '50%';
    snow.style.transform = 'translateY(0px)';

    return snow;
}

function snowFall() {
    for (let i = 0; i < 20; i++) {
        setTimeout(function() {
            let container = document.getElementById('container');

            let snow = document.createElement('div');
            snow = createSnow(snow);

            let animation = snow.animate([

                {transform: `translateY(${window.innerHeight - 10}px)`},
            ], {
                duration: 5000,
                iterations: Infinity
            });

            container.appendChild(animation.effect.target);
        }, Math.random() * 5000);
    }
}

function checkElement(player1, player2) {
    let element = document.createElement('div');

    if(player1 == player2) {
        element.innerHTML = 'X';
        element.style.color = '#F45050'
    } else {
        element.innerHTML = 'O'
        element.style.color = '#F9D949'
    }

    return element;
}

function checkWinCondition(){
    box1 = document.getElementById('block1');
    box2 = document.getElementById('block2');
    box3 = document.getElementById('block3');
    box4 = document.getElementById('block4');
    box5 = document.getElementById('block5');
    box6 = document.getElementById('block6');
    box7 = document.getElementById('block7');
    box8 = document.getElementById('block8');
    box9 = document.getElementById('block9');
    
    if (box1.childNodes[0] != undefined && box2.childNodes[0] != undefined && box3.childNodes[0] != undefined) {
        if (box1.childNodes[0].innerHTML == box2.childNodes[0].innerHTML && box1.childNodes[0].innerHTML == box3.childNodes[0].innerHTML) {
            declareWinner(box1);
        }
    } if (box4.childNodes[0] != undefined && box5.childNodes[0] != undefined && box6.childNodes[0] != undefined) {
        if (box4.childNodes[0].innerHTML == box5.childNodes[0].innerHTML && box4.childNodes[0].innerHTML == box6.childNodes[0].innerHTML) {
            declareWinner(box4);
        }
    } if (box7.childNodes[0] != undefined && box8.childNodes[0] != undefined && box9.childNodes[0] != undefined) {
        if (box7.childNodes[0].innerHTML == box8.childNodes[0].innerHTML && box7.childNodes[0].innerHTML == box9.childNodes[0].innerHTML) {
            declareWinner(box7);
        }
    } if (box1.childNodes[0] != undefined && box4.childNodes[0] != undefined && box7.childNodes[0] != undefined) {
        if (box1.childNodes[0].innerHTML == box4.childNodes[0].innerHTML && box1.childNodes[0].innerHTML == box7.childNodes[0].innerHTML) {
            declareWinner(box1);
        }
    } if (box2.childNodes[0] != undefined && box5.childNodes[0] != undefined && box8.childNodes[0] != undefined) {
        if (box2.childNodes[0].innerHTML == box5.childNodes[0].innerHTML && box2.childNodes[0].innerHTML == box8.childNodes[0].innerHTML) {
            declareWinner(box2);
        }
    } if (box3.childNodes[0] != undefined && box6.childNodes[0] != undefined && box9.childNodes[0] != undefined) {
        if (box3.childNodes[0].innerHTML == box6.childNodes[0].innerHTML && box3.childNodes[0].innerHTML == box9.childNodes[0].innerHTML) {
            declareWinner(box3);
        }
    } if (box1.childNodes[0] != undefined && box5.childNodes[0] != undefined && box9.childNodes[0] != undefined) {
        if (box1.childNodes[0].innerHTML == box5.childNodes[0].innerHTML && box1.childNodes[0].innerHTML == box9.childNodes[0].innerHTML) {
            declareWinner(box1);
        }
    } if (box3.childNodes[0] != undefined && box5.childNodes[0] != undefined && box7.childNodes[0] != undefined) {
        if (box3.childNodes[0].innerHTML == box5.childNodes[0].innerHTML && box3.childNodes[0].innerHTML == box7.childNodes[0].innerHTML) {
            declareWinner(box3);
        }
    }

    let counter = 0;

    for (let i = 1; i <= 9; i++) {
        if (document.getElementById('block' + i).childNodes[0] != undefined) {
            counter++;
        }
    }

    if (counter == 9) {
        declareWinner('');
    }
}

function declareWinner(box) {
    let messageContainer = document.querySelector('#message');
    let messageText = document.querySelector('#message p');

    let score;

    if (box.textContent == 'X') {
        score = document.querySelector('.score-x')
        score.textContent = parseInt(score.textContent) + 1;

        messageText.innerHTML = 'Player 1 wins!';

        messageContainer.style.backgroundColor = '#F45050';
        messageContainer.style.display = 'flex';
    } else if (box.textContent == 'O') {
        score = document.querySelector('.score-o');
        score.textContent = parseInt(score.textContent) + 1;
    
        messageText.innerHTML = 'Player 2 wins!';

        messageContainer.style.backgroundColor = '#F9D949';
        messageContainer.style.display = 'flex';
    } else {
        score = document.querySelector('.score-tie');
        score.textContent = parseInt(score.textContent) + 1;
    
        messageText.innerHTML = 'Tie!';

        messageContainer.style.backgroundColor = '#2b334d';
        messageContainer.style.display = 'flex';
    }

    setTimeout(function() {
        messageContainer.style.display = 'none';
    }, 3000);

    resetGame();
}

function resetGame() {
    let boxesToRemove = document.querySelectorAll('.container-game div');

    boxesToRemove.forEach(box => {
        box.innerHTML = '';
    });
}