import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { RecipeDifficulty } from '../recipe.model';

export class CreateRecipeDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  ingredients: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  steps: string[];

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  cookingTime: number;

  @IsNotEmpty()
  @IsEnum(RecipeDifficulty)
  difficulty: RecipeDifficulty;

  @IsNotEmpty()
  isPublished: boolean;
}
