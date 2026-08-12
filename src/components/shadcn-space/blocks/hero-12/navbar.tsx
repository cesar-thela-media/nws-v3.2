"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose} from "@/components/ui/sheet";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo/logo";

export type NavigationSection = {
  name: string;
  href: string;
  isActive?: boolean;
};

const Navbar = ({ navigationData }: { navigationData: NavigationSection[] }) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 40);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <header
      className={cn(
        "inset-x-0 z-50 flex items-center justify-center sticky top-0 h-20 bg-background border-b border-border",
        sticky && "shadow-md shadow-white/10",
      )}
    >
      <div className="max-w-7xl mx-auto xl:px-16 lg:px-8 px-4 py-4 w-full">
        <nav className="flex items-center justify-between">
          {/* logo */}
          <div>
            <a href="#">
              <Logo />
            </a>
          </div>
          {/* navigation */}
          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList className="gap-6">
              {navigationData.map((navItem) => (
                <NavigationMenuItem key={navItem.name}>
                  <NavigationMenuLink
                    href={navItem.href}
                     className={cn("p-0 text-base text-white font-normal hover:text-blue-500 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent", navItem.isActive && "text-blue-500")}
                  >
                    {navItem.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* cta */}
          {(() => {
            const [pos, setPos] = useState({ x: 0, y: 0 });
            const buttonRef = useRef<HTMLButtonElement>(null);
            const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
              if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }
            };
            return (
              <Button
                ref={buttonRef}
                onMouseEnter={handleMouseEnter}
                size={"lg"}
                className="relative overflow-hidden group gap-2 bg-blue-500 text-white h-auto px-5 py-2.5 rounded-lg max-lg:hidden cursor-pointer shadow-none border-none transition-all duration-300"
              >
                <span
                  className="absolute w-10 h-10 bg-white rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[20] pointer-events-none"
                  style={{ left: pos.x - 20, top: pos.y - 20 }}
                />
                <span className="relative z-10 transition-colors duration-500 pointer-events-none flex items-center gap-2 group-hover:text-blue-500">
                  <Phone size={16} className="shrink-0" /> Book a call
                </span>
              </Button>
            );
          })()}
          {/*  */}
          
          <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                  <div className="w-9 h-9 flex items-center justify-center border rounded-lg">
                    <Menu size={16} className="text-foreground cursor-pointer"/>
                    <span className="sr-only">Menu</span>
                  </div>
                </SheetTrigger>

                <SheetContent
                  showCloseButton={false}
                  side="right"
                  className="w-full sm:w-96 p-0 border-l-0 dark"
                >
                  <div className="flex items-center justify-between px-4 pt-5 pb-2">
                    <a href="#">
                      <Logo className="gap-2" />
                    </a>
                    <SheetClose>
                      <div className="w-9 h-9 flex items-center justify-center border rounded-lg cursor-pointer">
                        <X size={16} className="shrink-0 text-foreground" />
                      </div>
                    </SheetClose>
                  </div>

                  <div className="flex flex-col gap-5 px-6 pb-6 overflow-y-auto">
                    <div className="flex flex-col gap-8">
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                      <NavigationMenu
                        orientation="vertical"
                        className="items-start flex-none"
                      >
                        <NavigationMenuList className="flex flex-col items-start gap-3">
                          {navigationData.map((item) => (
                            <NavigationMenuItem key={item.name}>
                              <NavigationMenuLink
                                href={item.href}
                                className={cn(
                                  "p-0 text-xl font-medium text-foreground hover:text-blue-500 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent",
                                  item.isActive && "text-blue-500",
                                )}
                              >
                                {item.name}
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          ))}
                        </NavigationMenuList>
                      </NavigationMenu>
                    </div>

                    {(() => {
                      const [pos, setPos] = useState({ x: 0, y: 0 });
                      const buttonRef = useRef<HTMLButtonElement>(null);
                      const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
                        if (buttonRef.current) {
                          const rect = buttonRef.current.getBoundingClientRect();
                          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                        }
                      };
                      return (
                        <Button
                          ref={buttonRef}
                          onMouseEnter={handleMouseEnter}
                          size={"lg"}
                          className="relative overflow-hidden group gap-2 bg-blue-500 text-white h-auto px-5 py-2.5 rounded-lg w-full sm:w-fit cursor-pointer shadow-none border-none transition-all duration-300"
                        >
                          <span
                            className="absolute w-10 h-10 bg-white rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[20] pointer-events-none"
                            style={{ left: pos.x - 20, top: pos.y - 20 }}
                          />
                          <span className="relative z-10 transition-colors duration-500 pointer-events-none flex items-center gap-2 group-hover:text-blue-500">
                            <Phone size={16} className="shrink-0" /> Book a call
                          </span>
                        </Button>
                      );
                    })()}
                  </div>
                </SheetContent>
              </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
