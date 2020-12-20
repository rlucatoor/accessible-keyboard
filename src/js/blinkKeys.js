// Define keys
const allKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'eAcc', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'oAcc',
'aAcc', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'iAcc', 'uAcc', 'dot', 'comma', 'colon', 'questionMark', 'exclamationPoint',
'openParenthesis', 'closeParenthesis', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'whitespace'];

// Keep track of index of current key
var count = 0;
// String to be output to screen
var text = '';
var isIterating = false;

// Turn key background yellow, then back to white, and increment count
function blinkKey(keyId, blinkMilliseconds) {
    document.getElementById(allKeys[keyId]).style.backgroundColor = 'yellow';
    setTimeout(
        function() {
            document.getElementById(allKeys[keyId]).style.backgroundColor = 'white';
        }, blinkMilliseconds
    );
    count++;
}

// Make a key blink, then pass to next
function blinkKeyAndPass(id, blinkMillisecond, nextBlinkMillisecond) {
    setTimeout(function() {
        blinkKey(id, blinkMillisecond);
    }, nextBlinkMillisecond * id);
}

// Iterate over all keys, making them blink one at a time
function iterate() {
    if (!isIterating) {
        isIterating = true;
        for (var i=0; i<allKeys.length; i++) {
            blinkKeyAndPass(i, 100, 100);
        }
    }
}

// Stop iterations
function stop() {
    isIterating = false;
}

// If click is detected, output index of current key
document.addEventListener('click', (event) => {
    const letter = document.getElementById(allKeys[count-1]).innerHTML;
    text += letter;
    document.getElementById('text-box').value = text;
})

document.getElementById('play-triangle').onclick = iterate;
document.getElementById('stop-square').onclick = stop;
