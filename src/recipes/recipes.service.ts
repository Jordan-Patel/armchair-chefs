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

  async getRecipes(filterDto: GetRecipesFilterDto): Promise<Recipe[]> {
    const { difficulty, search } = filterDto;

    const query = this.recipeRepository.createQueryBuilder('recipe');
    query.where({ difficulty });

    if (search) {
      query.andWhere(
        'recipe.title LIKE :search OR recipe.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    try {
      const recipes = await query.getMany();
      return recipes;
    } catch (error) {
      throw new NotFoundException('No recipes found');
    }
  }

  async getRecipeById(id: string): Promise<Recipe> {
    const found = this.recipeRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return found;
  }

  async deleteRecipe(id: string): Promise<void> {
    const result = await this.recipeRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
  }

  async updateRecipeCookedStatus(id: string, cooked: boolean): Promise<Recipe> {
    const recipe = await this.getRecipeById(id);

    recipe.cooked = cooked;
    await this.recipeRepository.save(recipe);

    return recipe;
  }
}
