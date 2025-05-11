"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrollAnimations } from "@/lib/animation";

export function Testimonials() {
  // Setup animations via custom hook
  useScrollAnimations();

  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-on-scroll">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Témoignages
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Découvrez ce que nos utilisateurs disent de notre extension.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm animate-on-scroll delay-100">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="/placeholder-avatar-1.png"
                alt="Photo de Sophie"
                loading="eager"
              />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Sophie P.</h3>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-yellow-400"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                &quot;Grâce à BOLO, j&apos;économise beaucoup d&apos;argent
                chaque semaine sur mes courses. C&apos;est un outil
                indispensable !&quot;
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm animate-on-scroll delay-200">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="/placeholder-avatar-2.png"
                alt="Photo de Thomas"
                loading="eager"
              />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Thomas M.</h3>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-yellow-400"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                &quot;L&apos;extension est très facile à utiliser et me permet
                de trouver les meilleures offres près de chez moi. Je la
                recommande !&quot;
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm animate-on-scroll delay-300">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="/placeholder-avatar-3.png"
                alt="Photo de Marie"
                loading="eager"
              />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Marie L.</h3>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-yellow-400"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                &quot;Je suis très satisfaite de cette extension ! Elle
                m&apos;aide à trouver des produits en promotion que je
                n&apos;aurais jamais découverts autrement.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
