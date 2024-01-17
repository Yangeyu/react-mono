import './App.css'
import * as Router from 'react-router-dom'
import { ModeToggle } from '@/components/theme-provider/ModeToggle'
import {
  Link, Button, Navbar,
  NavbarBrand, NavbarContent, NavbarItem
} from '@nextui-org/react'
import { router } from '@/router/index'
import { useState } from 'react'



const Header = () => {
  const [curPath, setCurPath] = useState(location.hash)
  const isActive = (path: string) => curPath.includes(path)
  const menu = [
    { name: 'Home', path: '/home' },
    { name: 'Archive', path: '/demo' },
    { name: 'History', path: '/history' },
  ]

  const goTo = (path: string) => {
    router.navigate(path)
    setCurPath(path)
  }

  return (
    <Navbar className="bg-background/80">
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          menu.map(item => {
            return (
              <NavbarItem key={item.name} isActive={isActive(item.path)}>
                <Link
                  color={!isActive(item.path) ? 'foreground' : undefined}
                  onClick={() => goTo(item.path)}>
                  {item.name}
                </Link>
              </NavbarItem>
            )
          })
        }
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ModeToggle></ModeToggle>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

function App() {

  return (
    <div className="flex flex-col h-full">
      <Header></Header>
      <div className="flex-1">
        <Router.RouterProvider router={router}></Router.RouterProvider>
      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70
        -bottom-[40%] -left-[20%] -z-[1]">
        <img
          src="https://nextui.org/gradients/docs-left.png"
          className="relative z-10 opacity-0 shadow-black/5
          data-[loaded=true]:opacity-100 shadow-none 
          transition-transform-opacity motion-reduce:transition-none
          !duration-300 rounded-large" alt="docs left background"
          data-loaded="true" />

      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70
        -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-[1] rotate-12">
        <img
          src="https://nextui.org/gradients/docs-right.png"
          className="relative z-10 opacity-0 shadow-black/5
          data-[loaded=true]:opacity-100 shadow-none
          transition-transform-opacity motion-reduce:transition-none
          !duration-300 rounded-large" alt="docs right background"
          data-loaded="true" />

      </div>

    </div>
  )
}

export default App
