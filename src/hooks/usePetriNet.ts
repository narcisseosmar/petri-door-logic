import { useState, useCallback, useEffect } from 'react';
import { PetriNetState, PetriNetConfig, Place, Transition } from '@/types/petri-net';

const initialState: PetriNetState = {
  places: {
    P1: 1, // Porte fermée (état initial)
    P2: 0, // Personne détectée
    P3: 0, // Porte ouverte
    P4: 0, // Temporisation active
  },
  transitions: {
    T1: false,
    T2: false,
    T3: false,
    T4: false,
  },
};

const petriNetConfig: PetriNetConfig = {
  places: [
    { id: 'P1', name: 'P1', description: 'Porte fermée', tokens: 1 },
    { id: 'P2', name: 'P2', description: 'Personne détectée', tokens: 0 },
    { id: 'P3', name: 'P3', description: 'Porte ouverte', tokens: 0 },
    { id: 'P4', name: 'P4', description: 'Temporisation active', tokens: 0 },
  ],
  transitions: [
    {
      id: 'T1',
      name: 'T1',
      description: 'Détection personne',
      enabled: false,
      from: ['P1'],
      to: ['P2'],
    },
    {
      id: 'T2',
      name: 'T2',
      description: 'Ouverture porte',
      enabled: false,
      from: ['P2'],
      to: ['P3'],
    },
    {
      id: 'T3',
      name: 'T3',
      description: 'Fin temporisation',
      enabled: false,
      from: ['P3'],
      to: ['P4'],
    },
    {
      id: 'T4',
      name: 'T4',
      description: 'Fermeture porte',
      enabled: false,
      from: ['P4'],
      to: ['P1'],
    },
  ],
};

export const usePetriNet = () => {
  const [state, setState] = useState<PetriNetState>(initialState);
  const [history, setHistory] = useState<PetriNetState[]>([initialState]);
  const [currentStep, setCurrentStep] = useState(0);

  // Check which transitions are enabled
  const updateTransitionStates = useCallback((currentState: PetriNetState) => {
    const newTransitions = { ...currentState.transitions };
    
    // T1: Enabled if P1 has tokens
    newTransitions.T1 = currentState.places.P1 > 0;
    
    // T2: Enabled if P2 has tokens
    newTransitions.T2 = currentState.places.P2 > 0;
    
    // T3: Enabled if P3 has tokens
    newTransitions.T3 = currentState.places.P3 > 0;
    
    // T4: Enabled if P4 has tokens
    newTransitions.T4 = currentState.places.P4 > 0;

    return { ...currentState, transitions: newTransitions };
  }, []);

  // Fire a transition
  const fireTransition = useCallback((transitionId: string) => {
    setState(prevState => {
      const newState = { ...prevState };
      
      switch (transitionId) {
        case 'T1': // Détection personne
          if (newState.places.P1 > 0) {
            newState.places.P1 -= 1;
            newState.places.P2 += 1;
          }
          break;
          
        case 'T2': // Ouverture porte
          if (newState.places.P2 > 0) {
            newState.places.P2 -= 1;
            newState.places.P3 += 1;
          }
          break;
          
        case 'T3': // Fin temporisation
          if (newState.places.P3 > 0) {
            newState.places.P3 -= 1;
            newState.places.P4 += 1;
          }
          break;
          
        case 'T4': // Fermeture porte
          if (newState.places.P4 > 0) {
            newState.places.P4 -= 1;
            newState.places.P1 += 1;
          }
          break;
      }
      
      const updatedState = updateTransitionStates(newState);
      
      // Add to history
      setHistory(prev => [...prev.slice(0, currentStep + 1), updatedState]);
      setCurrentStep(prev => prev + 1);
      
      return updatedState;
    });
  }, [currentStep, updateTransitionStates]);

  // Reset to initial state
  const reset = useCallback(() => {
    const resetState = updateTransitionStates(initialState);
    setState(resetState);
    setHistory([resetState]);
    setCurrentStep(0);
  }, [updateTransitionStates]);

  // Go to previous step
  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setState(history[currentStep - 1]);
    }
  }, [currentStep, history]);

  // Go to next step
  const goToNextStep = useCallback(() => {
    if (currentStep < history.length - 1) {
      setCurrentStep(prev => prev + 1);
      setState(history[currentStep + 1]);
    }
  }, [currentStep, history]);

  // Initialize transition states
  useEffect(() => {
    setState(prev => updateTransitionStates(prev));
  }, [updateTransitionStates]);

  // Auto-progression simulation
  const [autoPlay, setAutoPlay] = useState(false);
  
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      // Find first enabled transition and fire it
      const enabledTransitions = Object.entries(state.transitions)
        .filter(([_, enabled]) => enabled)
        .map(([id]) => id);
      
      if (enabledTransitions.length > 0) {
        fireTransition(enabledTransitions[0]);
      } else {
        setAutoPlay(false);
      }
    }, 1500);
    
    return () => clearInterval(interval);
  }, [autoPlay, state.transitions, fireTransition]);

  const getDoorStatus = () => {
    if (state.places.P1 > 0) return 'fermée';
    if (state.places.P2 > 0) return 'détection';
    if (state.places.P3 > 0) return 'ouverte';
    if (state.places.P4 > 0) return 'temporisation';
    return 'inconnu';
  };

  return {
    state,
    config: petriNetConfig,
    fireTransition,
    reset,
    goToPreviousStep,
    goToNextStep,
    canGoBack: currentStep > 0,
    canGoForward: currentStep < history.length - 1,
    currentStep,
    totalSteps: history.length,
    autoPlay,
    setAutoPlay,
    doorStatus: getDoorStatus(),
  };
};