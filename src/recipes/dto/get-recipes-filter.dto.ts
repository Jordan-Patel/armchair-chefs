import { IsEnum, IsOptional, IsString } from 'class-validator';

import { RecipeDifficulty } from '../recipe-difficulty.enum';

export class GetRecipesFilterDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(RecipeDifficulty)
  difficulty?: RecipeDifficulty;
}
