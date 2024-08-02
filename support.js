const javascriptTextElement = document.getElementById('javascript-text');
const simplefedTextElement = document.getElementById('simplefed-text');
const simplefedLinkElement = document.getElementById('simplefed-link');

const fullText = '$JavaScript';
const simplefedText = '$Simplefed';
const staticText = ' by Akihiko355 since 2024.';

let jsIndex = 0;
let sfIndex = 0;
let jsForward = true;
let sfForward = true;
let delay = 0;

function animateJavaScriptText() {
    if (delay > 0) {
        delay--;
        return;
    }

    if (jsForward) {
        javascriptTextElement.textContent = fullText.substring(0, jsIndex + 1);
        jsIndex++;
        if (jsIndex === fullText.length) {
            jsForward = false;
            delay = 2; // Adjust delay length as needed
        }
    } else {
        javascriptTextElement.textContent = fullText.substring(0, jsIndex);
        jsIndex--;
        if (jsIndex === 0) {
            jsForward = true;
            delay = 2; // Adjust delay length as needed
        }
    }
}

function animateSimplefedLink() {
    if (delay > 0) {
        delay--;
        return;
    }

    if (sfForward) {
        simplefedLinkElement.textContent = simplefedText.substring(0, sfIndex + 1);
        sfIndex++;
        if (sfIndex === simplefedText.length) {
            sfForward = false;
            delay = 2; // Adjust delay length as needed
        }
    } else {
        simplefedLinkElement.textContent = simplefedText.substring(0, sfIndex);
        sfIndex--;
        if (sfIndex === 0) {
            sfForward = true;
            delay = 2; // Adjust delay length as needed
        }
    }
}

function updateText() {
    document.getElementById('animated-text').innerHTML = `Life <span id="simplefed-text">${simplefedTextElement.textContent}</span> with <span id="javascript-text">${javascriptTextElement.textContent}</span>${staticText}`;
}

function startAnimations() {
    setInterval(() => {
        animateJavaScriptText();
        animateSimplefedLink();
        updateText();
    }, 300); // Adjust timing as needed
}

startAnimations();
