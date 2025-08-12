import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, DoorOpen } from 'lucide-react';
import { usePetriNet } from '@/hooks/usePetriNet';

export const ControlPanel = () => {
  const {
    state,
    fireTransition,
    reset,
    goToPreviousStep,
    goToNextStep,
    canGoBack,
    canGoForward,
    currentStep,
    totalSteps,
    autoPlay,
    setAutoPlay,
    doorStatus,
  } = usePetriNet();

  const statusColors = {
    fermée: 'bg-destructive',
    détection: 'bg-secondary text-secondary-foreground',
    ouverte: 'bg-place-active',
    temporisation: 'bg-primary',
    inconnu: 'bg-muted',
  };

  return (
    <div className="space-y-4">
      {/* État de la porte */}
      <Card className="control-panel">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <DoorOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">État de la Porte</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge 
              className={`${statusColors[doorStatus as keyof typeof statusColors]} text-white font-medium px-3 py-1`}
            >
              {doorStatus.toUpperCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Étape {currentStep + 1} / {totalSteps}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Contrôles de simulation */}
      <Card className="control-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Contrôles de Simulation</CardTitle>
          <CardDescription>
            Contrôlez manuellement les transitions ou lancez la simulation automatique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousStep}
              disabled={!canGoBack}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextStep}
              disabled={!canGoForward}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant={autoPlay ? "secondary" : "default"}
              size="sm"
              onClick={() => setAutoPlay(!autoPlay)}
              className="ml-auto"
            >
              {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {autoPlay ? 'Pause' : 'Auto'}
            </Button>
          </div>

          {/* Transitions manuelles */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={state.transitions.T1 ? "default" : "outline"}
              onClick={() => fireTransition('T1')}
              disabled={!state.transitions.T1}
              className="text-xs"
            >
              T1: Détection
            </Button>
            <Button
              variant={state.transitions.T2 ? "default" : "outline"}
              onClick={() => fireTransition('T2')}
              disabled={!state.transitions.T2}
              className="text-xs"
            >
              T2: Ouverture
            </Button>
            <Button
              variant={state.transitions.T3 ? "default" : "outline"}
              onClick={() => fireTransition('T3')}
              disabled={!state.transitions.T3}
              className="text-xs"
            >
              T3: Temporisation
            </Button>
            <Button
              variant={state.transitions.T4 ? "default" : "outline"}
              onClick={() => fireTransition('T4')}
              disabled={!state.transitions.T4}
              className="text-xs"
            >
              T4: Fermeture
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* État du réseau */}
      <Card className="control-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">État du Réseau</CardTitle>
          <CardDescription>
            Marquage actuel des places
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="text-center">
              <div className="font-medium">P1</div>
              <div className={`w-6 h-6 rounded-full mx-auto mt-1 flex items-center justify-center ${
                state.places.P1 > 0 ? 'bg-place-active text-white' : 'bg-place-inactive'
              }`}>
                {state.places.P1}
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">P2</div>
              <div className={`w-6 h-6 rounded-full mx-auto mt-1 flex items-center justify-center ${
                state.places.P2 > 0 ? 'bg-place-active text-white' : 'bg-place-inactive'
              }`}>
                {state.places.P2}
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">P3</div>
              <div className={`w-6 h-6 rounded-full mx-auto mt-1 flex items-center justify-center ${
                state.places.P3 > 0 ? 'bg-place-active text-white' : 'bg-place-inactive'
              }`}>
                {state.places.P3}
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">P4</div>
              <div className={`w-6 h-6 rounded-full mx-auto mt-1 flex items-center justify-center ${
                state.places.P4 > 0 ? 'bg-place-active text-white' : 'bg-place-inactive'
              }`}>
                {state.places.P4}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};