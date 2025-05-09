# Functional Programming Spreadsheet

A lightweight spreadsheet application built with HTML, CSS, and vanilla JavaScript that implements functional programming concepts. Features formula evaluation, cell references, and built-in functions.

## Description

This application recreates basic spreadsheet functionality with a clean, dark-mode interface. It demonstrates the power of functional programming techniques in JavaScript by providing cell references, ranges, arithmetic operations, and various built-in functions.

## Features

- **Cell References**: Reference any cell by its ID (e.g., `A1`, `B12`)
- **Range Support**: Use cell ranges like `A1:A5` or `B2:D4` in functions
- **Formula Evaluation**: Start any formula with `=` to evaluate expressions
- **Basic Arithmetic**: Support for `+`, `-`, `*`, `/` operations with proper precedence
- **Built-in Functions**: Various utility functions like `SUM`, `AVERAGE`, `MEDIAN`, etc.
- **Dark Mode Interface**: Easy on the eyes with a modern dark theme
- **Sticky Headers**: Row and column headers remain visible while scrolling
- **Formula Guide**: Built-in documentation for available functions and syntax

## Available Functions

- **Core**: `SUM`, `AVERAGE`, `MEDIAN`
- **Logic/Filtering**: `EVEN`, `SOMEEVEN`, `EVERYEVEN`, `HAS2`, `NODUPES`
- **Manipulation/Generation**: `FIRSTTWO`, `LASTTWO`, `INCREMENT`, `RANDOM`, `RANGE`

## How to Use

1. Clone the repository:
   ```
   git clone https://github.com/QuantumDaveLdn/spreadsheet-js.git
   ```

2. Navigate to the project directory:
   ```
   cd spreadsheet-js
   ```

3. Open `index.html` in your browser:
   - Mac: `open index.html`
   - Windows: `start index.html`
   - Or simply double-click the `index.html` file

  OR

  Visit the github pages associated with this repo: https://quantumdaveldn.github.io/spreadsheet-js/

4. Using the spreadsheet:
   - Type values or text in any cell
   - Begin with `=` to create formulas (e.g., `=A1+B1`)
   - Use functions (e.g., `=SUM(A1:A5)`)
   - Reference other cells within formulas

## Project Structure

```
├── index.html     # Main HTML file with spreadsheet structure and formula guide
├── styles.css     # CSS styling for the dark theme and grid layout
├── script.js      # JavaScript for spreadsheet functionality and formula evaluation
├── README.md      # This file
└── .gitignore     # Git ignore file
```

## Technologies Used

- **HTML**: Basic structure and user interface elements
- **CSS**: Grid layout for the spreadsheet, dark theme styling, and sticky headers
- **JavaScript**: Functional programming approach to formula evaluation

## Future Improvements

- Add more built-in functions
- Support for conditional formatting
- Data import/export functionality
- Ability to create multiple sheets
- Add charting capabilities
- Local storage for saving spreadsheet state

## License

This project is licensed under the MIT License - see the LICENSE file for details.
