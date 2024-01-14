import React from 'react'
import * as Router from 'react-router-dom'

export const routes: Router.RouteObject[] = [
  {
    path: '/demo',
    Component: React.lazy(() => import('@/pages/demo/index'))
  },
  {
    path: '/home',
    Component: React.lazy(() => import('@/pages/home/index'))
  }
]

export const router = Router.createBrowserRouter(routes)
