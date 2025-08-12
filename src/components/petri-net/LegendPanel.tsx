import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export const LegendPanel = () => {
  return (
    <Card className="control-panel">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Légende du Réseau</CardTitle>
        </div>
        <CardDescription>
          Explication des éléments du réseau de Petri
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Places */}
        <div>
          <h4 className="font-medium mb-2">Places (États)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-place-inactive border border-place-border"></div>
              <span>Place vide</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-place-active border border-place-active relative">
                <div className="w-2 h-2 rounded-full bg-token absolute top-1 left-1"></div>
              </div>
              <span>Place avec jeton (active)</span>
            </div>
          </div>
        </div>

        {/* Transitions */}
        <div>
          <h4 className="font-medium mb-2">Transitions (Événements)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-place-inactive border border-place-border"></div>
              <span>Transition désactivée</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-transition-enabled border border-transition-enabled"></div>
              <span>Transition activée (cliquable)</span>
            </div>
          </div>
        </div>

        {/* Définitions des places */}
        <div>
          <h4 className="font-medium mb-2">Définitions</h4>
          <div className="space-y-1 text-xs">
            <div><strong>P1:</strong> Porte fermée</div>
            <div><strong>P2:</strong> Personne détectée</div>
            <div><strong>P3:</strong> Porte ouverte</div>
            <div><strong>P4:</strong> Temporisation active</div>
          </div>
        </div>

        {/* Définitions des transitions */}
        <div>
          <div className="space-y-1 text-xs">
            <div><strong>T1:</strong> Détection d'une personne</div>
            <div><strong>T2:</strong> Ouverture de la porte</div>
            <div><strong>T3:</strong> Fin du temps d'ouverture</div>
            <div><strong>T4:</strong> Fermeture de la porte</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="pt-2 border-t">
          <Badge variant="secondary" className="text-xs">
            💡 Cliquez sur les transitions bleues pour les déclencher
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};