export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Comment ça marche
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Un processus simple en 3 étapes
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Commencez à économiser de l&apos;argent en quelques clics grâce à
              notre extension Chrome facile à utiliser.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3 md:gap-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              1
            </div>
            <h3 className="text-xl font-bold">Installer</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Installez gratuitement notre extension Chrome depuis le Chrome Web
              Store.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              2
            </div>
            <h3 className="text-xl font-bold">Parcourir</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Découvrez les promotions disponibles près de chez vous en fonction
              de votre localisation.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              3
            </div>
            <h3 className="text-xl font-bold">Commander</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Commandez directement les produits en promotion en un seul clic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
