const displayPoint = document.getElementById("js-display-point");
function pointDisplay() {
    if (displayPoint !== null) {
        displayPoint.classList.remove("d-none");
    }
}
// 体験１ 得点を表示する
// コメントの説明をする
pointDisplay();
// 体験２ 必殺技を表示する。 true:使用可能 false:使用不可
// 変数の説明をする
let hissatuFlag = true;
// 自分のキャラクター一覧
let myCaracters = {
    0: "kuma", 
    1: "akira", 
    2: "panda",
}; 
// 敵キャラクター一覧
let enemyCaracters = {
    0: "ice", 
    1: "kami", 
    2: "akuma",
};
// 体験３　キャラクター選択する。数字を変えるとキャラクターが変わる。
// 配列の説明をする
let myCara = myCaracters[ 0 ];  // 自分のキャラクター選択
let eneCara = enemyCaracters[ 0 ];  // 敵キャラクター選択

// 自分のキャラクターの要素の取得
let kuma = document.getElementById("js-kuma");
if (myCara === "panda") {
    kuma = document.getElementById("js-panda");
} else if (myCara === "akira") {
    kuma = document.getElementById("js-akira");
}
// 敵キャラクターの要素の取得
let eneImg = document.getElementById("js-ene-img");
if (eneCara === "kami") {
    eneImg = document.getElementById("js-god-img");
} else if (eneCara === "akuma") {
    eneImg = document.getElementById("js-akuma-img");
}

let score = 0;  // 自分の初期スコア
let eneScore = 0;  // 敵の初期スコア
let kumaX = 950;  // 自分のX座標
let basketX = 950;  // X座標
let eneBasketX = 0;  // 敵カゴX座標
// ピンポン玉の動く速さ、数字が少ないほど、ボールが速くなる
let ballSpeed = 5;
let moveId = 0;  // タイマーID
let kumId = 0;  // タイマーID
let eneId = 0;  // タイマーID
let pointId = 0;  // タイマーID

// ボールの要素の取得
let pinpon = document.getElementById("js-pinpon");
// 背景要素の取得
const back = document.getElementById("js-back");
// スタートのボタン要素の取得
const startButton = document.getElementById("js-start");
// 得点表示要素の取得
const result = document.getElementById("js-result");
// 敵得点表示要素の取得
let ene = document.getElementById("js-ene");

let gage = 0;// 必殺技ゲージ
let tp = 0; // 自分のTP数
let maxGage = 10; // 自分が必殺技に必要なTP数
let eneGage = 0; // 敵必殺技ゲージ
let maxEneGage = 20;  // 敵が必殺技に必要なTP数
let ballRandomMax = 3;
let RandomTime = 1400;
// 敵の必殺技発動確率（0〜10の数字で設定、数字が大きいほど発動しやすい）
let eneIcePer = 2;
let winPoint = 5; // 勝利条件点数
// ボールの動き（参考）
let x = back.width / 2;
let y = back.height - 30;
let dx = 1;
let dy = -5;
let pinponX = 0;
let yX = 0;
let randId = 0;
let ranNum = 1;
let playFlag = false;
let eneReturn = 5;
let eneCount = 0;
let eneReturnMax = 35;
const message = document.getElementById('js-message');

let eneTp = 0;// 敵のTP数
// 自分のゲージの要素
const gageFill = document.getElementById('gauge-fill');
// 敵必殺技ゲージ要素の取得
let eneGageFill = document.getElementById('ene-gauge-fill');
// 敵必殺技ゲージ枠の要素の取得
let eneGageContainer = document.getElementById('ene-gauge-container');
// 敵必殺技炎で使うの要素の取得
let fireMovie = document.getElementById("fire-movie");
const eneFire = document.getElementById("js-ene-fire");
const fireImg = document.getElementById("js-fire-img");
let fireKuma = document.getElementById("js-kuma-fire");
const backFire = document.getElementById("js-back-fire");
const fireRight = document.getElementById("js-fire-right");
const fireLeft = document.getElementById("js-fire-left");
// 氷の必殺技で使う要素の取得
let iceMovie = document.getElementById("js-ice-movie"); 
let iceBack = document.getElementById("js-ice-back");
let iceKuma = document.getElementById("js-ice-kuma");
// 羽の必殺技で使う要素の取得
let godMovie = document.getElementById("js-god-movie");
let godBack = document.getElementById("js-god-back");
// 悪魔の必殺技で使う要素の取得
let akumaMovie = document.getElementById("js-akuma-movie");
let akumaBack = document.getElementById("js-akuma-trnado");
// パンダの必殺技で使う要素の取得
let pandaMovie = document.getElementById("js-panda-movie");
let doragon = document.getElementById("js-doragon");
// あきらが使う要素の取得
let akiraMovie = document.getElementById("js-akira-movie");
let netto = document.getElementById("js-netto");

