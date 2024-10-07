// Variables globales
let storedValue = null;
let operator = null;

// ---------------------------
// 1. Operaciones Unarias (Modulo y Factorial)
// ---------------------------

document.getElementById('modulo').addEventListener('click', () => {
    let input = parseFloat(document.getElementById('number-input').value);
    if (validate(input)) {
        let result = (input < 0) ? -input : input;
        displayResultAndInfo(result, 'Modulo operation result:');
        updateDynamicTitle('Modulo Operation');
    }
});

document.getElementById('factorial').addEventListener('click', () => {
    let input = parseInt(document.getElementById('number-input').value);
    if (validate(input) && input >= 0) {
        let result = factorial(input);
        displayResultAndInfo(result, 'Factorial operation result:');
        updateDynamicTitle('Factorial Operation');
    } else {
        showError('Invalid input for factorial');
    }
});

// Función auxiliar para calcular el factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// ---------------------------
// 2. Operaciones Binarias (Suma, Resta, Multiplicación, División y Botón de Igual)
// ---------------------------

document.getElementById('addition').addEventListener('click', () => {
    storeOperator('add');
});

document.getElementById('subtraction').addEventListener('click', () => {
    storeOperator('subtract');
});

document.getElementById('multiplication').addEventListener('click', () => {
    storeOperator('multiply');
});

document.getElementById('division').addEventListener('click', () => {
    storeOperator('divide');
});

document.getElementById('equal').addEventListener('click', () => {
    let currentValue = parseFloat(document.getElementById('number-input').value);
    if (validate(storedValue) && validate(currentValue)) {
        let result = performBinaryOperation(storedValue, currentValue, operator);
        displayResultAndInfo(result, 'Binary operation result:');
    } else {
        showError('Invalid binary operation');
    }
    operator = null;
    storedValue = null;
});

// Función para almacenar el operador y el valor actual
function storeOperator(op) {
    storedValue = parseFloat(document.getElementById('number-input').value);
    operator = op;
    document.getElementById('number-input').value = '';
}

// Función para realizar la operación binaria
function performBinaryOperation(stored, current, op) {
    switch (op) {
        case 'add':
            return stored + current;
        case 'subtract':
            return stored - current;
        case 'multiply':
            return stored * current;
        case 'divide':
            return (current !== 0) ? stored / current : showError('Cannot divide by zero');
        default:
            showError('Invalid operator');
            return null;
    }
}

// ---------------------------
// 3. Operaciones en Listas CSV (Sumar, Ordenar, Revertir, Eliminar el Último Valor)
// ---------------------------

document.getElementById('sum').addEventListener('click', () => {
    let values = parseCSV(document.getElementById('number-input').value);
    if (validateCSV(values)) {
        let sum = values.reduce((a, b) => a + b, 0);
        displayResultAndInfo(sum, 'Sum of CSV values:');
        updateDynamicTitle('Sum CSV Operation');
    } else {
        showError('Invalid CSV input');
    }
});

document.getElementById('sort').addEventListener('click', () => {
    let values = parseCSV(document.getElementById('number-input').value);
    if (validateCSV(values)) {
        let sortedValues = values.sort((a, b) => a - b);
        displayResultAndInfo(sortedValues.join(','), 'Sorted CSV values:');
        updateDynamicTitle('Sort CSV Operation');
    } else {
        showError('Invalid CSV input');
    }
});

document.getElementById('reverse').addEventListener('click', () => {
    let values = parseCSV(document.getElementById('number-input').value);
    if (validateCSV(values)) {
        let reversedValues = values.reverse();
        displayResultAndInfo(reversedValues.join(','), 'Reversed CSV values:');
        updateDynamicTitle('Reverse CSV Operation');
    } else {
        showError('Invalid CSV input');
    }
});

document.getElementById('removelast').addEventListener('click', () => {
    let values = parseCSV(document.getElementById('number-input').value);
    if (validateCSV(values) && values.length > 0) {
        values.pop();
        displayResultAndInfo(values.join(','), 'Removed last value from CSV:');
        updateDynamicTitle('Remove Last CSV Operation');
    } else {
        showError('Invalid CSV input or empty list');
    }
});

// Función para analizar el CSV
function parseCSV(input) {
    return input.split(',').map(Number).filter(num => !isNaN(num));
}

// ---------------------------
// 4. Manejo de Errores para Validar la Entrada del Usuario
// ---------------------------

function validate(input) {
    return !isNaN(input) && isFinite(input);
}

function validateCSV(values) {
    return Array.isArray(values) && values.every(num => validate(num));
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    setTimeout(() => {
        document.getElementById('error-message').textContent = '';
    }, 3000);
}

// Función para mostrar el resultado y la información
function displayResultAndInfo(result, message) {
    document.getElementById('number-input').value = result; // Mostrar resultado en input
    let info = document.getElementById('info');
    
    // Verificar el rango del resultado para actualizar la información
    if (typeof result === 'number') {
        if (result < 100) {
            info.textContent = `${message} Result is less than 100.`;
        } else if (result >= 100 && result <= 200) {
            info.textContent = `${message} Result is between 100 and 200.`;
        } else {
            info.textContent = `${message} Result is greater than 200.`;
        }
    } else {
        info.textContent = message; // Si no es un número, solo muestra el mensaje
    }
}

// Actualiza el título dinámico
function updateDynamicTitle(operation) {
    document.getElementById('dynamic-title').textContent = `Information about the number: ${operation}`;
}
