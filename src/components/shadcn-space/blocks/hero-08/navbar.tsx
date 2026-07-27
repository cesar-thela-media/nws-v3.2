"use client";
import Logo from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export type NavigationSection = {
  name: string;
  href: string;
  isActive?: boolean;
};

const navigationData: NavigationSection[] = [
  {
    name: "Home",
    href: "#",
    isActive: true,
  },
  {
    name: "About us",
    href: "#",
  },
  {
    name: "Courses",
    href: "#",
  },
  {
    name: "Reviews",
    href: "#",
  },
  {
    name: "Pricing",
    href: "#",
  },
];

export type NavLinkItem = {
  name: string;
  label?: string;
  href: string;
  isActive?: boolean;
};

export interface NavLinkProps {
  item: NavLinkItem;
}

const NavLink: React.FC<NavLinkProps> = ({ item }) => {
  return (
    <li className="flex items-center group w-fit cursor-pointer">
      <div
        className={`h-0.5 bg-teal-400 transition-all duration-300 ${item.isActive ? "w-6 mr-4" : "w-0 group-hover:w-6 group-hover:mr-4"}`}
      />
      <a
        href={item.href}
        className={`text-2xl font-medium rounded-full transition-colors ${item.isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
      >
        {item.name}
      </a>
    </li>
  );
};

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <header>
      <div className="border-b border-border">
        <nav className="max-w-7xl mx-auto sm:px-16 px-4 py-4 w-full flex items-center justify-between">
          <a href="#">
            <Logo />
          </a>
          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList className="flex items-center gap-6">
              {navigationData.map((navItem) => (
                <NavigationMenuItem key={navItem.name}>
                  <NavigationMenuLink
                    href={navItem.href}
                    className={cn("p-0 text-base font-normal hover:bg-transparent hover:text-teal-400 focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent", navItem.isActive ? "text-teal-400" : "text-muted-foreground")}
                  >
                    {navItem.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button className="rounded-full h-auto px-5 py-2.5 max-lg:hidden cursor-pointer">
            Contact us
          </Button>

          <Button
            size={"lg"}
            variant={"outline"}
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="min-lg:hidden flex items-center gap-3 h-auto p-2.5 rounded-full font-normal hover:cursor-pointer border cursor-pointer"
          >
            <Menu size={16} strokeWidth={2} />
          </Button>
        </nav>

          <Sheet open={navbarOpen} onOpenChange={setNavbarOpen}>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="bg-background p-6 overflow-auto no-scrollbar border-none flex flex-col gap-12"
            >
              {/* Header / Close Button */}
              <SheetHeader>
                <SheetClose className="absolute top-4 right-4 rounded-full dark:bg-white bg-black dark:text-black text-white p-2 cursor-pointer">
                  <X size={24} />
                </SheetClose>
              </SheetHeader>

              {/* Navigation */}
              <nav>
                <ul className="flex flex-col gap-4">
                  {navigationData?.map((item, index) => (
                    <SheetClose key={index} className="w-fit">
                      <NavLink item={item} />
                    </SheetClose>
                  ))}
                </ul>
              </nav>

              {/* Contact & Socials */}
              <div className="flex flex-col gap-12 text-foreground">
                {/* Contact */}
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-normal text-muted-foreground">
                    Contact
                  </p>
                  <a
                    href="#"
                    className="text-base font-medium hover:text-teal-400"
                  >
                    hello@shadcnspace.com
                  </a>
                  <a
                    href="#"
                    className="text-base font-medium hover:text-teal-400"
                  >
                    +1-212-456-7890
                  </a>
                </div>

                {/* Socials */}
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-normal text-muted-foreground">
                    Socials
                  </p>
                  <a
                    href="#"
                    className="text-base font-medium hover:text-teal-400"
                  >
                    X / Twitter
                  </a>
                  <a
                    href="#"
                    className="text-base font-medium hover:text-teal-400"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="text-base font-medium hover:text-teal-400"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
