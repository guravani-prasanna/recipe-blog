import { useState } from "react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllRecipes, Recipe } from "../../lib/api";
import RecipeCard from "../../components/RecipeCard";

interface RecipesProps {
  initialRecipes: Recipe[];
}

export default function RecipesPage({ initialRecipes }: RecipesProps) {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Extract unique categories
  const categories = Array.from(new Set(initialRecipes.map((r) => r.category)));

  // Filter recipes based on client-side state
  const filteredRecipes = initialRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? recipe.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {t("all_recipes")}
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            id="search"
            data-testid="search-input"
            type="text"
            placeholder={t("search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:w-1/3">
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            data-testid="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">{t("all_categories")}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.slug} className="h-full flex flex-col">
            <RecipeCard {...recipe} />
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 mt-8">
          <p className="text-gray-500 text-lg">{t("not_found")}</p>
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  const initialRecipes = await getAllRecipes(currentLocale);

  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["common"])),
      initialRecipes,
    },
    revalidate: 60,
  };
};
