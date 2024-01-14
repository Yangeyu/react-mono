import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <Dropdown className="min-w-[100px]">
      <DropdownTrigger>
        <Button isIconOnly color="primary" variant="flat" className="rounded-lg" >
          <Sun
            strokeWidth={1.25}
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon
            strokeWidth={1.25}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Static Actions">
        <DropdownItem onClick={() => setTheme("light")}>Light</DropdownItem>
        <DropdownItem onClick={() => setTheme("dark")}>Dark</DropdownItem>
        <DropdownItem onClick={() => setTheme("system")}>System</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

