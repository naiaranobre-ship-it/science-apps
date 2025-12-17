export enum AppView {
  HOME = 'HOME',
  LIFECYCLE = 'LIFECYCLE', // Monóculos / Ciclo de vida
  PARTS = 'PARTS', // Partes da planta
  NEEDS = 'NEEDS', // O que a planta precisa
  QUESTIONS = 'QUESTIONS', // Minhas perguntas
}

export interface LifecycleStage {
  id: number;
  title: string;
  description: string;
  imageEmoji: string;
  color: string;
}

export interface PlantPart {
  id: string;
  name: string;
  description: string;
  color: string;
}