(function () {

  //---------------------Variables Initialization-------------------
  const cnv = document.querySelector('#canvas');
  const ctx = cnv.getContext('2d');
  let moveLeft = false;
  let moveUp = false;
  let moveRight = false;
  let moveDown = false;
  let mLeft = false;
  let mUp = false;
  let mRight = false;
  let mDown = false;
  let lifeRed = 100;
  let lifeBlue = 100;
  const players = [];
  let contador = 0;
  let check = false;
  //---------------------Images Linking--------------------

  let player1 = new Image();
  player1.src = '../images/red.png'
  let player2 = new Image();
  player2.src = '../images/blue.png'
  let quadradox = new Image();
  quadradox.src = '../images/kamehameha.gif'
  let quadradoy = new Image();
  quadradoy.src = '../images/kamehameha.gif'
  let endscreen = new Image();
  endscreen.src = '../images/game-over.jpg'
  let telastart = new Image();
  telastart.src = '../images/start.png'

  //-------------------------------------------------------

  //---------------------Players Creation------------------

  let playerx = new player(1350, 200, 150, 150, "transparent", 5);
  players.push(playerx);

  const playery = new player(50, 700, 150, 150, "transparent", 5);
  players.push(playery);

  const quadrado2 = new player(175, 180, 550, 50, "#fff", 0);
  players.push(quadrado2);

  const quadrado3 = new player(600, 650, 700, 50, "#fff", 0);
  players.push(quadrado3);

  //-------------------------------------------------------

  //---------------------Teclas RED---------------------

  window.addEventListener('keydown', function (e) {
    const nomeKey = e.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'ArrowLeft':
        moveLeft = true;
        break;
      case 'ArrowUp':
        moveUp = true;
        break;
      case 'ArrowRight':
        moveRight = true;
        break;
      case 'ArrowDown':
        moveDown = true;
        break;
    }
  });


  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case 'ArrowLeft':
        moveLeft = false;
        break;
      case 'ArrowUp':
        moveUp = false;
        break;
      case 'ArrowRight':
        moveRight = false;
        break;
      case 'ArrowDown':
        moveDown = false;
        break;
    }
  });

  //-------------------------------------------------------


  //---------------------Teclas BLUE--------------------

  window.addEventListener('keydown', function (e) {
    const nomeKey = e.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'a':
        mLeft = true;
        break;
      case 'w':
        mUp = true;
        break;
      case 'd':
        mRight = true;
        break;
      case 's':
        mDown = true;
        break;
    }
  });

  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case 'a':
        mLeft = false;
        break;
      case 'w':
        mUp = false;
        break;
      case 'd':
        mRight = false;
        break;
      case 's':
        mDown = false;
        break;
    }
  });

  //------------------------------------------------------

  //---------------------Movimento RED--------------------

  function moverRed() {

    if (moveLeft && !moveRight) {
      playerx.posX -= playerx.velocidade;
    }
    if (moveRight && !moveLeft) {
      playerx.posX += playerx.velocidade;
    }
    if (moveUp && !moveDown) {
      playerx.posY -= playerx.velocidade;
    }
    if (moveDown && !moveUp) {
      playerx.posY += playerx.velocidade;
    }

    playerx.posX = Math.max(0, Math.min(cnv.width - playerx.width, playerx.posX));
    playerx.posY = Math.max(0, Math.min(cnv.height - playerx.height, playerx.posY));
  }

  //-----------------------------------------------------

  //---------------------Movimento BLUE------------------

  function moverBlue() {

    if (mLeft && !mRight) {
      playery.posX -= playery.velocidade;
    }
    if (mRight && !mLeft) {
      playery.posX += playery.velocidade;
    }
    if (mUp && !mDown) {
      playery.posY -= playery.velocidade;
    }
    if (mDown && !mUp) {
      playery.posY += playery.velocidade;
    }
    playery.posX = Math.max(0, Math.min(cnv.width - playery.width, playery.posX));
    playery.posY = Math.max(0, Math.min(cnv.height - playery.height, playery.posY));

  }

  //------------------------------------------------------

  //---------------------Sistema de Colisão---------------

  function colisao() {

    //Player x Player

    if ((playerx.posX + playerx.width) > playery.posX && playerx.posX < (playery.posX + playery.width) && ((playerx.posY + playerx.height) > playery.posY && playerx.posY < (playery.posY + playery.height))) {
      playerx.posX = 1350;
      playerx.posY = 200;
      playery.posX = 50;
      playery.posY = 700;

      lifeRed -= Math.floor(Math.random() * 20);
      lifeBlue -= Math.floor(Math.random() * 20);
      contador += 1;
      console.log(contador);
    }

    //RED colide parede
    if ((playerx.posX + playerx.width) > quadrado2.posX && playerx.posX < (quadrado2.posX + quadrado2.width) && (playerx.posY + playerx.height) > quadrado2.posY && playerx.posY < (quadrado2.posY + quadrado2.height)) {
      playerx.posX = 1350;
      playerx.posY = 200;
      lifeRed -= Math.floor(Math.random() * 10);
    }
    if ((playerx.posX + playerx.width) > quadrado3.posX && playerx.posX < (quadrado3.posX + quadrado3.width) && (playerx.posY + playerx.height) > quadrado3.posY && playerx.posY < (quadrado3.posY + quadrado3.height)) {
      playerx.posX = 1350;
      playerx.posY = 200;

      lifeRed -= Math.floor(Math.random() * 10);

    }

    //Blue colide parede
    if ((playery.posX + playery.width) > quadrado2.posX && playery.posX < (quadrado2.posX + quadrado2.width) && (playery.posY + playery.height) > quadrado2.posY && playery.posY < (quadrado2.posY + quadrado2.height)) {
      playery.posX = 50;
      playery.posY = 700;
      lifeBlue -= Math.floor(Math.random() * 10);

    }
    if ((playery.posX + playery.width) > quadrado3.posX && playery.posX < (quadrado3.posX + quadrado3.width) && (playery.posY + playery.height) > quadrado3.posY && playery.posY < (quadrado3.posY + quadrado3.height)) {
      playery.posX = 50;
      playery.posY = 700;
      lifeBlue -= Math.floor(Math.random() * 10);
    }
  }

  //------------------------------------------------------


  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in players) {
      const spr = players[i];
      ctx.drawImage(quadradox, 175, 180, 550, 50)
      ctx.drawImage(quadradoy, 600, 650, 700, 50)
      ctx.drawImage(player1, playerx.posX, playerx.posY, playerx.width, playerx.height)
      ctx.drawImage(player2, playery.posX, playery.posY, playery.width, playery.height)
    }
  }

  function stop() {
    playerx.velocidade = 0;
    playery.velocidade = 0;
    ctx.drawImage(endscreen, 0, 0, 1800, 900)
    window.addEventListener('keyup', function (e) {
      const key = e.key;
      switch (key) {
        case 'Enter':
          ctx.drawImage(endscreen, 0, 0, 0, 0)
          playerx.velocidade = 5;
          playery.velocidade = 5;
          playerx.posX = 1350;
          playery.posX = 50;
          playerx.posY = 200;
          playery.posY = 700;
          lifeRed = 100;
          50, 700
          lifeBlue = 100;
          contador = 0;
          document.querySelector("#winner").textContent = "";
          break;
      }
    });
  }

  function vida() {

    if (contador == 5 && lifeRed > lifeBlue || lifeBlue<1 ) {
      document.querySelector("#winner").textContent = "Red é o Vencedor";
      // var imgred = document.createElement("img");
      // imgred.src = "./images/red.png";
      // var src = document.getElementById("imgred");
      // src.appendChild(imgred);

    }
    if( lifeBlue<1){
      lifeBlue=0;
    }
    if( lifeRed<1){
      lifeRed=0;
    }
    if (contador == 5 && lifeBlue > lifeRed || lifeRed<1) {
      document.querySelector("#winner").textContent = "Blue é o Vencedor";
    }
    if (contador == 5|| lifeBlue<1 || lifeRed<1 ) {
      stop();
    }

    document.querySelector("#redlife").textContent = lifeRed;
    document.querySelector("#bluelife").textContent = lifeBlue;
  }

  function atualizarTela() {
    window.requestAnimationFrame(atualizarTela, cnv);
    moverRed();
    moverBlue();
    exibirQuadrados();
    colisao();
    vida();
    if(check==false){
    ctx.drawImage(telastart, 0, 0, 1800, 900);
    }
    window.addEventListener('keyup', function (e) {
            const key = e.key;
            switch (key) {
              case 'Enter':
                check=true;
            }
  });
}

  atualizarTela()



}());