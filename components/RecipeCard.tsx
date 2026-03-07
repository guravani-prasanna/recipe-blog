import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Recipe } from '../lib/api';

export default function RecipeCard({ slug, title, imageUrl, category, cookingTime }: Recipe) {
    const { t } = useTranslation('common');

    let finalImageUrl = imageUrl || '/placeholder.jpg';
    if (finalImageUrl.startsWith('//')) {
        finalImageUrl = `https:${finalImageUrl}`;
    }

    return (
        <div data-testid="recipe-card" className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
            <Link href={`/recipes/${slug}`} className="block relative w-full h-48 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Image
                    src={finalImageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
                <div className="flex gap-2 text-sm text-gray-500 mb-4 mt-auto">
                    <span>{category}</span>
                    <span>•</span>
                    <span>{cookingTime} {t('mins')}</span>
                </div>
                <Link
                    href={`/recipes/${slug}`}
                    className="text-blue-600 font-medium hover:underline focus:outline-none focus:underline mt-auto"
                >
                    {t('view_recipe')} →
                </Link>
            </div>
        </div>
    );
}
