"use client";

import { useState } from "react";
import { useScrollAnimations } from "@/lib/animation";

export function InteractiveDemo() {
  useScrollAnimations();
  const [activeTab, setActiveTab] = useState("promotions");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-on-scroll">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Démonstration Interactive
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Découvrez comment fonctionne notre extension Chrome
            </p>
          </div>
        </div>

        <div className="mt-12 mx-auto max-w-4xl border rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 border-b p-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto bg-white rounded-full px-4 py-1 text-sm text-gray-800">
              chrome-extension://bolo
            </div>
          </div>

          <div className="bg-white p-4">
            <div className="mb-6 flex border-b">
              <button
                onClick={() => setActiveTab("promotions")}
                className={`px-4 py-2 ${
                  activeTab === "promotions"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Promotions
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 ${
                  activeTab === "settings"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Paramètres
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 ${
                  activeTab === "profile"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Profil
              </button>
            </div>

            {activeTab === "promotions" && (
              <div className="animate-on-scroll">
                <h3 className="text-lg font-bold mb-4">
                  Promotions près de chez vous
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex border rounded-lg p-3 hover:bg-gray-50 transition"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
                      <div>
                        <h4 className="font-medium">
                          Produit en promotion #{item}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Supermarché {item} • {20 + item}% de réduction
                        </p>
                        <p className="text-sm mt-1">
                          <span className="line-through">{10 + item}€</span>{" "}
                          <span className="text-green-600 font-bold">
                            {7 + item}€
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="animate-on-scroll">
                <h3 className="text-lg font-bold mb-4">Paramètres</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rayon de recherche</span>
                    <select className="border rounded p-1">
                      <option>1 km</option>
                      <option>5 km</option>
                      <option>10 km</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Thème sombre</span>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="animate-on-scroll">
                <h3 className="text-lg font-bold mb-4">Votre Profil</h3>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mr-4 flex items-center justify-center text-blue-500 font-bold text-xl">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium">Jean Dupont</h4>
                    <p className="text-sm text-gray-500">
                      jean.dupont@example.com
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Vos statistiques</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-blue-500">24</div>
                      <div className="text-xs text-gray-500">
                        Promotions sauvées
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-green-500">
                        47€
                      </div>
                      <div className="text-xs text-gray-500">Économisés</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-purple-500">5</div>
                      <div className="text-xs text-gray-500">
                        Supermarchés visités
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
