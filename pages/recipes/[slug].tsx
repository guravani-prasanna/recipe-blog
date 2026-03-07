import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRecipeBySlug, getAllRecipes, Recipe } from '../../lib/api';
import SocialShare from '../../components/SocialShare';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface RecipeDetailProps {
  recipe: Recipe;
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const { t } = useTranslation('common');

  if (!recipe) return <div>Recipe not found</div>;

  let finalImageUrl = recipe.imageUrl || '/placeholder.jpg';
  if (finalImageUrl.startsWith('//')) {
    finalImageUrl = `https:${finalImageUrl}`;
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <Image
          src={finalImageUrl}
          alt={recipe.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full text-white">
          <h1 data-testid="recipe-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 shadow-sm">
            {recipe.title}
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl">{recipe.description}</p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-3 mb-8 text-sm border-b border-gray-100 pb-6 print:pb-0">
          <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full font-medium border border-blue-100">
            {t('cuisine')}: {recipe.category}
          </span>
          <span className="bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full font-medium border border-amber-100">
            {t('difficulty')}: {recipe.difficulty}
          </span>
          <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full font-medium border border-green-100">
            {t('time')}: {recipe.cookingTime} {t('mins')}
          </span>
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {recipe.videoUrl && (
          <div className="mb-8 print:hidden rounded-xl overflow-hidden shadow-sm border border-gray-100 relative pt-[56.25%] w-full">
            <ReactPlayer
              url={recipe.videoUrl}
              className="absolute top-0 left-0"
              width="100%"
              height="100%"
              controls
            />
          </div>
        )}

        <SocialShare title={recipe.title} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
            <h2 data-testid="ingredients-heading" className="text-2xl font-bold mb-5 text-gray-800">
              {t('ingredients_heading')}
            </h2>
            <ul data-testid="recipe-ingredients" className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span className="leading-tight">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">{t('instructions_heading')}</h2>
            <div data-testid="recipe-instructions" className="prose lg:prose-lg text-gray-700 max-w-none">
              <p className="whitespace-pre-line leading-relaxed">{recipe.instructions}</p>
            </div>
          </div>
        </div>

        <div data-testid="comments-list" className="mt-16 pt-8 border-t border-gray-200 print:hidden">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t('comments')}</h3>
          <div className="bg-gray-50 p-5 rounded-xl text-gray-700 mb-4 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">U</div>
              <p className="font-semibold text-gray-900">User123</p>
            </div>
            <p className="pl-11">Great recipe! Made this yesterday and it was delicious.</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'es', 'fr'];
  const paths: any[] = [];

  for (const locale of locales) {
    const recipes = await getAllRecipes(locale);
    for (const recipe of recipes) {
      paths.push({
        params: { slug: recipe.slug },
        locale,
      });
    }
  }

  return {
    paths,
    fallback: false, // Return 404 for unknown slugs
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const currentLocale = locale || 'en';
  const slug = params?.slug as string;
  const recipe = await getRecipeBySlug(slug, currentLocale);

  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['common'])),
      recipe,
    },
    revalidate: 60,
  };
};
