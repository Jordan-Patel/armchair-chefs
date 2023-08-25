import { Injectable } from '@nestjs/common';
import { Recipe } from './recipe.model';
import { v4 as uuid } from 'uuid';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter.dto';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  findAllRecipes(): Recipe[] {
    return this.recipes;
  }

  createRecipe(createRecipeDto: CreateRecipeDto): Recipe {
    const { title, description, ingredients, steps, cookingTime, difficulty } =
      createRecipeDto;
    const recipe: Recipe = {
      id: uuid(),
      title,
      description,
      ingredients,
      steps,
      difficulty,
      cookingTime,
      cooked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.recipes.push(recipe);
    return recipe;
  }

  getRecipesWithFilters(filterDto: GetRecipesFilterDto): Recipe[] {
    const { difficulty, search } = filterDto;
    let recipes = this.findAllRecipes();
    if (difficulty) {
      recipes = recipes.filter((recipe) => recipe.difficulty === difficulty);
    }
    if (search) {
      recipes = recipes.filter(
        (recipe) =>
          recipe.title.includes(search) || recipe.description.includes(search),
      );
    }
    return recipes;
  }

  getRecipeById(id: string): Recipe {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  deleteRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
  }

  updateRecipeCookedStatus(id: string, cooked: boolean): Recipe {
    const recipe = this.getRecipeById(id);
    recipe.cooked = cooked;
    return recipe;
  }
}
