import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]), // Assuming you have a RecipeEntity defined
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
