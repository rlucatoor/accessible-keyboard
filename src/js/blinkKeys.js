// Define keys
var allKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'eAcc', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'oAcc',
'aAcc', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'iAcc', 'uAcc', 'dot', 'comma', 'colon', 'questionMark', 'exclamationPoint',
'openParenthesis', 'closeParenthesis', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
'whitespace', 'backspace'];

// Keep track of index of current key
var count = 0;
// String to be output to screen
var text = '';
// Evaluates whether an iteration is underway
var isIterating = false;
// Keeps track of number of iterations performed
var iterationsCount = 0;

// Turn key background yellow, then back to white
function blinkKey(keyId, blinkMilliseconds) {
    // Check whether count is past first iteration, if it is convert it to the
    // equivalent number on the first iteration
    if (keyId >= allKeys.length) {
        keyId -= (allKeys.length*iterationsCount + 1);
    }
    // Turn backgroun yellow
    document.getElementById(allKeys[keyId]).style.backgroundColor = 'yellow';
    // Turn it back to white after a given number of milliseconds
    setTimeout(
        function() {
            document.getElementById(allKeys[keyId]).style.backgroundColor = 'white';
        }, blinkMilliseconds
    );
}

// After blinking key, increment count. If one full iteration has been performed,
// increment iteration count
function blinkKeyProcedure(keyId, blinkMilliseconds) {
    blinkKey(keyId, blinkMilliseconds);
    if (Number.isInteger(count/allKeys.length) && count !== 0) {
        iterationsCount++;
    }
    count++;
}

// Make a key blink, then pass to next
function blinkKeyAndPass(id, blinkMillisecond) {
    // Next key should blink after previous one is done blinking
    setTimeout(function() {
        blinkKeyProcedure(id, blinkMillisecond);
    }, blinkMillisecond * id);
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
    isIterating = false;
}

// If click is detected, add selected letter to text string
document.addEventListener('click', (event) => {
    // If count is past first iteration, convert it to the equivalent
    // index on the first iteration
    var index = count - (allKeys.length*iterationsCount) -2;
    // Balance off bias introduced after first iteration
    if (iterationsCount === 0) {
        index += 1;
    }
    // Extract letter from array of keys
    const letter = document.getElementById(allKeys[index]).innerHTML;
    if (letter == 'canc' && text.length > 0) {
        // Canc was selected, delete last letter
        text = text.substring(0, text.length - 1);
    } else {
        text += letter;
    }
    // Update text
    document.getElementById('text-box').value = text;
})

// Start iterations
document.getElementById('play-triangle').onclick = iterate;
document.getElementById('stop-square').onclick = stop;
