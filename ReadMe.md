# LI.FI API `/tokens` Endpoint Test Suite

## Overview
This repository contains automated tests for the LI.FI project, specifically targeting the `/tokens` API endpoint. The suite covers functional, performance, scalability, and security tests. Additionally, it generates detailed test reports using Mochawesome.

---

## Prerequisites
Ensure you have the following tools installed before running the test suite:

- **Node.js** (version 16 or later)
- **npm** (Node Package Manager)

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Tests
The test suite is organized to cover different aspects of testing. Use the commands below to run the respective tests:

### Run All Tests
To execute the complete test suite:
```bash
npm test
```

### Run Specific Test Types
- **Functional Tests:**
  ```bash
  npx mocha tests/functional/tokensTest.mjs --reporter mochawesome
  ```

- **Performance Tests:**
  ```bash
  npx mocha tests/non-functional/performanceTests.mjs --reporter mochawesome
  ```

- **Scalability Tests:**
  ```bash
  npx mocha tests/non-functional/scalabilityTests.mjs --reporter mochawesome
  ```

- **Security Tests:**
  ```bash
  npx mocha tests/non-functional/securityTests.mjs --reporter mochawesome
  ```

---

## Viewing Test Reports

   - The test suite generates detailed reports using **Mochawesome**. The Reports are saved in the `mochawesome-report` directory by default.

   - Also, after running the automated testing suite from the terminal, the link of the generated report is displayed. The generated HTML report could be opened by the browser: 
   /Users/burcu/Desktop/LI.FI/lifiAutomation/mochawesome-report/mochawesome.html

### Steps to View Reports

1. After test execution, locate the report files:
   - HTML Report: `mochawesome-report/mochawesome.html`
                  [mochawesome] Report HTML saved to /Users/burcu/Desktop/LI.FI/lifiAutomation/mochawesome-report/mochawesome.html
   - JSON Report: `mochawesome-report/mochawesome.json`
                  [mochawesome] Report JSON saved to /Users/burcu/Desktop/LI.FI/lifiAutomation/mochawesome-report/mochawesome.json

2. Open the HTML report in a browser:
   - Navigate to the `mochawesome-report` directory.
   - Open the file `mochawesome.html` with your browser:
      /Users/burcu/Desktop/LI.FI/lifiAutomation/mochawesome-report/mochawesome.html                     

---
