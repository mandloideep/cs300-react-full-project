import { createBrowserRouter } from 'react-router'
import { aboutLoader } from '@/loaders/about-loader'
import { RootLayout } from '@/layouts/root-layout'
import { AboutPage } from '@/pages/about-page'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage />, loader: aboutLoader },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
