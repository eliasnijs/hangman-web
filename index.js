function reset() {
    setHtml();
}

function setHtml() {
    document.getElementById("buttons-top").innerHTML = "";
    document.getElementById("buttons-bottom").innerHTML = "";
    document.getElementById("buttons-top").removeEventListener("click", reset);
    document.getElementById("word").classList.value = "word";
    const buttons = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    let divs = []
    for (let index = 0; index < 26; index += 1) {
        divs.push(`<button class=\"button-active\">` + buttons[index] + `</button>`);
    }
    const w = document.documentElement.clientWidth || window.innerWidth;
    if (w <= 720) {
        document.getElementById("buttons-top").innerHTML = divs.join("");
    }
    else {
        document.getElementById("buttons-top").innerHTML = divs.slice(0, 13).join("");
        document.getElementById("buttons-bottom").innerHTML = divs.slice(13, 26).join("");
    }
    addListeners();
    setFirstPattern();
    setHang(0);
}

function addListeners() {
    document.querySelectorAll(".button-active").forEach(b => b.addEventListener("click", buttonPressed));
    document.querySelectorAll(".reload").forEach(b => b.addEventListener("click", reset));
    document.querySelector("#button-audio").addEventListener("click", mute)
}

function setFirstPattern() {
    fetch(`./cgi-bin/firstpattern.cgi`)
        .then(antwoord => antwoord.json())
        .then(data => {
            document.getElementById("word").innerHTML = data["pattern"];
        });
}

function setHang(length) {
    let divs = [];
    for (let i = 0; i <= length; i += 1) {
        divs.push(`<div class="hang hang-` + i + `"></div>`);
    }
    document.getElementById("hang").innerHTML = divs.join("");
}

function buttonPressed(event) {
    event.target.removeEventListener("click", buttonPressed);
    document.getElementById("audio-button").currentTime = 0;
    document.getElementById("audio-button").play();
    const p = document.getElementById("word").innerHTML.toUpperCase();
    const e = event.target.innerHTML;
    const l = getLetters();
    fetch(`cgi-bin/buttonpressed.cgi?pattern=${p}&letters=${l}&expansion=${e}`)
        .then(antwoord => antwoord.json())
        .then(data => {
            document.getElementById("word").innerHTML = data["pattern"].toLowerCase();
            if (data["wrong"]) {
                setHang(document.querySelectorAll(".hang").length)
            }
            if (document.querySelectorAll(".hang").length === 10 || !/_/.test(data["pattern"].toLowerCase())) {
                endgame(data["word"].toLowerCase());
            }
        })
    event.target.classList.value = "button-inactive";
}

function getLetters() {
    let letters = "_"
    document.querySelectorAll(".button-inactive").forEach(
        o => letters += o.innerHTML
    )
    return letters;
}

function endgame(word) {
    const message = (document.querySelectorAll(".hang").length !== 10) ? "victory" : "defeat";
    document.getElementById("word").innerHTML = message;
    document.getElementById("word").classList.add(message)
    document.getElementById("buttons-top").innerHTML =
        `<h3 class=\"reload\">The correct word was <span class=\"endgame-word\">\"` + word +
        `\"</span>. Press me to play again!</h3>`;
    document.getElementById("buttons-top").addEventListener("click", reset);
    document.getElementById("buttons-bottom").innerHTML = "";
}

function mute() {
    let a = document.getElementById("audio-music");
    if (a.paused) {
        a.play();
    } else {
        a.pause();
    }
}

window.onload = function() {
    reset();
};