import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface SocialShareProps {
    title: string;
}

export default function SocialShare({ title }: SocialShareProps) {
    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        // Determine the host for full URL generation
        const host = window.location.origin;
        setCurrentUrl(`${host}${router.asPath}`);
    }, [router.asPath]);

    if (!currentUrl) return null;

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(`Checkout this recipe: ${title}`);
    const twitterIntentUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

    return (
        <div className="flex items-center space-x-3 mb-6 print:hidden">
            <span className="font-semibold text-gray-700">Share:</span>
            <a
                data-testid="social-share-twitter"
                href={twitterIntentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500 transition font-medium"
            >
                Twitter
            </a>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 transition font-medium"
            >
                Facebook
            </a>
        </div>
    );
}
