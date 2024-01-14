import './App.css'
import * as Router from 'react-router-dom'
import { ModeToggle } from '@/components/theme-provider/ModeToggle'
import {
  Link, Button, Navbar,
  NavbarBrand, NavbarContent, NavbarItem
} from '@nextui-org/react'
import { router } from '@/router/index'

const Header = () => (
  <Navbar className="bg-background/80">
    <NavbarBrand>
      {/* <AcmeLogo /> */}
      <p className="font-bold text-inherit">ACME</p>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="#">
          Features
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Customers
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Integrations
        </Link>
      </NavbarItem>
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
        -bottom-[40%] -left-[20%] z-0">
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
        -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
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
