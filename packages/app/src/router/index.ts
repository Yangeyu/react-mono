import React from 'react'
import * as Router from 'react-router-dom'

export const routes: Router.RouteObject[] = [
  {
    path: '/',
    loader: () => Router.redirect('/home')
  },
  {
    path: '/demo',
    Component: React.lazy(() => import('@/pages/demo/index'))
  },
  {
    path: '/home',
    Component: React.lazy(() => import('@/pages/home/index'))
  },
  {
    path: '/history',
    Component: React.lazy(() => import('@/pages/history/index'))
  }

]

export const router = Router.createHashRouter(routes)
