import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Trouvez des promotions locales en temps réel
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                BOLO vous permet de découvrir les produits en promotion dans les
                supermarchés et hypermarchés près de chez vous grâce à notre
                extension Chrome.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/#install">
                <Button size="lg" className="w-full">
                  Installer l&apos;extension
                </Button>
              </Link>
              <Link href="/supermarket">
                <Button size="lg" variant="outline" className="w-full">
                  Rejoindre en tant que supermarché
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/placeholder-extension.png"
                alt="Screenshot de l'extension BOLO"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
