export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cooked: boolean;
  // imageUrl: string;
  cookingTime: number;
  difficulty: RecipeDifficulty;
  createdAt: Date;
  updatedAt: Date;
}

export enum RecipeDifficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}
