import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AWSExamLandingPage from './pages/Landing'
import AWSExamQuestionPage from './pages/Exam'
import AWSExamResultsPage from './pages/Results'

const router = createBrowserRouter([
  { path: '/', element: <AWSExamLandingPage /> },
  { path: '/exam', element: <AWSExamQuestionPage /> },
  { path: '/results', element: <AWSExamResultsPage /> },
])

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

