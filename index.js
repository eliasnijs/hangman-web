/* Er wordt gebruik gemaakt van globale variabelen ipv van de data uit html te halen
*  om de snelheid te optimaliseren.
* */
let word = "";
let usedLetters= "_";
let wrong = 0;

function reset() {
    usedLetters= "_";
    wrong = 0;
    word = "";
    initiateGame();
}

function initiateGame() {
    fetch(`./cgi-bin/firstpattern.cgi`)
        .then(antwoord => antwoord.json())
        .then(data => {
            word =  data["pattern"];
        })
        .then(setHtml)
        .then(setListeners);
}

function buttonPressed(event) {

    assert(event !== undefined, "AssertionError: invalid button")

    event.target.removeEventListener("click", buttonPressed);
    event.target.classList.value = "button-inactive";

    const p = word.toUpperCase();
    const l = usedLetters;
    const e = event.target.innerHTML;

    assert(!usedLetters.includes(e), "AssertionError: letter was already used")

    fetch(`cgi-bin/buttonpressed.cgi?pattern=${p}&letters=${l}&expansion=${e}`)
        .then(antwoord => antwoord.json())
        .then(data => {
            word = data["pattern"].toLowerCase();
            wrong += (data["wrong"])? 1 : 0;
            usedLetters += e;
            update();
            if (wrong === 9 || !/_/.test(data["pattern"].toLowerCase())) {
                console.log("true")
                end(data["word"].toLowerCase());
            }
        })
        .catch(err => {throw err});

    playAudioEffect();
}

function playAudioEffect(){
    document.getElementById("audio-button").currentTime = 0;
    document.getElementById("audio-button").play();
}

function mute() {
    let a = document.getElementById("audio-music");
    if (a.paused) {
        a.play();
    } else {
        a.pause();
    }
}

// -----
function setHtml() {
    const buttons = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    let divs = []
    for (let index = 0; index < 26; index += 1) {
        divs.push(`<button class=\"button-active\">` + buttons[index] + `</button>`);
    }
    document.getElementById("buttons-top").innerHTML = divs.slice(0, 13).join("");
    document.getElementById("buttons-bottom").innerHTML = divs.slice(13, 26).join("");
    document.getElementById("end").innerHTML = "";
    update();
}

function setListeners(){
    document.querySelectorAll(".button-active").forEach(b => b.addEventListener("click", buttonPressed));
    document.querySelectorAll(".reload").forEach(b => b.addEventListener("click", reset));
    document.querySelector("#button-audio").addEventListener("click", mute);
}

function setWord(){
    document.getElementById("word").innerHTML = word;
}

function setHang() {
    let divs = [];
    for (let i = 0; i <= wrong; i += 1) {
        divs.push(`<div class="hang hang-` + i + `"></div>`);
    }
    document.getElementById("hang").innerHTML = divs.join("");
}

function end(correctWord) {
    document.getElementById("end").innerHTML =
        `<h3>Het correcte woord was ` + correctWord + `.</h3>`;
    document.querySelectorAll(".buttons-row").forEach(o => o.innerHTML = "");
}

function update() {
    setWord();
    setHang();
}

window.onload = function() {
    reset();
};

function assert(c,m){
    if (!c) {
        throw {Error: m}
    }
}
