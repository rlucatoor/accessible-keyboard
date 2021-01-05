// Define keys and divide them by rows
var allKeys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o'], ['p', 'eAcc', 'a', 's', 'd', 'f', 'g', 'h', 'j'], ['k', 'l', 'oAcc',
'aAcc', 'z', 'x', 'c', 'v', 'b'], ['n', 'm', 'iAcc', 'uAcc', 'zero', 'one', 'two', 'three', 'four'], ['five', 'six', 'seven',
'eight', 'nine', 'whitespace', 'backspace']];

// Boolean value which defines whether the start button has been clicked
var hasStarted = false;
// Boolean value which defines whether an iteration is underway
var isIterating = false;

// String to be output to screen
var text = '';

// Boolean value which defines whether following click will select
// an entire row or a single key
var isRowClick = true;

// Keep track of all timeouts defined while iterating through the rows
var rowTimeouts = [];
// Keep track of number of times the program has iterated through
// all rows
var rowIterationsCount = 0;
// Keep track of the current row index
var currentRowIndex;

// Keep track of all timeouts defined while iterating through the keys belonging
// to the current row
var keyTimeouts = [];
// Keep track of number of times the program has iterated through
// all keys belonging to the current row
var keyIterationsCount = 0;
// Keep track of the current key index
var currentKeyIndex;

// Defines possible iteration speed. Value refers to n times 1 second
const iterationSpeed = [2, 1.5, 1, 0.7];
// Refers to the index in the iterationSpeed array
var speedIndex = 0;

// Set iteration speed showed in the program
document.getElementById('speed-indicator').innerHTML = speedIndex + 1;

// Define outer iterations, which is the way the program, once started, loops
// through all rows in the keyboard, waiting for the user to select one row

// Make an entire row blink
function blinkRow(row, blinkMilliseconds) {
    // Turn all keys yellow
    for (var i=0; i<row.length; i++) {
        document.getElementById(row[i]).style.backgroundColor = 'yellow';
    }
    // Turn them back to white after a given number of milliseconds
    setTimeout(
        function() {
            for (var i=0; i<row.length; i++) {
                document.getElementById(row[i]).style.backgroundColor = 'white';
            }
        }, blinkMilliseconds
    );
}

// Check id and modify it if necessary, so to ensure loops are continuous, then
// make row identified by current id blink
function blinkRowProcedure(id, blinkMilliseconds) {
    // If index is past first iteration, convert it to the equivalent
    // index on the first iteration
    id -= (allKeys.length*rowIterationsCount);
    // Save value of current row index
    currentRowIndex = id;
    // If a full iteration has been performed, increment iterations count
    if (Number.isInteger(id/(allKeys.length - 1)) && (id/(allKeys.length - 1) !== 0)) {
        rowIterationsCount++;
    }
    blinkRow(allKeys[id], blinkMilliseconds)
}

// Perform the entire blinking procedure on one row, then pass to the following one
function blinkRowAndPass(id, blinkMilliseconds) {
    // Following row must blink after previous one is done blinking
    rowTimeouts.push(setTimeout(function() {
        blinkRowProcedure(id, blinkMilliseconds);
    }, blinkMilliseconds * id));
}

// Loop through all rows
function iterateRows() {
    // Set iterating flag to true
    isIterating = true;
    for (var i=0; i<1000; i++) {
        blinkRowAndPass(i, 1000*iterationSpeed[speedIndex]);
    }
}

// Interrupt iteration through all rows
function stopRowIteration() {
    // Set iteration flag to false
    isIterating = false;
    // Stop all row timeouts
    for (var i = 0; i < rowTimeouts.length; i++) {
        clearTimeout(rowTimeouts[i]);
    }
    // Reset row iterations count
    rowIterationsCount = 0;
}

// Define inner iterations, which is the way the program, once a row is selected,
// loops through all keys belonging to that row, waiting for the user to select one key

// Turn key background yellow, then back to white
function blinkKey(rowId, keyId, blinkMilliseconds) {
    // Turn background yellow
    document.getElementById(allKeys[rowId][keyId]).style.backgroundColor = 'yellow';
    // Turn it back to white after a given number of milliseconds
    setTimeout(
        function() {
            document.getElementById(allKeys[rowId][keyId]).style.backgroundColor = 'white';
        }, blinkMilliseconds
    );
}

// Check id and modify it if necessary, so to ensure loops are continuous, then
// make key identified by current id blink
function blinkKeyProcedure(rowId, keyId, blinkMilliseconds) {
    // If index is past first iteration, convert it to the equivalent
    // index on the first iteration
    keyId -= (allKeys[rowId].length*keyIterationsCount);
    // Save value of current key index
    currentKeyIndex = keyId;
    // If a full iteration has been performed, increment iterations count
    if (Number.isInteger(keyId/(allKeys[rowId].length - 1)) && (keyId/(allKeys[rowId].length - 1) !== 0)) {
        keyIterationsCount++;
    }
    blinkKey(rowId, keyId, blinkMilliseconds)
}

