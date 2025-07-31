// Targeting DOM elements
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.calc-button');

// Setting initial screen value
let currentInput = '0';

// Core function to update screen
function updateScreen() {
    screen.textContent = currentInput;
}

// Function to handle button press
function handleButtonClick(value) {
    switch (value) {
        case 'C':
            currentInput = '0';
            break;
        case '←':
            currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
            break;
        case '=':
            try {
                // Replacing HTML entities with valid JS operators
                currentInput = currentInput.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\+/g, '+');
                currentInput = eval(currentInput).toString();
            } catch (error) {
                currentInput = 'Error';
            }
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            if (!isNaN(currentInput.slice(-1))) { // Prevents multiple operators
                currentInput += value;
            }
            break;
        default:
            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            break;
    }
    updateScreen();
}

// Attach event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.textContent.trim();
        handleButtonClick(value);
    });
});

// Initialize the screen
updateScreen();