const winArea = document.getElementById("js-win");
const loseArea = document.getElementById("js-lose");
let restartButtons = document.getElementsByClassName("js-restart");

startButton.addEventListener("click", (e) => {
    resetImg();
    game();
    startButton.classList.add("d-none");
});
function game() {
    playFlag = true;
    eneReturn = Math.floor(Math.random() * (eneReturnMax - eneReturn)) + eneReturn;
    kuma.classList.remove("d-none");
    pinpon.classList.remove("d-none");
    moveId = setInterval(moveBall, ballSpeed);

    kuma.style.top = 620 + "px";
    kuma.style.left = kumaX + "px";
    kumId = setInterval(kumaCatch, 50);
    eneId = setInterval(enePlayer, 20);
    pointId = setInterval(pointPlus, 60);
    randId = setInterval(randBall, RandomTime);
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
    kuma.style.top = 620 + "px";
}

function enePlayer() {
    eneBasketX = pinpon.style.left.replace("px", "");
    eneImg.style.left = eneBasketX + "px";
}

function updateGauge() {
    if (!hissatuFlag) {
        return;
    }
    if (gage > 100) {
        gage = 100;
    }
    gageFill.style.width = gage + '%';

    if (gage >= 100) {
        gageFill.classList.add('full-gauge');
        message.classList.remove("d-none");
    } else {
        gageFill.classList.remove('full-gauge');
        message.classList.add("d-none");
    }
}

function updateEneGauge() {
    if (!hissatuFlag) {
        return;
    }
    if (eneGage > 100) {
        eneGage = 100;
    }
    eneGageFill.style.width = eneGage + '%';

    if (eneGage >= 100 && gage >= 100) {
        message.innerHTML = "相手と自分の必殺技ゲージがMAXになりました！<br>ダブルクリックで必殺技！！";
    } else if (eneGage >= 100) {
        eneGageFill.classList.add('full-gauge');
        message.textContent = "相手の必殺技ゲージがMAXになりました！";
        message.classList.remove("d-none");
    } else {
        eneGageFill.classList.remove('full-gauge');
    }
    if (eneGage >= 100) {
        let eneRan = Math.floor(Math.random() * 10);
        if (eneRan >= (10 - eneIcePer) && hissatuFlag) {
            if (eneCara === "ice") {
                iceDrive();
            } else if (eneCara === "kami") {
                godDrive();
            } else if (eneCara === "akuma") {
                hellSpin();
            }
        }
    }
}

addEventListener("dblclick", (e) => {
    if ((gage < 100 || !playFlag) && hissatuFlag) {
        return;
    }
    if (myCara === "kuma") {
        fireSmash();
    } else if (myCara === "akira") {
        specialNetto();
    } else if (myCara === "panda") {
        noboriRyu();
    }
});

function fireSmash() {
    if (gage < 100 || !playFlag) {
        return;
    }
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    playFlag=false;
    fireMovie.classList.remove("d-none");
    fireMovie.currentTime = 0;
    fireMovie.play();
    pinpon.classList.add("d-none");
    setTimeout(() => {
        fireMovie.classList.add("d-none");
    }, 8000);

    setTimeout(() => {
        fireImg.style.left = kuma.style.left;
        fireKuma.style.left = kuma.style.left;
        fireKuma.style.top = kuma.style.top;
        fadeinImg(fireKuma, kuma);
        fadeinImg(backFire, back);
        fadeinImg(eneFire, eneImg);
        fadeinImg(fireRight, eneImg);
        fadeinImg(fireLeft, eneImg);
    }, 9000);
    setTimeout(() => {
        fireImg.classList.remove("d-none");
        fireImg.classList.add("smash");
    },11000)
    setTimeout(() => {
        fireImg.classList.add("d-none");
        fireImg.classList.remove("smash");
    }, 12000);
    setTimeout(() => {
        stopGame();
        alert("自分に得点が入りました！！");
        WinLose();
    }, 13500);
    gage = 0;
    updateGauge();
    score += 1;
    result.textContent = score + "点";
}

