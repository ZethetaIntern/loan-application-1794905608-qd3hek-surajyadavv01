# Lendwise: Multi-Step Loan Application (Educational Demo)

A React + Vite front-end for a five-step loan application with a live EMI calculator, document upload with previews, a review screen with edit links, simulated submission and a confirmation screen.

> **Educational project.** No backend, no paid APIs, no real banking integration. Use only demo data (for example PAN `ABCDE1234F`, Aadhaar `2345 6789 0123`). Everything stays in your browser's `localStorage`. All interest rates and EMI figures are illustrative estimates, not bank offers.

## Run it

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Features

- Steps: Personal, Employment (conditional fields for Salaried vs Self Employed), Loan, Documents, Review, Success
- Validation on Next, on field blur and on submit (email, 10-digit mobile, PIN, PAN, Aadhaar, numeric income and amount, age 18–65)
- Reducing-balance EMI: `P × R × (1+R)^N / ((1+R)^N − 1)`, with monthly EMI, total interest and total repayment
- Uploads: PDF/JPG/PNG only, max 1 MB each, drag and drop, image thumbnails, PDF preview in a new tab, remove
- Auto-save to `localStorage` (data, current step, uploaded file previews). Navigating back never clears data
- Review screen with Edit links, plus "Save & return to review" after editing
- Simulated submission with loading state, demo reference ID (`LW-YYYYMMDD-XXXXXX`) and summary
- Home screen with resume / empty state, responsive header menu, Reset, Start New Application
- Accessibility: labelled fields, `aria-invalid`, error `role="alert"`, focus moves to the first error and to each step heading, visible focus rings, reduced-motion support

## Structure

```
src/
  App.jsx               state, navigation, persistence, submit
  components/           Header, Home, Stepper, Field (+Segmented), FileUpload, EmiCard
  steps/                PersonalStep, EmploymentStep, LoanStep, DocumentsStep, ReviewStep, SuccessScreen, summary
  utils/                constants, validation, emi, format, storage
  styles/global.css     design tokens + responsive styles
```

## Notes

- Uploaded files are stored as data URLs in `localStorage` (hence the 1 MB limit). If the browser quota is exceeded, text data is still saved and only file previews are dropped.
- Tweak loan limits and default rates in `src/utils/constants.js`; validation rules live in `src/utils/validation.js`.
