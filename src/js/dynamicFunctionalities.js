// Define keys
var allKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'eAcc', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'oAcc',
'aAcc', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'iAcc', 'uAcc', 'dot', 'comma', 'apostrophe', 'colon', 'questionMark',
'exclamationPoint', 'openParenthesis', 'closeParenthesis', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
'eight', 'nine', 'whitespace', 'backspace'];

// String to be output to screen
var text = '';
// Evaluates whether an iteration is underway
var isIterating = false;
// Keeps track of number of iterations performed
var iterationsCount = 0;
// Keep track of all timeouts
var timeouts = [];
// Keeps track of current index
var currentIndex;

// Turn key background yellow, then back to white
function blinkKey(keyId, blinkMilliseconds) {
    // Turn backgroun yellow
    document.getElementById(allKeys[keyId]).style.backgroundColor = 'yellow';
    // Turn it back to white after a given number of milliseconds
    setTimeout(
        function() {
            document.getElementById(allKeys[keyId]).style.backgroundColor = 'white';
        }, blinkMilliseconds
    );
}

function blinkKeyProcedure(keyId, blinkMillisecond) {
    // If index is past first iteration, convert it to the equivalent
    // index on the first iteration
    keyId -= (allKeys.length*iterationsCount);
    // Save value of current index
    currentIndex = keyId;
    // If a full iteration has been performed, increment iterations count
    if (Number.isInteger(keyId/(allKeys.length - 1)) && (keyId/(allKeys.length - 1) !== 0)) {
        iterationsCount++;
    }
    blinkKey(keyId, blinkMillisecond)
}

// Make a key blink, then pass to next
function blinkKeyAndPass(id, blinkMillisecond) {
    // Next key should blink after previous one is done blinking
    timeouts.push(setTimeout(function() {
        blinkKeyProcedure(id, blinkMillisecond);
    }, blinkMillisecond * id));
}

// Iterate over all keys, making them blink one at a time
function iterate() {
    // Do nothing if an iteration is already underway
    if (!isIterating) {
        isIterating = true;
        for (var i=0; i<10000; i++) {
            blinkKeyAndPass(i, 1000);
        }
    }
}

// Stop iterations
function stop() {
    // Prevent current letter from being displayed by throwing
    // an error instead
    currentIndex = false;
    // Stop all timeouts
    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    // Reset iterations count
    iterationsCount = 0;
    // Remove isIterating flag
    isIterating = false;
}

// Reset textbox
function reset() {
    // If an iteration is underway, do nothing
    if (!isIterating) {
        // Prevent current letter from being displayed by throwing
        // an error instead
        currentIndex = false;
        // Reset text
        text = '';
        // Update text
        document.getElementById('text-box').value = text;
    }
}

// If click is detected, add selected letter to text string
document.addEventListener('click', (event) => {
    // Extract letter from array of keys
    const letter = document.getElementById(allKeys[currentIndex]).innerHTML;
    if (letter === 'canc' && text.length > 0) {
        // Canc was selected, delete last letter
        text = text.substring(0, text.length - 1);
    } else {
        text += letter;
    }
    // Update text
    document.getElementById('text-box').value = text;
})

// Reset textbox
document.getElementById('reset-button').onclick = reset;
// Start iterating
document.getElementById('play-triangle').onclick = iterate;
// Stop iterating
document.getElementById('stop-square').onclick = stop;
