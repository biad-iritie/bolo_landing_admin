"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Erreur d&apos;authentification
          </h2>
          <p className="text-muted-foreground mb-8">
            {error === "CredentialsSignin"
              ? "Email ou mot de passe incorrect"
              : "Une erreur est survenue lors de la connexion"}
          </p>
          <Button asChild>
            <Link href="/#partner-access">Retour à la connexion</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
