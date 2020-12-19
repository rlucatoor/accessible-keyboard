// Define keys
const allKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'eAcc', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'oAcc',
'aAcc', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'iAcc', 'uAcc', 'dot', 'colon', 'questionMark', 'exclamationPoint',
'openParenthesis', 'closeParenthesis'];

// Keep track of index of current key
var count = 0;

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
for (var i=0; i<allKeys.length; i++) {
    blinkKeyAndPass(i, 2000, 2000);
}

// If click is detected, output index of current key
document.addEventListener('click', (event) => {
    console.log(count);
})
