import React, { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  logo?: string;
  services?: Array<{ title: string; description: string }>;
}

const Navigation = ({
  logo = "Modern Dental",
  services = [
    {
      title: "General Dentistry",
      description: "Comprehensive dental care for the whole family",
    },
    {
      title: "Cosmetic Dentistry",
      description: "Transform your smile with our aesthetic treatments",
    },
    {
      title: "Orthodontics",
      description: "Straighten your teeth with modern orthodontic solutions",
    },
  ],
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {logo}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => scrollToSection("services")}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 bg-white rounded-lg shadow-lg">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <h3 className="text-sm font-medium text-gray-900">
                            {service.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About Link */}
                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    About
                  </button>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Testimonials
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Call to Action */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </Button>
              <Button
                onClick={() => scrollToSection("appointment")}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity"
              >
                Book Appointment
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "lg:hidden fixed inset-x-0 top-20 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out",
              isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
            )}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Testimonials
              </button>
              <Button
                onClick={() => scrollToSection("appointment")}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity w-full"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
