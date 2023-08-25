// import { IsOptional, IsString } from 'class-validator';

import { RecipeDifficulty } from '../recipe.model';

export class GetRecipesFilterDto {
  //   @IsString()
  //   @IsOptional()
  search?: string;
  difficulty?: RecipeDifficulty;
}
