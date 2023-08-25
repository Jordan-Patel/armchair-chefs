import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter.dto';
// import { Recipe } from './recipe.entity';
// import { GetRecipesFilterDto } from './dto/get-recipes-filter.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  findAllRecipes(@Query() filterDto: GetRecipesFilterDto): Recipe[] {
    if (Object.keys(filterDto).length) {
      return this.recipesService.getRecipesWithFilters(filterDto);
    } else {
      return this.recipesService.findAllRecipes();
    }
  }

  @Get('/:id')
  getRecipeById(@Param('id') id: string): Recipe {
    return this.recipesService.getRecipeById(id);
  }

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto): Recipe {
    return this.recipesService.createRecipe(createRecipeDto);
  }

  @Delete('/:id')
  deleteRecipe(@Param('id') id: string): void {
    this.recipesService.deleteRecipe(id);
  }

  @Patch('/:id/cooked')
  updateRecipeCookedStatus(
    @Param('id') id: string,
    @Body('cooked') cooked: boolean,
  ): Recipe {
    return this.recipesService.updateRecipeCookedStatus(id, cooked);
  }
}