// Make a key blink, then pass to next
function blinkKeyAndPass(rowId, id, blinkMilliseconds) {
    // Next key should blink after previous one is done blinking
    keyTimeouts.push(setTimeout(function() {
        blinkKeyProcedure(rowId, id, blinkMilliseconds);
    }, blinkMilliseconds * id));
}

// Iterate over all keys belonging to current row, making them blink one at a time
function iterateKeys(rowId) {
    // Set iteraton flag to true
    isIterating = true;
    for (var i=0; i<1000; i++) {
        // Iteration speed is set at the beginning of each iteration
        // and depends on the speedIndex variable
        blinkKeyAndPass(rowId, i, 1000*iterationSpeed[speedIndex]);
    }
}

// Interrupt iteration through all keys of the current row
function stopKeyIteration() {
    // Set iterating flag to false
    isIterating = false;
    for (var i = 0; i < keyTimeouts.length; i++) {
        clearTimeout(keyTimeouts[i]);
    }
    // Reset key iterations count
    keyIterationsCount = 0;
}

// Entire procedure

// Add selected key to output text
function addLetter() {
    // Extract letter from array of keys
    const letter = document.getElementById(allKeys[currentRowIndex][currentKeyIndex]).innerHTML;
    if (letter === 'canc' && text.length > 0) {
        // Canc was selected, delete last letter
        text = text.substring(0, text.length - 1);
    } else {
        text += letter;
    }
    // Update text
    document.getElementById('text-box').value = text;
}

// Defines program behavior when a click is detected
document.addEventListener('click', (event) => {
    // If no iteration is underway or program hasn't started, do nothing
    if (hasStarted && isIterating) {
        if (isRowClick) {
            // Click is meant to selecte a row; Stop row iterations
            stopRowIteration();
            // Restart iterating through keys after half a second more than the iteration speed
            setTimeout(function() {iterateKeys(currentRowIndex)}, 1000*iterationSpeed[speedIndex]+500);
        } else {
            // Click is meant to select a key; Stop key iterations and display
            // selected key
            stopKeyIteration();
            addLetter();
            // Restart row iterations after half a second more than the iteration speed
            setTimeout(function() {iterateRows()}, 1000*iterationSpeed[speedIndex]+500);
        }
        // If the click that was just detected referred to a row, then next will
        // refer to a single key, and vice versa
        isRowClick = !isRowClick;
    }
})

// Other functionalities

function iterate() {
    // Only perform if program hasn't already started
    if (!hasStarted) {
        iterateRows();
        // Delay setting has started flag to true to prevent
        // possible synchronization problems
        setTimeout(function() {
            hasStarted = true;
        }, 100);
    }
}

// Stop iterations
function stop() {
    // Stop row and key iterations, if any
    stopRowIteration();
    stopKeyIteration();
    // Set isIterating and hasStarted flags to false
    hasStarted = false;
    isIterating = false;
    // Next click must select a row
    isRowClick = true;
}

// Reset textbox
function reset() {
    // If an iteration is underway, do nothing
    if (!hasStarted) {
        // Reset text
        text = '';
        // Update text
        document.getElementById('text-box').value = text;
    }
}

// Decrease iteration speed
function decreaseIterationSpeed() {
    // Iteration speed can only be modified when no iteration
    // is underway
    if (!hasStarted) {
        if (speedIndex > 0) {
            // Decrese spead index
            speedIndex--;
            // Update iteration speed showed in the program
            document.getElementById('speed-indicator').innerHTML = speedIndex + 1;
        }
    }
}

// Increase iteration speed
function increaseIterationSpeed() {
    // Iteration speed can only be modified when no iteration
    // is underway
    if (!hasStarted) {
        if (speedIndex < iterationSpeed.length - 1) {
            // Increase speed index
            speedIndex++;
            // Update iteration speed showed in the program
            document.getElementById('speed-indicator').innerHTML = speedIndex + 1;
        }
    }
}

// Start iterating
document.getElementById('play-triangle').onclick = iterate;
// Stop iterating
document.getElementById('stop-square').onclick = stop;
// Reset textbox
document.getElementById('reset-button').onclick = reset;
// Decrease iteration speed
document.getElementById('speed-minus').onclick = decreaseIterationSpeed;
// Increase iteration speed
document.getElementById('speed-plus').onclick = increaseIterationSpeed;
