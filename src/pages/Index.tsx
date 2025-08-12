import { PetriNetFlow } from '@/components/petri-net/PetriNetFlow';
import { ControlPanel } from '@/components/petri-net/ControlPanel';
import { LegendPanel } from '@/components/petri-net/LegendPanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, DoorOpen, Cpu } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-lg">
              <Network className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Réseau de Petri - Porte Automatique
              </h1>
              <p className="text-muted-foreground">
                Modélisation et simulation d'un système de porte automatique avec capteur
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Cpu className="h-3 w-3" />
              Simulation interactive
            </Badge>
            <Badge variant="outline" className="gap-1">
              <DoorOpen className="h-3 w-3" />
              Système automatisé
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Diagramme principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="control-panel">
              <CardHeader>
                <CardTitle>Diagramme du Réseau de Petri</CardTitle>
                <CardDescription>
                  Visualisation interactive du système de porte automatique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PetriNetFlow />
              </CardContent>
            </Card>

            {/* Description du système */}
            <Card className="control-panel">
              <CardHeader>
                <CardTitle>Description du Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>🎯 Objectif:</strong> Modéliser l'ouverture et la fermeture d'une porte automatique avec un réseau de Petri.
                </div>
                <div>
                  <strong>🔄 Fonctionnement:</strong> Une porte s'ouvre quand un capteur détecte une personne, reste ouverte un certain temps, puis se referme automatiquement.
                </div>
                <div>
                  <strong>✅ Avantages du RdP:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>Visualisation claire du cycle complet</li>
                    <li>Vérification des contraintes de sécurité</li>
                    <li>Simulation de scénarios multiples</li>
                    <li>Test de la gestion des files d'attente</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panneau de contrôle */}
          <div className="space-y-6">
            <ControlPanel />
            <LegendPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