function iceDrive() {
    if (gage < 100 || !playFlag) {
        return;
    }
    playFlag=false;
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    iceMovie.classList.remove("d-none");
    iceMovie.currentTime = 0;
    iceMovie.play();
    pinpon.classList.add("d-none");
    message.classList.add("d-none");
    eneGage = 0;
    updateEneGauge();
    setTimeout(() => {
        iceMovie.classList.add("d-none");
        iceKuma.style.left = kuma.style.left;
        iceKuma.style.top = kuma.style.top;
        fadeinImg(iceKuma, kuma);
        fadeinImg(iceBack, back);
    }, 8000);
    setTimeout(() => {
        pinpon.style.top = "40px";
        pinpon.classList.remove("d-none");
        pinpon.classList.add("rakka");
    }, 9000);
    setTimeout(() => {
        pinpon.classList.add("d-none");
        pinpon.classList.remove("rakka");
        alert("相手に得点が入りました！！");
        eneScore += 1;
        ene.textContent = eneScore + "点";
        stopGame();
    }, 10000);
}

function fadeinImg(object, deleteObject) {
    deleteObject.classList.add("d-none");
    object.classList.remove("d-none");
    object.classList.add("fadein");
}


function drawBall() {
    pinpon.style.left = x + "px";
    pinpon.style.top = y + "px";
}

function moveBall() {
    let returnBall = y + dy > back.height - 20 || y + dy < 20;
    drawBall();

    if ((x + dx > back.width - 250 && returnBall) || ( x + dx < 250 && returnBall)) {
        dx = -dx;
    }
    if (returnBall) {
        dy = -dy;
        eneCount += 1;
        if (eneCount >= eneReturn) {
            clearInterval(eneId);
        }
    }
    y += dy;
    x += ranNum * dx;
}

function pointPlus() {
    pinponX = pinpon.style.left.replace("px", "");
    yX = pinpon.style.top.replace("px", "");

    if (yX > 640 && yX < 700) {
        if (Math.abs(pinponX - basketX) < 100) {
            tp += 1;
            gage += 100 / maxGage;
            updateGauge();
        } else  {
            eneScore += 1;
            ene.textContent = eneScore + "点";
            stopGame();
            alert("相手にポイントが入りました。");
            WinLose();
        }
    } else if (yX < 70) {
        if (Math.abs(pinponX - eneBasketX) > 100) {
            score += 1;
            result.textContent = score + "点";
            stopGame();
            alert("自分にポイントが入りました。");
            WinLose();
        } else {
            eneTp += 1;
            eneGage += 100 / maxEneGage;
            updateEneGauge();
        }
    }
}

function randBall() {
   ranNum = Math.floor(Math.random() * ballRandomMax);
}

function stopGame() {
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    clearInterval(randId);
    startButton.textContent = "再開する";
    startButton.classList.remove("d-none");
    godBack.classList.add("d-none");
    playFlag = false;
    message.classList.add("d-none");
    x = back.width / 2;
    y = back.height - 30;
    dx = 1;
    dy = -5;
    pinponX = 0;
    yX = 0;
    randId = 0;
    ranNum = 1;
    pinpon.classList.add("d-none");
    eneReturn = 5;
    eneCount=0;
}

restartButtons = Array.from(restartButtons);
restartButtons.forEach((button) => {
    button.addEventListener("click", () => {        
        location.reload();
    });
});

function WinLose() {
    if (score >= winPoint) {
        winArea.classList.remove("d-none");
        startButton.classList.add("d-none");
    } else if (eneScore >= winPoint) {
        loseArea.classList.remove("d-none");
        startButton.classList.add("d-none");
    }
}

function resetImg() {
    iceKuma.classList.add("d-none");
    iceBack.classList.add("d-none");
    fireKuma.classList.add("d-none");
    backFire.classList.add("d-none");
    eneFire.classList.add("d-none");
    fireRight.classList.add("d-none");
    fireLeft.classList.add("d-none");
    kuma.classList.remove("d-none");
    back.classList.remove("d-none");
    eneImg.classList.remove("d-none");
    netto.classList.add("d-none");
    pinpon.classList.add("d-none");
    x = back.width / 2;
    y = back.height - 30;
}

