// Object mapping infix operators to their respective functions
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
}

// Function to evaluate infix expressions using a regex
const infixEval = (str, regex) => 
  str.replace(regex, (_match, arg1, operator, arg2) => 
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );

// Function to handle high-precedence operators (* and /) recursively
const highPrecedence = str => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
}

// Utility function to check if a number is even
const isEven = num => num % 2 === 0;

// Utility function to calculate the sum of an array of numbers
const sum = nums => nums.reduce((acc, el) => acc + el, 0);

// Utility function to calculate the average of an array of numbers
const average = nums => sum(nums) / nums.length;

// Function to calculate the median of an array of numbers
const median = nums => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
}

// Object containing various spreadsheet functions
const spreadsheetFunctions = {
  sum,
  average,
  median,
  even: nums => nums.filter(isEven),
  someeven: nums => nums.some(isEven),
  everyeven: nums => nums.every(isEven),
  firsttwo: nums => nums.slice(0, 2),
  lasttwo: nums => nums.slice(-2),
  has2: nums => nums.includes(2),
  increment: nums => nums.map(num => num + 1),
  random: ([x, y]) => Math.floor(Math.random() * y + x),
  range: nums => range(...nums),
  nodupes: nums => [...new Set(nums).values()],
  "": arg => arg // Default function for empty strings
}

// Function to apply spreadsheet functions to a given string
const applyFunction = str => {
  const noHigh = highPrecedence(str); // Handle high-precedence operators first
  const infix = /([\d.]+)([+-])([\d.]+)/; // Regex for low-precedence operators (+ and -)
  const str2 = infixEval(noHigh, infix); // Evaluate low-precedence operators
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i; // Regex for function calls
  const toNumberList = args => args.split(",").map(parseFloat); // Convert arguments to numbers
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args)); // Apply the function
  return str2.replace(functionCall, (match, fn, args) => 
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match
  );
}

// Function to generate a range of numbers
const range = (start, end) => 
  Array(end - start + 1).fill(start).map((element, index) => element + index);

// Function to generate a range of characters
const charRange = (start, end) => 
  range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

// Function to evaluate a formula in a cell
const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value; // Get cell value by ID
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi; // Regex for cell ranges
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2)); // Parse range
  const elemValue = num => character => idToText(character + num); // Get value for a cell
  const addCharacters = character1 => character2 => num => 
    charRange(character1, character2).map(elemValue(num)); // Expand character ranges
  const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => 
    rangeFromString(num1, num2).map(addCharacters(char1)(char2))
  );
  const cellRegex = /[A-J][1-9][0-9]?/gi; // Regex for individual cells
  const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase())); // Expand cells
  const functionExpanded = applyFunction(cellExpanded); // Apply functions
  return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells); // Recursively evaluate
}

// Function to initialise the spreadsheet on page load
window.onload = () => {
  const container = document.getElementById("container"); // Get container element
  const createLabel = (name) => {
    const label = document.createElement("div"); // Create a label
    label.className = "label";
    label.textContent = name;
    container.appendChild(label); // Append label to container
  }
  const letters = charRange("A", "J"); // Generate column labels (A-J)
  letters.forEach(createLabel); // Create column labels
  range(1, 99).forEach(number => { // Create rows (1-99)
    createLabel(number); // Create row labels
    letters.forEach(letter => { // Create cells for each column in the row
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number; // Set cell ID
      input.ariaLabel = letter + number; // Set ARIA label
      input.onchange = update; // Set onchange handler
      container.appendChild(input); // Append cell to container
    })
  })
}

// Function to update a cell's value when it changes
const update = event => {
  const element = event.target; // Get the changed element
  const value = element.value.replace(/\s/g, ""); // Remove whitespace
  if (!value.includes(element.id) && value.startsWith('=')) { // Check for valid formula
    element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children)); // Evaluate formula
  }
}