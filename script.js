
const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const expression = display.value;

    // Allow only calculator characters
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        display.value = "Invalid input";
        return;
    }

    try {
        // Convert percentage to division by 100
        const result = Function(
            '"use strict"; return (' +
            expression.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)") +
            ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Cannot divide by zero";
            return;
        }

        display.value = String(
            Math.round((result + Number.EPSILON) * 1e10) / 1e10
        );
    } catch {
        display.value = "Invalid expression";
    }
}
