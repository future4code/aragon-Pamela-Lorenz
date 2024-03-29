import { IRecipeDB, Recipe } from "../models/Recipe"
import { BaseDatabase } from "./BaseDatabase"

export class RecipeDatabase extends BaseDatabase {
    public static TABLE_RECIPES = "Cookenu_Recipes"

    public getAllRecipes = async () => {
        const recipesDB: IRecipeDB[] = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select()

        return recipesDB
    }

    public createRecipe = async (recipe: Recipe) => {
        const newRecipe: IRecipeDB = {
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            created_at: recipe.getCreatedAt(),
            updated_at: recipe.getUpdatedAt(),
            creator_id: recipe.getCreatorId()
        }
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .insert(newRecipe)
    }

    public editRecipe = async (recipe: Recipe) => {
        const newRecipe: IRecipeDB = {
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            created_at: recipe.getCreatedAt(),
            updated_at: recipe.getUpdatedAt(),
            creator_id: recipe.getCreatorId()
        }
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .update(newRecipe)
            .where({ id: newRecipe.id })
    }

    public findById = async (id: string) => {
        const result: IRecipeDB[] = await BaseDatabase.connection(RecipeDatabase.TABLE_RECIPES)
            .select().where({ id })
        return result[0]
    }

    public deletRecipe = async (id: string) => {
        await BaseDatabase.connection(RecipeDatabase.TABLE_RECIPES)
            .delete().where({ id })
    }
}