import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Install() {
  return (
    <section
      id="install"
      className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Prêt à économiser sur vos courses ?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
              Installez gratuitement notre extension Chrome et commencez à
              découvrir des promotions près de chez vous dès aujourd&apos;hui.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Link
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90"
              >
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
                  className="mr-2 h-5 w-5"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
                Installer l&apos;extension Chrome
              </Button>
            </Link>
            <p className="text-xs text-primary-foreground/70">
              Compatible avec Chrome, Edge, Brave et tous les navigateurs basés
              sur Chromium.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
