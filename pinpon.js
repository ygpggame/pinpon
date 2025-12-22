let score = 0;  // 自分のスコア
let eneScore = 0;  // 敵のスコア
let kumaX = 150;  // カゴX座標
let cogumaId = 0;  // タイマーID
let kumId = 0;  // タイマーID
let basketX = 150;  // カゴX座標
let kuma = document.getElementById("js-kuma");
let pinpon = document.getElementById("js-pinpon");
const startButton = document.getElementById("js-start");
const result = document.getElementById("js-result");
const ene = document.getElementById("js-ene");
const left = document.getElementById("left");
const right = document.getElementById("right");
const fire = document.getElementById("js-fire");
const fireImg = document.getElementById("js-fire-img");
startButton.addEventListener("click", (e) => {
    game();
    startButton.classList.add("d-none");
});
function game() {
    score = 0;  // スコア
    kuma.classList.remove("d-none");
    cogumaId = setInterval(cogumaRakka, 2300);
    kuma.style.top = 320 + "px";
    kuma.style.left = kumaX + "px";
    kumId = setInterval(kumaCatch, 50);
    window.addEventListener("mousemove", (e) => {
        if (e.clientX < 25) {
            basketX = 25;
        } else if (e.clientX > 525) {
            basketX = 525;
        } else {
            basketX = e.clientX;
        }
    });
};

addEventListener("dblclick", (e) => {
    fire.textContent = "ファイヤースマッシュ!!🔥🔥🔥";
    pinpon.classList.add("d-none");
    fireImg.style.left = kuma.style.left;
    fireImg.style.top = 320 + "px";
    fireImg.classList.remove("d-none");
    fireImg.classList.add("smash");
    setTimeout(() => {
        fire.textContent = "";
        pinpon.classList.remove("d-none");
        fireImg.classList.add("d-none");
        fireImg.classList.remove("up");
    }, 1000);
});

function cogumaRakka() {
    let leftX = 25 + Math.random() * 500;
    pinpon.style.left = leftX + "px";
    pinpon.style.top = 40 + "px";
    pinpon.classList.remove("d-none");
    pinpon.classList.add("rakka");
    setTimeout(() => {
        pinpon.classList.remove("rakka");
        pinpon.classList.add("up");
        if (Math.abs(leftX - basketX) < 50) {
            score += 1;
        } else {
            clearInterval(cogumaId);
            eneScore += 1;
            ene.textContent = eneScore + "点";
            startButton.classList.remove("d-none");
        }
    }, 1000);
    setTimeout(() => {
        pinpon.classList.remove("up");
        pinpon.classList.add("d-none");
    }, 2000);
    result.textContent = "得点" + score + "点";
}
function kumaCatch() {
    kuma.style.left = basketX + "px"
    kuma.style.top = 320 + "px";
}