function godDrive() {
    if (eneGage < 100 || !playFlag) {
        return;
    }
    playFlag=false;
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    godMovie.classList.remove("d-none");
    godMovie.currentTime = 0;
    godMovie.play();
    pinpon.classList.add("d-none");
    message.classList.add("d-none");
    eneGage = 0;
    updateEneGauge();
    setTimeout(() => {
        godMovie.classList.add("d-none");
    }, 8000);
    setTimeout(() => {
        godBack.classList.remove("d-none");
    }, 9000);
    setTimeout(() => {
        pinpon.style.top = "40px";
        pinpon.classList.remove("d-none");
        pinpon.classList.add("big-ball")
        pinpon.classList.add("rakka");
    }, 10000);
    setTimeout(() => {
        pinpon.classList.add("d-none");
        pinpon.classList.remove("rakka");
        pinpon.classList.remove("big-ball");
        
        alert("相手に得点が入りました！！");
        eneScore += 1;
        ene.textContent = eneScore + "点";
        stopGame();
        WinLose();
    }, 11000);
}

function hellSpin() {
    if (eneGage < 100 || !playFlag) {
        return;
    }
    playFlag=false;
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    akumaMovie.classList.remove("d-none");
    akumaMovie.currentTime = 0;
    akumaMovie.play();
    pinpon.classList.add("d-none");
    message.classList.add("d-none");
    eneGage = 0;
    updateEneGauge();
    setTimeout(() => {
        akumaMovie.classList.add("d-none");
    }, 8000);
    setTimeout(() => {
        akumaBack.style.top ="20px";
        akumaBack.style.left =  pinpon.style.left.replace("px", "");
        akumaBack.classList.remove("d-none");
        akumaBack.classList.add("trnado");
    }, 10000);
    setTimeout(() => {
        akumaBack.classList.add("d-none");
        pinpon.classList.remove("trnado");
        
        alert("相手に得点が入りました！！");
        eneScore += 1;
        ene.textContent = eneScore + "点";
        stopGame();
        WinLose();
    }, 12000);
}

function specialNetto() {
    if (gage < 100 || !playFlag) {
        return;
    }
    playFlag=false;
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    akiraMovie.classList.remove("d-none");
    akiraMovie.currentTime = 0;
    akiraMovie.play();
    pinpon.classList.add("d-none");
    setTimeout(() => {
        akiraMovie.classList.add("d-none");
    }, 8000);
    setTimeout(() => {
        netto.classList.remove("d-none");
        fadeinImg(netto, backFire);
    }, 9000);
    setTimeout(() => {
        pinpon.style.top = "40px";
        pinpon.classList.remove("d-none");
        pinpon.classList.add("rakka-half");;
    }, 10000);
    setTimeout(() => {
        pinpon.classList.remove("rakka-half");
        stopGame();
        alert("自分に得点が入りました！！");
        WinLose();
    }, 11000);
    gage = 0;
    updateGauge();
    score += 1;
    result.textContent = score + "点";
}

function noboriRyu() {
    if (gage < 100 || !playFlag) {
        return;
    }
    playFlag=false;
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    pandaMovie.classList.remove("d-none");
    pandaMovie.currentTime = 0;
    pandaMovie.play();
    pinpon.classList.add("d-none");
    setTimeout(() => {
        pandaMovie.classList.add("d-none");
    }, 8000);
    setTimeout(() => {
        doragon.style.left = kuma.style.left;
        pinpon.style.left = (Number(kuma.style.left.replace("px", "")) +400) + "px";
        doragon.style.top = "1000px";
        pinpon.style.top ="1000px";
        pinpon.classList.remove("d-none");
        pinpon.classList.add("doragon");
        doragon.classList.remove("d-none");
        doragon.classList.add("doragon");
    }, 9000);
    setTimeout(() => {
        doragon.classList.remove("doragon");
        doragon.classList.add("d-none");
        pinpon.classList.remove("doragon");
        stopGame();
        alert("自分に得点が入りました！！");
        WinLose();
    }, 12000);
    gage = 0;
    updateGauge();
    score += 1;
    result.textContent = score + "点";
}