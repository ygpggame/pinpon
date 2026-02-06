// 得点表示要素の取得
const displayPoint = document.getElementById("js-display-point");
// 得点を表示する関数
function pointDisplay() {
    if (displayPoint !== null) {
        displayPoint.classList.remove("d-none");
    }
}
// 体験入学1 得点を表示する
// コメントについての説明をする
pointDisplay();
// 体験入学2 必殺技を表示する。 true:使用可能 false:使用不可
// 変数についての説明をする
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
// 体験入学3　キャラクター選択する。数字を変えるとキャラクターが変わる。
// 配列についての説明をする
let myCara = myCaracters[ 0 ];  // 自分のキャラクター選択
let eneCara = enemyCaracters[ 0 ];  // 敵キャラクター選択

// 自分のキャラクターの要素の取得
let kuma = document.getElementById("js-kuma");
// 必殺技の動画の要素の取得
let hissatuMovie = document.getElementById("fire-movie");
let iceKuma = document.getElementById("js-ice-kuma");
if (myCara === "panda") {
    kuma = document.getElementById("js-panda");
    hissatuMovie = document.getElementById("js-panda-movie");
    iceKuma = document.getElementById("js-ice-akira")
} else if (myCara === "akira") {
    kuma = document.getElementById("js-akira");
    hissatuMovie = document.getElementById("js-akuma-movie");
    iceKuma = document.getElementById("js-ice-panda");
}
// 敵キャラクターの要素の取得
let eneImg = document.getElementById("js-ene-img");
let hissatuEneMovie = document.getElementById("js-ice-movie");
let eneFire = document.getElementById("js-ene-fire");
if (eneCara === "kami") {
    eneImg = document.getElementById("js-god-img");
    hissatuEneMovie = document.getElementById("js-god-movie");
    eneFire = document.getElementById("js-fire-god")
} else if (eneCara === "akuma") {
    eneImg = document.getElementById("js-akuma-img");
    hissatuEneMovie = document.getElementById("js-akuma-movie");
    eneFire = document.getElementById("js-fire-akuma");
}

let score = 0;  // 自分の初期スコア
let eneScore = 0;  // 敵の初期スコア
let kumaX = 950;  // 自分のX座標
let basketX = 950;  // X座標
let eneBasketX = 0;  // 敵カゴX座標

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
let maxGage = 10; // 自分が必殺技に必要なTP数
let eneGage = 0; // 敵必殺技ゲージ
let maxEneGage = 20;  // 敵が必殺技に必要なTP数
let ballRandomMax = 3; // ボールのX軸ランダム変数最大値
let RandomTime = 1400; // ボールのX軸ランダム変数変更時間（ミリ秒）
let kumaSpeed = 50; // 自分が動く時間のインターバル (ミリ秒)
let eneSpeed = 20; // 敵が動く時間のインターバル (ミリ秒)
let eneIcePer = 2;// 敵の必殺技発動確率（0〜10の数字で設定、数字が大きいほど発動しやすい）
let winPoint = 5; // 勝利条件点数
// ボールの動き
let x = back.width / 2; // ボールのX座標の初期値
let y = back.height - 30; // ボールのY座標の初期値
// 体験入学4 ボールの速度を調整しよう
let ballSpeed = 5; // ピンポン玉の動く速さ、数字が少ないほど、ボールが速くなる
let dx = 1; // ボールのX軸の動く速さ、数字が大きいほど、ボールが速くなる
let dy = -5; // ボールのY軸の動く速さ、数字が大きいほど、ボールが速くなる
let pinponX = 0;  // ピンポン玉X座標
let yX = 0;  // ピンポン玉Y座標
let ranNum = 1; // ボールのX軸ランダム変数
let playFlag = false; // ゲームプレイ中かどうかのフラグ
// 敵がボールを返す回数関連
let eneReturn = 5; // 敵がボールを返す回数最小値
let eneReturnMax = 35; // 敵がボールを返す回数最大値
let eneCount = 0; // 敵がボールを返した回数
// メッセージ要素の取得
const message = document.getElementById('js-message');
// 自分のゲージの要素
const gageFill = document.getElementById('gauge-fill');
// 敵必殺技ゲージ要素の取得
let eneGageFill = document.getElementById('ene-gauge-fill');
// 敵必殺技ゲージ枠の要素の取得
let eneGageContainer = document.getElementById('ene-gauge-container');
// 敵必殺技炎で使うの要素の取得
const fireImg = document.getElementById("js-fire-img");
let fireKuma = document.getElementById("js-kuma-fire");
const backFire = document.getElementById("js-back-fire");
const fireRight = document.getElementById("js-fire-right");
const fireLeft = document.getElementById("js-fire-left");
// 氷の必殺技で使う要素の取得
let iceBack = document.getElementById("js-ice-back");
// 羽の必殺技で使う要素の取得
let godBack = document.getElementById("js-god-back");
// 悪魔の必殺技で使う要素の取得
let akumaBack = document.getElementById("js-akuma-trnado");
// パンダの必殺技で使う要素の取得
let doragon = document.getElementById("js-doragon");
// あきらが使う要素の取得
let netto = document.getElementById("js-netto");
// 勝利した時に表示する画像の要素取得
const winArea = document.getElementById("js-win");
// 負けた時に表示する画像の要素取得
const loseArea = document.getElementById("js-lose");
// リセットボタンの要素取得
let restartButtons = document.getElementsByClassName("js-restart");

