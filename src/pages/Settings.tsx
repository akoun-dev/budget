import React from "react";
import { User, Palette, Bell, Download, Trash2, Shield, CreditCard } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBudget } from "@/contexts/BudgetContext";

const Settings: React.FC = () => {
  const { currency, setCurrency } = useBudget();

  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>

        {/* Profile Section */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Profil</CardTitle>
                <CardDescription>Vos informations personnelles</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">JD</span>
              </div>
              <div>
                <p className="font-semibold text-lg">Jean Dupont</p>
                <p className="text-muted-foreground">jean.dupont@email.com</p>
              </div>
              <Button variant="outline" className="ml-auto">
                Modifier le profil
              </Button>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Devise</Label>
                <Select value={currency} onValueChange={(value: any) => setCurrency(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="USD">Dollar ($)</SelectItem>
                    <SelectItem value="FCFA">Franc CFA (FCFA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Pays</Label>
                <Select defaultValue="FR">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="BE">Belgique</SelectItem>
                    <SelectItem value="CH">Suisse</SelectItem>
                    <SelectItem value="SN">Sénégal</SelectItem>
                    <SelectItem value="CI">Côte d'Ivoire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/50">
                <Palette className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>Personnalisez l'affichage</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode sombre</p>
                <p className="text-sm text-muted-foreground">Activer le thème sombre</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Animations</p>
                <p className="text-sm text-muted-foreground">Activer les animations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <Bell className="w-5 h-5 text-info" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Gérez vos alertes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertes de dépassement</p>
                <p className="text-sm text-muted-foreground">Quand une enveloppe dépasse 80%</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rappels de factures</p>
                <p className="text-sm text-muted-foreground">3 jours avant l'échéance</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Résumé mensuel</p>
                <p className="text-sm text-muted-foreground">Rapport en fin de mois</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Budget Settings */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CreditCard className="w-5 h-5 text-success" />
              </div>
              <div>
                <CardTitle>Budget</CardTitle>
                <CardDescription>Options de gestion du budget</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Duplication automatique</p>
                <p className="text-sm text-muted-foreground">Copier le budget du mois précédent</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Clôture automatique</p>
                <p className="text-sm text-muted-foreground">Clôturer le mois automatiquement</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Export & Delete */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Download className="w-5 h-5 text-warning" />
              </div>
              <div>
                <CardTitle>Données</CardTitle>
                <CardDescription>Export et suppression</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Exporter mes données</p>
                <p className="text-sm text-muted-foreground">Télécharger en PDF ou Excel</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">PDF</Button>
                <Button variant="outline" size="sm">Excel</Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-destructive">Supprimer mon compte</p>
                <p className="text-sm text-muted-foreground">Cette action est irréversible</p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
