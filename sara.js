var taak = document.getElementById("taak");
var tijd = document.getElementById("tijd");
var taakjes = document.getElementById("taakjes");
var taakje = document.getElementsByClassName("taakje");
var titel = document.getElementById("titel");
var mopjes = [];
var geweest = [];
var seconden = 0;
var pauze_bool = true;

function voegToe() {
    console.log(taak.value, tijd.value);
    taakjes.innerHTML = localStorage.getItem("data");
    taakjes.innerHTML += `<div class="taakje"><p>${taak.value}</p><button onclick="play(this)">|></button><span>${tijd.value}</span><button onclick="wissen(this)">X</button></div>`
    localStorage.setItem("data", taakjes.innerHTML)
    localStorage.setItem("test", tijd.value);
    taak.value = ""
    tijd.value = ""
}

function wissen(sluit) {
    sluit.parentElement.remove();
    localStorage.setItem("data", taakjes.innerHTML);
}

function geefTijd(play) {
    var temp = play.parentElement.children[2].innerHTML;
    temp = temp.split(":");
    if (temp[2] === undefined) {
        return parseInt(temp[0]) * 3600 + parseInt(temp[1]) * 60;
    } return parseInt(temp[0]) * 3600 + parseInt(temp[1]) * 60 + parseInt(temp[2]);
}

function veranderTijd(getal) {
    var hours = Math.floor(getal / 3600);
    var minutes = Math.floor((getal - (hours * 3600)) / 60);
    var seconds = Math.floor((getal - (hours * 3600)) - (minutes * 60))
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + ":" + (seconds <= 9 ? "0" : "") + seconds
}

function play(play) {
    play.setAttribute("onclick", `pauze(this)`);
    play.style.backgroundColor = "green"
    play.innerText = "||"
    pauze();
    var getal = geefTijd(play.parentElement.children[2]) - 1;
    play.parentElement.children[2].innerHTML = veranderTijd(getal);
    if (getal < 601) {
        play.parentElement.children[2].style.color = "red";
    }
}

function pauze(button) {
    (pauze_bool === false ? pauze_bool = true : pauze_bool = false)
    var countdownAan = () => {
        if (pauze_bool === false) {
            countdown();
            button.innerText = "||"
            button.style.backgroundColor = "green"
        } else {
            clearInterval(zetaan)
            button.innerText = "|>"
            button.style.backgroundColor = ""
        }
    }
    var zetaan = setInterval(countdownAan, 1000);
}

function leesJSON() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        localStorage.setItem("mopjes", JSON.parse(this.responseText));
    }
    xhttp.open("GET", "sara.JSON", true);
    xhttp.send();
}

function mopjesMaker() {
    if (mopjes.length === 0) {
        leesJSON();
        mopjes = JSON.stringify(localStorage.getItem("mopjes")).split(",");
    }
    nummer_mopje = Math.floor(Math.random() * mopjes.length);
    return_mopje = mopjes[nummer_mopje];
    if (return_mopje.length < 7) {
        return_mopje = "tis nie omda ik wijs, da ge moet kijken eh"
    }
    mopjes.splice(nummer_mopje, 1);
    localStorage.setItem("mopjes", mopjes);
    return return_mopje.replaceAll("\\", "")
}

function laatsteMinuten(getal, i) {
    if (getal < 0) {
        alert(`Je taakje is afgelopen \n${mopjesMaker()}`)
        taakje[i].remove()
    }
    else if (getal < 601) {
        return taakje[i].children[2].style.color = "red";
    }
}

function countdown() {
    for (let i = 0; i < taakje.length; i++) {
        var getal = geefTijd(taakje[i].children[2]);
        if (taakje[i].children[1].onclick.toString() === 'function onclick(event) {\npauze(this)\n}') {
            getal--;
            taakje[i].children[2].innerHTML = veranderTijd(getal);
            laatsteMinuten(getal, i);
            test
        }
    }
    localStorage.setItem("data", taakjes.innerHTML);
}

function bewerk() {
    titel.innerHTML = `<input type="text" placeholder="${localStorage.getItem("Titel_TODO")}" style="height: 50px; font-size: 30px; width: 300px"><button class="pasaan" onclick="gedaan(this)"><i class="fas fa-check"></i></button>`
}

function gedaan(bewerkbutton) {
    if (localStorage.getItem("Titel_TODO") === null) {
        console.log("undefined")
        localStorage.setItem("Titel_TODO", "Sander = God");
    } else {
        if (bewerkbutton !== undefined) {
            console.log("defined")
            localStorage.setItem("Titel_TODO", bewerkbutton.parentElement.children[0].value)
        }
    }
    titel.innerHTML = `<h1>${localStorage.getItem("Titel_TODO")}</h1><button class="bewerk" onclick="bewerk()"><i class="far fa-edit"></i></button>`
}

window.addEventListener("load", () => taakjes.innerHTML = localStorage.getItem("data"), gedaan());
