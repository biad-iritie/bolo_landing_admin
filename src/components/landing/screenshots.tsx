import Image from "next/image";

export function Screenshots() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Découvrez notre extension
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Voici un aperçu de notre extension Chrome et de notre interface
              administrateur.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-lg">
              <Image
                src="/placeholder-extension.png"
                alt="Capture d'écran de l'extension BOLO"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                priority
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Extension Chrome</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Notre extension Chrome vous permet de voir les promotions
              disponibles près de chez vous.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-lg">
              <Image
                src="/placeholder-admin.png"
                alt="Capture d'écran du tableau de bord administrateur"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                priority
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">
              Tableau de bord administrateur
            </h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Les supermarchés peuvent gérer leurs produits en promotion et voir
              les commandes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
