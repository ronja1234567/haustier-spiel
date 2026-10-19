const hunger = document.getElementById("hunger");
const glueck = document.getElementById("glueck");
const energie = document.getElementById("energie");

const tierAnzeige = document.getElementById("tierAnzeige");
const statusMeldung = document.getElementById("statusMeldung");

const btfuettern = document.getElementById("btfuettern");
const btspielen = document.getElementById("btspielen");
const btschlafen = document.getElementById("btschlafen");

let hungerWert = 50;
let glueckWert = 50;
let energieWert = 50;
let schlaeft = false;
let schlafTimer;

function anzeigen() {
    hunger.textContent = hungerWert;
    glueck.textContent = glueckWert;
    energie.textContent = energieWert;
}

function meldung(text) {
    statusMeldung.textContent = text;
}

function bewegung(emoji, text, animation = "bewegen") {
    clearTimeout(schlafTimer);
    schlaeft = false;

    tierAnzeige.className = "";
    tierAnzeige.textContent = emoji;
    meldung(text);

    // Animation neu starten
    void tierAnzeige.offsetWidth;
    tierAnzeige.classList.add(animation);
}

function fuettern() {
    if (schlaeft) {
        meldung("Pssst! Tala schläft gerade.");
        return;
    }

    if (hungerWert === 0) {
        meldung("Tala ist schon satt! 😸");
        return;
    }

    hungerWert = Math.max(0, hungerWert - 10);
    glueckWert = Math.min(100, glueckWert + 5);

    bewegung("🐈‍⬛ 🍗", "Mampf, mampf! Tala frisst ihr Futter.");
    anzeigen();
}

function spielen() {
    if (schlaeft) {
        meldung("Tala schläft. Lass sie sich ausruhen! 💤");
        return;
    }

    if (energieWert === 0) {
        meldung("Tala ist zu müde zum Spielen! 🥱");
        return;
    }

    if (hungerWert === 100) {
        meldung("Tala hat zu großen Hunger zum Spielen! 🍗");
        return;
    }

    glueckWert = Math.min(100, glueckWert + 10);
    energieWert = Math.max(0, energieWert - 10);
    hungerWert = Math.min(100, hungerWert + 10);

    bewegung("🐈‍⬛ 🧶", "Tala spielt begeistert mit ihrem Wollknäuel!");
    anzeigen();
}

function schlafen() {
    if (schlaeft) {
        clearTimeout(schlafTimer);
        schlaeft = false;
        tierAnzeige.className = "";
        tierAnzeige.textContent = "🐈‍⬛";
        meldung("Tala ist wieder wach! Guten Morgen! 😸");
        return;
    }

    if (energieWert === 100) {
        meldung("Tala ist schon ausgeschlafen! 😸");
        return;
    }

    schlaeft = true;
    tierAnzeige.className = "schlafen";
    tierAnzeige.textContent = "😴";
    meldung("Tala schläft ... Kuschle dich ein! 💤");

    schlafTimer = setTimeout(() => {
        energieWert = Math.min(100, energieWert + 30);
        schlaeft = false;
        tierAnzeige.className = "";
        tierAnzeige.textContent = "🐈‍⬛";
        meldung("Tala ist aufgewacht und hat neue Energie! ✨");
        anzeigen();
    }, 10000);

    anzeigen();
}

btfuettern.addEventListener("click", fuettern);
btspielen.addEventListener("click", spielen);
btschlafen.addEventListener("click", schlafen);

// Die Werte verändern sich mit der Zeit
setInterval(() => {
    if (!schlaeft) {
        hungerWert = Math.min(100, hungerWert + 5);
        anzeigen();
    }
}, 5000);

setInterval(() => {
    if (!schlaeft) {
        glueckWert = Math.max(0, glueckWert - 5);
        energieWert = Math.max(0, energieWert - 5);
        anzeigen();
    }
}, 10000);

anzeigen();

