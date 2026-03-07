import { createClient, EntrySkeletonType, Entry } from "contentful";

/* ============================= */
/* Recipe Fields */
/* ============================= */

export interface RecipeFields {
  title: string;
  slug: string;
  description: any;      // Rich Text Document
  ingredients: any;      // Rich Text Document
  instructions: any;     // Rich Text Document
  featuredImage?: any;    // Asset
  cookingTime: number;
}

/* ============================= */

export type RecipeSkeleton = EntrySkeletonType<
  RecipeFields,
  "recipe"
>;

export type RecipeEntry = Entry<RecipeSkeleton, undefined, string>;

/* ============================= */

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

/* ============================= */

export async function getAllRecipes(locale: string) {
  const entries = await contentfulClient.getEntries<RecipeSkeleton>({
    content_type: "recipe",
    locale,
  });

  return entries.items;
}

/* ============================= */

export async function getRecipeBySlug(slug: string, locale: string) {
  const entries = await contentfulClient.getEntries<RecipeSkeleton>({
    content_type: "recipe",
    locale,
    ...( { "fields.slug": slug } as any ),
  });

  return entries.items[0] ?? null;
}