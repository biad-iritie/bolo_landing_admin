"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScrollAnimations } from "@/lib/animation";

export function PartnerAccess() {
  useScrollAnimations();
  const [activeTab, setActiveTab] = useState<"info" | "register" | "login">(
    "info"
  );

  // Handle tab change
  const handleTabChange = (tab: "info" | "register" | "login") => {
    console.log("Changing tab to:", tab);
    setActiveTab(tab);
  };

  // Log when component renders
  useEffect(() => {
    console.log("PartnerAccess rendered, activeTab:", activeTab);
  }, [activeTab]);

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="partner-access"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-on-scroll">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Devenez partenaire BOLO
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Rejoignez notre réseau de supermarchés et bénéficiez d&apos;une
              visibilité accrue auprès de nos utilisateurs.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 min-h-[400px]">
            {activeTab === "info" && (
              <div className="h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Pourquoi rejoindre BOLO ?
                  </h3>
                  <ul className="space-y-4">
                    <motion.li variants={item} className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-2 mr-4">
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
                          className="text-primary h-5 w-5"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold">
                          Élargissez votre clientèle
                        </h4>
                        <p className="text-muted-foreground">
                          Attirez de nouveaux clients en présentant vos
                          promotions aux utilisateurs à proximité.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li variants={item} className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-2 mr-4">
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
                          className="text-primary h-5 w-5"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold">Réduisez les invendus</h4>
                        <p className="text-muted-foreground">
                          Optimisez votre gestion des stocks en mettant en avant
                          les produits proches de leur date de péremption.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li variants={item} className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-2 mr-4">
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
                          className="text-primary h-5 w-5"
                        >
                          <path d="M12 2v4"></path>
                          <path d="M12 18v4"></path>
                          <path d="M4.93 4.93l2.83 2.83"></path>
                          <path d="M16.24 16.24l2.83 2.83"></path>
                          <path d="M2 12h4"></path>
                          <path d="M18 12h4"></path>
                          <path d="M4.93 19.07l2.83-2.83"></path>
                          <path d="M16.24 7.76l2.83-2.83"></path>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold">
                          Tableau de bord analytique
                        </h4>
                        <p className="text-muted-foreground">
                          Suivez les performances de vos promotions et analysez
                          le comportement des clients en temps réel.
                        </p>
                      </div>
                    </motion.li>
                  </ul>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Button onClick={() => handleTabChange("register")}>
                    S&apos;inscrire comme partenaire
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleTabChange("login")}
                  >
                    Déjà partenaire ? Se connecter
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "register" && (
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6">
                  Inscription Partenaire
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">
                        Nom de l&apos;entreprise
                      </Label>
                      <Input
                        id="business-name"
                        placeholder="Super Marché XYZ"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-type">Type de commerce</Label>
                      <select
                        id="business-type"
                        className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                      >
                        <option value="">Sélectionnez un type</option>
                        <option value="supermarket">Supermarché</option>
                        <option value="hypermarket">Hypermarché</option>
                        <option value="grocery">Épicerie</option>
                        <option value="mall">Centre commercial</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" placeholder="123 rue du Commerce" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" placeholder="Paris" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Code postal</Label>
                      <Input id="postal-code" placeholder="75001" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@supermarche-xyz.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirmer le mot de passe
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("info")}
                      type="button"
                    >
                      Retour
                    </Button>
                    <Button type="button">Créer mon compte</Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "login" && (
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6">
                  Connexion Partenaire
                </h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Adresse e-mail</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="contact@supermarche-xyz.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <Input id="login-password" type="password" />
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-foreground"
                      >
                        Se souvenir de moi
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="text-primary hover:text-primary/80"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("info")}
                      type="button"
                    >
                      Retour
                    </Button>
                    <Button type="button">Se connecter</Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <Card className="animate-on-scroll delay-300">
            <CardHeader>
              <CardTitle>Témoignage Partenaire</CardTitle>
              <CardDescription>Supermarché Durand</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                &quot;Depuis que nous avons rejoint BOLO, nous avons constaté
                une augmentation de 30% des ventes sur nos produits en
                promotion. La plateforme est simple à utiliser et nous permet de
                toucher de nouveaux clients efficacement.&quot;
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  JD
                </div>
                <div>
                  <p className="font-medium">Jean Durand</p>
                  <p className="text-sm text-muted-foreground">Directeur</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center animate-on-scroll">
          <h3 className="text-2xl font-bold mb-4">
            Prêt à rejoindre notre réseau ?
          </h3>
          <Button onClick={() => handleTabChange("register")} size="lg">
            Devenir partenaire maintenant
          </Button>
        </div>
      </div>
    </section>
  );
}
