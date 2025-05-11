"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">BOLO</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          <Link
            href="/#features"
            className="transition-colors hover:text-foreground/80"
          >
            Fonctionnalités
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-foreground/80"
          >
            Comment ça marche
          </Link>
          <Link
            href="/#partners"
            className="transition-colors hover:text-foreground/80"
          >
            Partenaires
          </Link>
          <Link
            href="/#testimonials"
            className="transition-colors hover:text-foreground/80"
          >
            Témoignages
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/#partner-access">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Rejoindre en tant que supermarché
              </Button>
            </Link>
            <Link href="/#install">
              <Button>Installer l&apos;extension</Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t py-4">
          <div className="container flex flex-col space-y-3">
            <Link
              href="/#features"
              className="text-foreground/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              href="/#how-it-works"
              className="text-foreground/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              href="/#partners"
              className="text-foreground/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partenaires
            </Link>
            <Link
              href="/#testimonials"
              className="text-foreground/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Témoignages
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <Link
                href="/#partner-access"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start border-primary text-primary hover:bg-primary/10"
                >
                  Rejoindre en tant que supermarché
                </Button>
              </Link>
              <Link href="/#install" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Installer l&apos;extension</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
