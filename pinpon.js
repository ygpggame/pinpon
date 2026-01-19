let score = 0;  // 自分のスコア
let eneScore = 0;  // 敵のスコア
let kumaX = 950;  // カゴX座標
let moveId = 0;  // タイマーID
let kumId = 0;  // タイマーID
let basketX = 950;  // カゴX座標
let eneBasketX = 0;  // 敵カゴX座標
let eneId = 0;  // タイマーID
let pointId = 0;  // タイマーID
let kuma = document.getElementById("js-kuma");
let pinpon2 = document.getElementById("js-pinpon2");
const startButton = document.getElementById("js-start");
const result = document.getElementById("js-result");
let ene = document.getElementById("js-ene");
let eneImg = document.getElementById("js-ene-img");
const eneFire = document.getElementById("js-ene-fire");
const left = document.getElementById("left");
const right = document.getElementById("right");
const fireImg = document.getElementById("js-fire-img");
let fireMovie = document.getElementById("fire-movie");
let fireKuma = document.getElementById("js-kuma-fire");
const back = document.getElementById("js-back");
const backFire = document.getElementById("js-back-fire");
const fireRight = document.getElementById("js-fire-right");
const fireLeft = document.getElementById("js-fire-left");
let tp = 0;
let maxGage = 10;  // 必要なTP数
let gage = 0;
const gageFill = document.getElementById('gauge-fill');
const message = document.getElementById('js-message');

// ボールの動き（参考）
let x = back.width / 2;
let y = back.height - 30;
let dx = 1;
let dy = -5;
let bai = false;
let leftX = 0;
let yX = 0;

startButton.addEventListener("click", (e) => {
    game();
    startButton.classList.add("d-none");
});
function game() {
    score = 0;  // スコア
    kuma.classList.remove("d-none");
    pinpon2.classList.remove("d-none");
    moveId = setInterval(moveBall, 5);
    kuma.style.top = 640 + "px";
    kuma.style.left = kumaX + "px";
    kumId = setInterval(kumaCatch, 50);
    eneId = setInterval(enePlayer, 20);
    pointId = setInterval(pointPlus, 60);
};

window.addEventListener("mousemove", (e) => {
    if (e.clientX < 25) {
        basketX = 25;
    } else if (e.clientX > 950) {
        basketX = 950;
    } else {
        basketX = e.clientX;
    }
});

function kumaCatch() {
    kuma.style.left = basketX + "px"
    kuma.style.top = 640 + "px";
}

function enePlayer() {
    eneBasketX = pinpon2.style.left.replace("px", "");
    eneImg.style.left = eneBasketX + "px";
}

function updateGauge() {
    if (gage > 100) {
        gage = 100;
    }
    gageFill.style.width = gage + '%';

    if (gage >= 100) {
        gageFill.classList.add('full-gauge');
        message.style.display = 'block';
    } else {
        gageFill.classList.remove('full-gauge');
        message.style.display = 'none';
    }
}

addEventListener("dblclick", (e) => {
    if (gage < 100) {
        return;
    }
    fireSmash();
});

function fireSmash() {
    if (gage < 100) {
        return;
    }
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    fireMovie.classList.remove("d-none");
    fireMovie.currentTime = 0;
    fireMovie.play();
    pinpon2.classList.add("d-none");
    setTimeout(() => {
        fireMovie.classList.add("d-none");
    }, 8000);

    setTimeout(() => {
        fireImg.style.left = kuma.style.left;
        fireImg.classList.remove("d-none");
        fireImg.classList.add("smash");
        fireKuma.style.left = kuma.style.left;
        fireKuma.style.top = kuma.style.top;
        fadeinImg(fireKuma, kuma);
        fadeinImg(backFire, back);
        fadeinImg(eneFire, eneImg);
        fadeinImg(fireRight, eneImg);
        fadeinImg(fireLeft, eneImg);
    }, 9000);
    setTimeout(() => {
        fireImg.classList.add("d-none");
        fireImg.classList.remove("smash");
    }, 10000);
    gage = 0;
    updateGauge();
    score += 1;
    result.textContent = score + "点";
}

function fadeinImg(object, deleteObject) {
    deleteObject.classList.add("d-none");
    object.classList.remove("d-none");
    object.classList.add("fadein");
}


function drawBall() {
    pinpon2.style.left = x + "px";
    pinpon2.style.top = y + "px";
}

function moveBall() {
    let returnBall = y + dy > back.height - 30 || y + dy < 30;
    drawBall();
    bai = false;

    if ((x + dx > back.width - 250 && returnBall) || ( x + dx < 250 && returnBall)) {
        if (Math.abs(x - 300) > 100) {
            dx = -dx;
            bai=true;
        } else {
            dx = -dx;
        }
    }
    if (returnBall) {
        dy = -dy;
    }
    y += dy;

    if (bai) {
        x += 2 * dx;
    } else {
        x += dx;
    }

}

function pointPlus() {
    leftX= pinpon2.style.left.replace("px", "");
    yX = pinpon2.style.top.replace("px", "");

    if (yX > 645 && yX < 700) {
        if (Math.abs(leftX - basketX) < 100) {
            tp += 1;
            gage += 100 / maxGage;
            updateGauge();
        } else  {
            eneScore += 1;
            ene.textContent = eneScore + "点";
            clearInterval(moveId);
            clearInterval(eneId);
            clearInterval(pointId);
            startButton.classList.remove("d-none");
            alert("相手にポイントが入りました。");
        }
    } 
}