import Image from "next/image";

export function Partners() {
  return (
    <section id="partners" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Nos partenaires
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Découvrez les supermarchés qui travaillent avec nous pour vous
              offrir les meilleures promotions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <div className="flex items-center justify-center p-4">
            <div className="relative h-16 w-full">
              <Image
                src="/placeholder-partner-1.png"
                alt="Logo du partenaire 1"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="relative h-16 w-full">
              <Image
                src="/placeholder-partner-2.png"
                alt="Logo du partenaire 2"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="relative h-16 w-full">
              <Image
                src="/placeholder-partner-3.png"
                alt="Logo du partenaire 3"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="relative h-16 w-full">
              <Image
                src="/placeholder-partner-4.png"
                alt="Logo du partenaire 4"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
