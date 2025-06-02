"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Store,
  User,
  Lock,
  Bell,
  Package,
  TrendingUp,
  MapPin,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full rounded-lg bg-muted animate-pulse" />
  ),
});

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    businessName: user?.businessName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update with location
    toast.success("Profil mis à jour avec succès");
    setIsEditing(false);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error(
        "La géolocalisation n'est pas supportée par votre navigateur"
      );
      return;
    }

    setIsLocating(true);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Geolocation successful:", { latitude, longitude });

        setLocation({
          lat: latitude,
          lng: longitude,
          address: formData.address, // Keep existing address
        });

        toast.success("Position géolocalisée avec succès");
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Erreur lors de la géolocalisation";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Accès à la géolocalisation refusé. Veuillez autoriser l'accès à votre position dans les paramètres de votre navigateur.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage =
              "Information de localisation non disponible. Veuillez vérifier votre connexion GPS.";
            break;
          case error.TIMEOUT:
            errorMessage =
              "La demande de géolocalisation a expiré. Veuillez réessayer.";
            break;
        }

        toast.error(errorMessage);
        setIsLocating(false);
      },
      options
    );
  };

  const handleMapClick = (lat: number, lng: number) => {
    // Update location when map is clicked
    setLocation((prev) => ({
      ...prev!,
      lat,
      lng,
    }));
  };

  const stats = [
    {
      title: "Commandes",
      value: "0",
      icon: Package,
      description: "Commandes totales",
    },
    {
      title: "Promotions",
      value: "0",
      icon: TrendingUp,
      description: "Promotions actives",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
        <p className="text-muted-foreground">
          Gérez vos informations de compte et préférences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations du magasin</CardTitle>
                <CardDescription>
                  Les informations de votre magasin sont visibles par les
                  clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src="/avatars/01.png"
                        alt={user?.businessName}
                      />
                      <AvatarFallback className="text-lg">
                        {user?.businessName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        Changer la photo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-1">
                        JPG, GIF ou PNG. Max 2MB.
                      </p>
                    </div>
                  </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nom du magasin</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="+225 07 07 07 07 07"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Localisation du magasin</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGetCurrentLocation}
                        disabled={isLocating}
                      >
                        {isLocating ? (
                          <>
                            <Navigation className="h-4 w-4 mr-2 animate-spin" />
                            Localisation...
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 mr-2" />
                            Me localiser
                          </>
                        )}
                      </Button>
                    </div>

                    {location && (
                      <div className="space-y-2">
                        <div className="h-[300px] w-full rounded-lg overflow-hidden border">
                          <Map
                            center={[location.lat, location.lng]}
                            zoom={15}
                            onMapClick={handleMapClick}
                            markers={[
                              {
                                position: [location.lat, location.lng],
                                popup: formData.businessName,
                              },
                            ]}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Latitude: {location.lat.toFixed(6)}</p>
                          <p>Longitude: {location.lng.toFixed(6)}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Mettre l'adresse ici"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    {isEditing ? (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Annuler
                        </Button>
                        <Button type="submit">Enregistrer</Button>
                      </>
                    ) : (
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Modifier
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Statut du magasin</CardTitle>
                  <CardDescription>
                    Informations sur l&apos;état de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div
                      className={cn(
                        "p-2 rounded-full",
                        user?.storeStatus === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      )}
                    >
                      <Store className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {user?.storeStatus === "approved"
                          ? "Magasin approuvé"
                          : "En attente d&apos;approbation"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user?.storeStatus === "approved"
                          ? "Votre magasin est actif et visible"
                          : "Votre compte est en cours de vérification"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>
                    Vue d&apos;ensemble de votre activité
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.title}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <stat.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {stat.title}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {stat.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
              <CardDescription>
                Mettez à jour votre mot de passe pour sécuriser votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmer le nouveau mot de passe
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit">Mettre à jour le mot de passe</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>
                Gérez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications par email
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nouvelles commandes</Label>
                    <p className="text-sm text-muted-foreground">
                      Être notifié des nouvelles commandes
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications sur les promotions
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
