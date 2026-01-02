# HRMS — Human Resource Management System

A front-end prototype of a Human Resource Management System (HRMS) built with plain HTML, CSS, and JavaScript. This repository provides a responsive UI, client-side demos for common HR tasks (employee directory, basic CRUD UI, search/filter, and dashboard widgets), and is intended as a starting point for a full-stack HRMS or a frontend design prototype.

Features
- Responsive dashboard and employee directory
- Client-side Add / Edit / Delete employee UI (in-memory or localStorage)
- Search and filtering for employees
- Summary widgets (headcount, departments, quick stats)
- Clean, modular CSS and minimal vanilla JavaScript for easy extension

Getting started

Prerequisites
- Modern web browser
- Optional: Node.js if you want to run a local static server via npm packages

Clone and open locally
1. Clone the repo:
   git clone https://github.com/saw-zer0/HRMS.git
2. Open the project:
   - Option A (quick): Open index.html in your browser.
   - Option B (recommended for static-server behavior):
     - Python 3: python -m http.server 8000
     - Node (http-server): npx http-server -p 8000
     - Then open http://localhost:8000 in your browser.

Project structure (common layout)
- index.html — main entry page / dashboard
- css/ or styles/ — stylesheets and variables
- js/ or scripts/ — JavaScript modules and helpers
- assets/ — images, icons, and screenshots
- data/ — sample JSON data (if included)


