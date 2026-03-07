import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
    const router = useRouter();
    const { locales, locale: activeLocale, asPath } = router;

    return (
        <div data-testid="language-switcher" className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm">Language:</span>
            <div className="flex space-x-2">
                {locales?.map((loc) => (
                    <Link
                        key={loc}
                        href={asPath}
                        locale={loc}
                        className={`px-2 py-1 rounded text-sm font-medium ${activeLocale === loc
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {loc.toUpperCase()}
                    </Link>
                ))}
            </div>
        </div>
    );
}
