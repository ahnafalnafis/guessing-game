"use strict";

let numbers = new Set();
let selection;
let attempts;

// Elements:
let title = document.querySelector(".title");
let container = document.querySelector(".container");
// let theme = document.getElementById("theme");
// theme.onclick = () => {
//     document.body.classList.toggle("dark");
//     if ()
// };

let popup = document.createElement("span");
let statusMessage = document.createElement("span");
let attemptMessage = document.createElement("span");
let currentNumber = document.createElement("span");
let titleButton = document.createElement("button");

popup.classList.add("popup");
statusMessage.classList.add("status-message");
attemptMessage.classList.add("attempt-message");
currentNumber.classList.add("current-number");
titleButton.classList.add("title-button");

popup.appendChild(statusMessage);
popup.appendChild(titleButton);
popup.appendChild(document.createElement("br"));
popup.appendChild(currentNumber);
popup.appendChild(attemptMessage);

titleButton.onclick = () => {
    container.removeChild(popup);
};

/*
 * 1. Game modes:
 *   a. Guesser: Human
 *     Computer will select a number and Human has to find it.
 *
 *   b. Guesser: Computer (TODO)
 *     Human will select a number and Computer has to find it.
 */

// Guesser: Human
function guesserIsHuman() {
    let index = Math.floor(Math.random() * numbers.size);
    selection = Array.from(numbers.values())[index];

    // Loop through the numbers and make a block for each number.
    numbers.forEach((i) => {
        // span.block>p
        let block = document.createElement("span");
        let blockParagraph = document.createElement("p");

        blockParagraph.innerText = i;
        block.classList.add("block");
        block.id = i;

        // Inject `onclick` event in each block.
        block.onclick = () => {
            let guess = Number(block.innerText);

            // Updating messages:
            container.appendChild(popup);
            currentNumber.innerHTML = `<span class="msg-title">Guessed:</span>&nbsp;${guess}`;

            attempts += 1;
            attemptMessage.innerHTML = `<span class="msg-title">Attempts:</span>&nbsp;${attempts}`;

            // Status:
            if (guess < selection) {
                statusMessage.innerText = `Um.. Higher than ${guess} 😕`; //↑";
                for (let i = 1; i <= guess; i++) {
                    let nBlock = document.getElementById(i);
                    nBlock.classList.add("done");
                    nBlock.onclick = () => {};
                }
            } else if (guess > selection) {
                statusMessage.innerText = `Um.. Lower than ${guess} 😕`; // ↓";
                for (let i = guess; numbers.size >= i; i++) {
                    let nBlock = document.getElementById(i);
                    nBlock.classList.add("done");
                    nBlock.onclick = () => {};
                }
            } else if (guess == selection) {
                statusMessage.innerText = "You got it! 🎉";

                // Make blocks disabled at the end of the game.
                for (i of document.getElementsByClassName("block")) {
                    i.classList.add("disabled");
                    i.onclick = function () {};
                }
            }
        };

        block.appendChild(blockParagraph);
        container.appendChild(block);
    });
}

// Main:
function main(props) {
    attempts = 0;
    // Find numbers through 1 to `range`
    for (let i = 1; i <= props.range; i++) {
        numbers.add(i);
    }

    container.innerHTML = "";
    container.style.padding = "10%";

    if (props.mode == "human") {
        guesserIsHuman();
    } else if (props.mode == "computer") {
        console.log("guesserIsComputer()");
    } else {
    }
}

function emojiSwitch() {
    const fname = document.querySelector("#first-name");
    const lname = document.querySelector("#last-name");
    const range = document.querySelector("#range");
    const gender = document.querySelector("#gender");
    const mode = document.querySelector("#mode");

    let texts = mode.innerText.split("\n");
    let emoji = {
        null: "👨",
        male: "👨",
        female: "👩",
        others: "🙂",
    };

    // Set emoji according to gender.
    texts[1] = emoji[gender.value] + " Human";

    // Reorganize options
    let props = ["null", "human", "computer"];
    let opts = {};

    for (let i = 0; i < texts.length; i++) {
        opts[props[i]] = texts[i];
    }

    mode.innerHTML = "";
    for (let i in opts) {
        let opt = document.createElement("option");
        opt.setAttribute("value", i);
        opt.innerText = opts[i];
        mode.appendChild(opt);
    }
}
