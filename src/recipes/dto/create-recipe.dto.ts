// import { IsNotEmpty } from 'class-validator';
import { RecipeDifficulty } from '../recipe.model';

export class CreateRecipeDto {
  title: string;
  // @IsNotEmpty()
  description: string;
  // @IsNotEmpty()
  ingredients: string[];
  // @IsNotEmpty()
  steps: string[];
  // @IsNotEmpty()
  cookingTime: number;
  // @IsNotEmpty()
  difficulty: RecipeDifficulty;
  // @IsNotEmpty()
  isPublished: boolean;
}
