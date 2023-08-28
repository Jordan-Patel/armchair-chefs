import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  findAllRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { title, description, ingredients, steps, cookingTime, difficulty } =
      createRecipeDto;
    const recipe: Recipe = this.recipeRepository.create({
      title,
      description,
      ingredients,
      steps,
      difficulty,
      cookingTime,
      cooked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.recipeRepository.save(recipe);
    return recipe;
  }

  // getRecipesWithFilters(filterDto: GetRecipesFilterDto): Recipe[] {
  //   const { difficulty, search } = filterDto;
  //   let recipes = this.findAllRecipes();
  //   if (difficulty) {
  //     recipes = recipes.filter((recipe) => recipe.difficulty === difficulty);
  //   }
  //   if (search) {
  //     recipes = recipes.filter(
  //       (recipe) =>
  //         recipe.title.includes(search) || recipe.description.includes(search),
  //     );
  //   }
  //   return recipes;
  // }

  getRecipeById(id: string): Promise<Recipe> {
    const found = this.recipeRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return found;
  }

  // deleteRecipe(id: string): void {
  //   const found = this.getRecipeById(id);
  //   this.recipes = this.recipes.filter((recipe) => recipe.id !== found.id);
  // }

  // updateRecipeCookedStatus(id: string, cooked: boolean): Recipe {
  //   const recipe = this.getRecipeById(id);
  //   recipe.cooked = cooked;
  //   return recipe;
  // }
}
