import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getFeaturedRecipes, Recipe } from '../lib/api';
import RecipeCard from '../components/RecipeCard';
import NewsletterForm from '../components/NewsletterForm';

interface HomeProps {
  featuredRecipes: Recipe[];
}

export default function Home({ featuredRecipes }: HomeProps) {
  const { t } = useTranslation('common');

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">{t('featured_recipes')}</h2>
        <div data-testid="featured-recipes" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.slug} className="h-full flex flex-col">
              <RecipeCard {...recipe} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-2xl shadow-sm mt-12 print:hidden border border-blue-100 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2 text-blue-900">{t('newsletter_heading')}</h3>
        <p className="text-blue-700 mb-6">Get the latest recipes straight to your inbox.</p>
        <NewsletterForm />
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || 'en';
  const featuredRecipes = await getFeaturedRecipes(currentLocale);

  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['common'])),
      featuredRecipes,
    },
    revalidate: 60,
  };
};
