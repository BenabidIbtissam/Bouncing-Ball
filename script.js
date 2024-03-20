document.addEventListener('DOMContentLoaded', function () {
    const stage = document.getElementById('stage');
    const ball = document.getElementById('ball');
    const paddle = document.getElementById('paddle');
    const startBtn = document.getElementById('startBtn');
    const retryBtn = document.getElementById('retryBtn');
    const gameOverMsg = document.getElementById('gameOver');
  
    let isGameRunning = false;
    let paddleX = stage.offsetWidth / 2 - paddle.offsetWidth / 2;
  
    startBtn.addEventListener('click', function () {
      startBtn.style.display = 'none';
      ball.style.display = 'block';
      paddle.style.display = 'block';
      isGameRunning = true;
      moveBall();
    });
  
    retryBtn.addEventListener('click', function () {
      retryBtn.style.display = 'none';
      gameOverMsg.style.display = 'none';
      startBtn.style.display = 'block';
      isGameRunning = false;
      paddleX = stage.offsetWidth / 2 - paddle.offsetWidth / 2;
      paddle.style.left = paddleX + 'px';
    });
  
    function moveBall() {
      let posX = 0;
      let posY = 0;
      let speedX = Math.random() * 6 - 2; // Vitesse horizontale aléatoire entre -2 et 2
      let speedY = Math.random() * 6 - 2; // Vitesse verticale aléatoire entre -2 et 2
    
      function updateBallPosition() {
        if (!isGameRunning) return;
    
        posX += speedX;
        posY += speedY;
    
        // Vérifie si la balle touche les bords horizontaux du stage et inverse la direction si c'est le cas
        if (posX <= 0 || posX >= stage.offsetWidth - ball.offsetWidth) {
          speedX = -speedX;
        }
    
        // Vérifie si la balle touche les bords verticaux du stage et inverse la direction si c'est le cas
        if (posY <= 0) {
          speedY = -speedY;
        }

        // Vérifie si la balle touche la plaque
        if (posY + ball.offsetHeight >= stage.offsetHeight - paddle.offsetHeight && posX + ball.offsetWidth >= paddleX && posX <= paddleX + paddle.offsetWidth) {
          speedY = -speedY;
        }
    
        // Vérifie si la balle touche la borne inferieure du stage
        if (posY >= stage.offsetHeight - ball.offsetHeight) {
          endGame();
          return;
        }
    
        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';
    
        requestAnimationFrame(updateBallPosition);
      }
    
      updateBallPosition();
    }
  
    // Gestion des déplacements de la plaque avec les touches du clavier
    document.addEventListener('keydown', function(event) {
      if (isGameRunning) {
        if (event.key === 'ArrowLeft') {
          paddleX -= 30;
        } else if (event.key === 'ArrowRight') {
          paddleX += 30;
        }
  
        // Limiter le mouvement de la plaque à l'intérieur du stage
        paddleX = Math.max(0, Math.min(stage.offsetWidth - paddle.offsetWidth, paddleX));
  
        paddle.style.left = paddleX + 'px';
      }
    });
  
    function endGame() {
      isGameRunning = false;
      gameOverMsg.style.display = 'block';
      retryBtn.style.display = 'block';
    }
  
    moveBall();
  });
