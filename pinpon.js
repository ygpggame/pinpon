let score = 0;  // 自分のスコア
let eneScore = 0;  // 敵のスコア
let kumaX = 950;  // カゴX座標
let cogumaId = 0;  // タイマーID
let kumId = 0;  // タイマーID
let basketX = 950;  // カゴX座標
let eneBasketX = 0;  // 敵カゴX座標
let eneId = 0;  // タイマーID
let kuma = document.getElementById("js-kuma");
let pinpon = document.getElementById("js-pinpon");
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

startButton.addEventListener("click", (e) => {
    game();
    startButton.classList.add("d-none");
});
function game() {
    score = 0;  // スコア
    kuma.classList.remove("d-none");
    cogumaId = setInterval(cogumaRakka, 2300);
    kuma.style.top = 640 + "px";
    kuma.style.left = kumaX + "px";
    kumId = setInterval(kumaCatch, 50);
    eneId = setInterval(enePlayer, 80);
    window.addEventListener("mousemove", (e) => {
        if (e.clientX < 25) {
            basketX = 25;
        } else if (e.clientX > 950) {
            basketX = 950;
        } else {
            basketX = e.clientX;
        }
    });
};

addEventListener("dblclick", (e) => {
    fireMovie.classList.remove("d-none");
    fireMovie.currentTime = 0;
    fireMovie.play();
    pinpon.classList.add("d-none");
    setTimeout(() => {
        fireMovie.classList.add("d-none");
    }, 8000);
    
    setTimeout(() => {
        fireImg.style.left = kuma.style.left;
        fireImg.classList.remove("d-none");
        fireImg.classList.add("smash");
        fireKuma.style.left = kuma.style.left;
        fireKuma.style.top =  kuma.style.top;
        fireKuma.classList.remove("d-none");
        fireKuma.classList.add("fadein");
        kuma.classList.add("d-none");
        back.classList.add("d-none");
        backFire.classList.remove("d-none");
        backFire.classList.add("fadein");
        eneImg.classList.add("d-none");
        eneFire.classList.remove("d-none");
        eneFire.classList.add("fadein"); 
        fireRight.classList.remove("d-none");
        fireRight.classList.add("fadein");
        fireLeft.classList.remove("d-none");
        fireLeft.classList.add("fadein");

    }, 9000);
    setTimeout(() => {
        fire.textContent = "";
        fireImg.classList.add("d-none");
        fireImg.classList.remove("smash");
    }, 10000);
});

function cogumaRakka() {
    let leftX = 100 + Math.random() * 850;
    let count = 0;
    let eneCount = Math.random() * 10;
    pinpon.style.left = leftX + "px";
    pinpon.style.top = 40 + "px";
    pinpon.classList.remove("d-none");
    pinpon.classList.add("rakka");
    setTimeout(() => {
        pinpon.classList.remove("rakka");
        pinpon.classList.add("up");
        if (Math.abs(leftX - basketX) < 100) {
            count += 1;
            if (eneCount < count) {
                score += 1;
            }
        } else {
            eneScore += 1;
            ene.textContent = eneScore + "点";
            clearInterval(cogumaId);
        }
    }, 1000);
    setTimeout(() => {
        pinpon.classList.remove("up");
        pinpon.classList.add("d-none");
        if (Math.abs(leftX - eneBasketX) < 100) {

        } else {
            score += 1;
            result.textContent = score + "点";
            clearInterval(cogumaId);
        }
    }, 2000);
    result.textContent = "得点" + score + "点";
}
function kumaCatch() {
    kuma.style.left = basketX + "px"
    kuma.style.top = 640 + "px";
}

function enePlayer() {
    eneBasketX =  pinpon.style.left.replace("px", "");
    eneImg.style.left = eneBasketX + "px";
}