import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter.dto';
import { Recipe } from './recipe.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  findAllRecipes(@Query() filterDto: GetRecipesFilterDto): Promise<Recipe[]> {
    if (Object.keys(filterDto).length) {
      return this.recipesService.getRecipes(filterDto);
    } else {
      return this.recipesService.findAllRecipes();
    }
  }

  @Get('/:id')
  getRecipeById(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.getRecipeById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User,
  ): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipeDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteRecipe(@Param('id') id: string): Promise<void> {
    return this.recipesService.deleteRecipe(id);
  }

  @Patch('/:id/cooked')
  updateRecipeCookedStatus(
    @Param('id') id: string,
    @Body('cooked') cooked: boolean,
  ): Promise<Recipe> {
    return this.recipesService.updateRecipeCookedStatus(id, cooked);
  }
}
