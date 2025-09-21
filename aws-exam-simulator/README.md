AWS Exam Simulator (React + TypeScript + Vite)

Quick start

- Install dependencies:
  - npm install
- Run locally:
  - npm run dev
- Build:
  - npm run build

Questions data

- File: public/questions.json
- Schema:
  - questions: array of objects
    - id: string (unique per question)
    - text: string (the question text)
    - choices: string[] (answer options)
    - correctIndices: number[] (zero-based indices of correct choices; use one element for single-answer)
    - explanation: string (optional)

Example:

{
  "questions": [
    {
      "id": "q1",
      "text": "Which AWS service is best suited for object storage of static assets?",
      "choices": ["Amazon EBS", "Amazon S3", "Amazon RDS", "Amazon EFS"],
      "correctIndices": [1],
      "explanation": "Amazon S3 is designed for object storage."
    }
  ]
}

Quiz behavior

- On Start, the app shuffles the full question list and selects up to 65 questions for the session.
- No question repeats within the same session; a new session reshuffles and can reuse questions.
- Supports single- and multi-select based on the number of correctIndices.

Deploy to Netlify

- netlify.toml is included:
  - build command: npm run build
  - publish directory: dist
  - SPA redirect /* -> /index.html
- Steps:
  - Push this repo to GitHub/GitLab/Bitbucket.
  - In Netlify, New site from Git → pick the repo.
  - Keep defaults (build: npm run build, publish: dist). Deploy.
  - If your repo is private, connect your Git provider when prompted.

Replace questions

- Replace public/questions.json with your full dataset following the schema above.
- If your data has different fields, the app tries to map common names (question/options/correctIndex/answers), but providing id/text/choices/correctIndices is recommended.

Notes

- The app ensures no question repeats within a session of up to 65 questions. New sessions reshuffle from the full dataset so questions can reappear across sessions.