let moveId = 0;  // タイマーID
let kumId = 0;  // タイマーID
let eneId = 0;  // タイマーID
let pointId = 0;  // タイマーID
let randId = 0;  // タイマーID
// 大きさの調整
let backHeight = 700; // 背景の高さ
let backWidth = 1000; // 背景の幅
let topY = backHeight - 80; // 自分の位置（上からどの場所で固定するか）
let pinponSize = 50; // ピンポン玉の大きさ
let myCaraHeight = 100; // 自分のキャラの高さ
let myCaraWidth = 100; // 自分のキャラの幅
let eneCaraHeght = 100; // 敵キャラの高さ
let eneCaraWidth = 100; // 敵キャラの幅

function imgSize() {
    back.style.height = backHeight + "px";
    back.style.width = backWidth + "px";
    iceBack.style.height = backHeight + "px";
    iceBack.style.width = backWidth + "px";
    backFire.style.height = backHeight + "px";
    backFire.style.width = backWidth + "px";
    pinpon.style.height = pinponSize + "px";
    pinpon.style.width = pinponSize + "px";
    fireImg.style.height = pinponSize + "px";
    fireImg.style.width = pinponSize + "px";
    kuma.style.width = myCaraWidth + "px";
    kuma.style.height = myCaraHeight + "px";
    iceKuma.style.width = myCaraWidth + "px";
    iceKuma.style.height = myCaraHeight + "px";
    eneImg.style.width = eneCaraWidth + "px";
    eneImg.style.height = eneCaraHeght + "px";
    eneFire.style.width = eneCaraWidth + "px";
    eneFire.style.height = eneCaraHeght + "px";
}

imgSize();

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

    kuma.style.top = topY + "px";
    kuma.style.left = kumaX + "px";
    kumId = setInterval(kumaCatch, kumaSpeed);
    eneId = setInterval(enePlayer, eneSpeed);
    pointId = setInterval(pointPlus, 50);
    randId = setInterval(randBall, RandomTime);
};

window.addEventListener("mousemove", (e) => {
    if (e.clientX < 25) {
        basketX = 25;
    } else if (e.clientX > (backWidth - 50)) {
        basketX = (backWidth - 50);
    } else {
        basketX = e.clientX;
    }
});

function kumaCatch() {
    kuma.style.left = basketX + "px"
    kuma.style.top = topY + "px";
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

    if (yX > (backHeight - 60) && yX < backHeight) {
        if (Math.abs(pinponX - basketX) < myCaraWidth) {
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
        if (Math.abs(pinponX - eneBasketX) > eneCaraWidth) {
            score += 1;
            result.textContent = score + "点";
            stopGame();
            alert("自分にポイントが入りました。");
            WinLose();
        } else {
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

function playMovie(eneFlag) {
    let movie = hissatuMovie;
    if (eneFlag) {
        movie = hissatuEneMovie;
    }
    if ((!eneFlag && gage < 100) || (eneFlag && eneGage < 100) || !playFlag) {
        return;
    }
    clearInterval(moveId);
    clearInterval(eneId);
    clearInterval(pointId);
    playFlag = false;
    movie.classList.remove("d-none");
    movie.currentTime = 0;
    movie.play();
    pinpon.classList.add("d-none");
    setTimeout(() => {
        movie.classList.add("d-none");
    }, 8000);

    if (eneFlag) {
        eneGage = 0;
        updateEneGauge();
    } else {
        gage = 0;
        updateGauge();
    }
}

function fadeinImg(object, deleteObject) {
    deleteObject.classList.add("d-none");
    object.classList.remove("d-none");
    object.classList.add("fadein");
}

function hissatuPoint(eneFlag) {
    if (eneFlag) {
        stopGame();
        alert("相手に得点が入りました！！");
        eneScore += 1;
        ene.textContent = eneScore + "点";
        WinLose();
    } else {
        stopGame();
        alert("自分に得点が入りました！！");
        score += 1;
        result.textContent = score + "点";
        WinLose();
    }
}

function fireSmash() {
    playMovie(false);
    setTimeout(() => {
        fireImg.style.left = kuma.style.left;
        fireKuma.style.left = kuma.style.left;
        fireKuma.style.top = kuma.style.top;
        fadeinImg(fireKuma, kuma);
        fadeinImg(backFire, back);
        fadeinImg(fireRight, eneImg);
        fadeinImg(fireLeft, eneImg);
    }, 9000);
    setTimeout(() => {
        fireImg.classList.remove("d-none");
        fireImg.classList.add("smash");
        fadeinImg(eneFire, eneImg);
    },11000);
    setTimeout(() => {
        fireImg.classList.add("d-none");
        fireImg.classList.remove("smash");
    }, 12000);
    setTimeout(() => {
        hissatuPoint(false);
    }, 13500);
}

function iceDrive() {
    playMovie(true);
    setTimeout(() => {
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
        hissatuPoint(true);
    }, 10000);
}

function godDrive() {
    playMovie(true);
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
        hissatuPoint(true);
    }, 11000);
}

function hellSpin() {
    playMovie(true);
    setTimeout(() => {
        akumaBack.style.top ="20px";
        akumaBack.style.left =  pinpon.style.left.replace("px", "");
        akumaBack.classList.remove("d-none");
        akumaBack.classList.add("trnado");
    }, 10000);
    setTimeout(() => {
        akumaBack.classList.add("d-none");
        pinpon.classList.remove("trnado");
        hissatuPoint(true);
    }, 12000);
}

function specialNetto() {
    playMovie(false);
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
        hissatuPoint(false);
    }, 11000);
}

function noboriRyu() {
    playMovie(false);
    setTimeout(() => {
        doragon.style.left = kuma.style.left;
        pinpon.style.left = (Number(kuma.style.left.replace("px", "")) + 400) + "px";
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
        hissatuPoint(false);
    }, 12000);
}