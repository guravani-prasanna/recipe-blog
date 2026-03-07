export type Recipe = {
  slug: string;
  title: string;
  description: string;
  cookingTime: number;
};

const recipes: Recipe[] = [
  {
    slug: "spaghetti",
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish.",
    cookingTime: 30,
  },
  {
    slug: "pancakes",
    title: "Fluffy Pancakes",
    description: "Soft and fluffy breakfast pancakes.",
    cookingTime: 20,
  },
  {
    slug: "biryani",
    title: "Chicken Biryani",
    description: "Aromatic rice dish cooked with spices and chicken.",
    cookingTime: 60,
  },
  {
    slug: "burger",
    title: "Cheese Burger",
    description: "Juicy grilled beef patty with melted cheese.",
    cookingTime: 25,
  },
];

export async function getAllRecipes() {
  return recipes;
}

export async function getRecipeBySlug(slug: string) {
  return recipes.find((r) => r.slug === slug);
}
