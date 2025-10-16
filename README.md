# Solving the test tube puzzle

Implementation of the **water sort puzzle** solution in Node.js with input data validation.  
The project checks the correctness of the game state and attempts to find a sequence of moves that will sort all test tubes by color/liquid.

## 🚀 Features

- ✅ Input data validation with clear error messages
- ✅ Solution algorithm that finds a sequence of moves (if a solution exists)
- ✅ Written in pure JavaScript (Node.js)  
- ✅ Covered by tests using Jest

## 🛠 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/acidless/liquid-sort.git
cd liquid-sort
npm install
````

## ℹ️ Usage
1) Run the program
```bash
npm start
```
2) Enter the input data from the keyboard, for example:
```bash
[["R", "G"], ["G", "R"], []]
```
3) The program should return the following result:
```bash
Решение найдено! Кол-во ходов: 3
(0, 2) (1, 0) (1, 2)
```

## ☑️ Testing

Run the tests using Jest:

```bash
npm test
```

## 📝 License

This project is distributed under the MIT license.
