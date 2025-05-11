"use client";

import { useScrollAnimations } from "@/lib/animation";

export function Features() {
  // Setup animations via custom hook
  useScrollAnimations();

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-on-scroll">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Fonctionnalités
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Tout ce dont vous avez besoin
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Notre extension vous offre une expérience simple et efficace pour
              trouver les meilleures promotions près de chez vous.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm animate-on-scroll delay-100">
            <div className="rounded-full bg-primary p-3 text-white">
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
                <circle cx="12" cy="12" r="8" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m2 12 2 0" />
                <path d="m20 12 2 0" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Promotions géolocalisées</h3>
            <p className="text-gray-500 text-center dark:text-gray-400">
              Trouvez les promotions disponibles près de chez vous grâce à la
              géolocalisation.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm animate-on-scroll delay-200">
            <div className="rounded-full bg-primary p-3 text-white">
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
                <path d="M2 20h.01" />
                <path d="M7 20v-4" />
                <path d="M12 20v-8" />
                <path d="M17 20V8" />
                <path d="M22 4v16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Alertes instantanées</h3>
            <p className="text-gray-500 text-center dark:text-gray-400">
              Recevez des notifications en temps réel lorsque de nouvelles
              promotions sont disponibles.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm animate-on-scroll delay-300">
            <div className="rounded-full bg-primary p-3 text-white">
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
                <path d="m3 11 18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Commande en 1 clic</h3>
            <p className="text-gray-500 text-center dark:text-gray-400">
              Commandez directement les produits en promotion sans quitter votre
              navigateur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
