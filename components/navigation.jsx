"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Circle as Basketball } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
    { label: 'Training', href: '/training' },
    { label: 'News', href: '/news' },
    { label: 'About', href: '/about' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#181411]/95 backdrop-blur-lg border-b border-[#54473b]">
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Basketball className="h-8 w-8 text-[#f2800d] transform transition-transform group-hover:rotate-180 duration-700" />
            <div className="absolute inset-0 bg-[#f2800d]/20 rounded-full blur animate-ping" />
          </div>
          <span className="text-xl font-bold text-white hover:text-[#f2800d] transition-colors">
            Vikapu Elite Basketball
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#f2800d]",
                pathname === item.href 
                  ? "text-[#f2800d]" 
                  : "text-white/80"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 px-0 text-white/80 hover:text-[#f2800d] hover:bg-[#27211b]"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] p-0 bg-[#1f1915] border-l border-[#54473b]"
          >
            <div className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-white">Navigation</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white/80 hover:text-[#f2800d] hover:bg-[#27211b]"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href 
                        ? "bg-[#f2800d]/10 text-[#f2800d]" 
                        : "text-white/80 hover:bg-[#27211b] hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}