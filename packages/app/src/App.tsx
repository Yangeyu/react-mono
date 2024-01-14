import './App.css'
import * as Router from 'react-router-dom'
import { router } from '@/router/index'

function App() {

  return (
    <Router.RouterProvider router={router}>
    </Router.RouterProvider>
  )
}

export default App
