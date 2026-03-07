import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function NewsletterForm() {
    const { t } = useTranslation('common');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setStatus('error');
            return;
        }
        // Simulate API call
        setStatus('success');
    };

    if (status === 'success') {
        return (
            <div data-testid="newsletter-success" className="bg-green-100 text-green-700 p-4 rounded-md font-medium text-center">
                {t('newsletter_success')}
            </div>
        );
    }

    return (
        <form data-testid="newsletter-form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow flex flex-col gap-2">
                <input
                    data-testid="newsletter-email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    placeholder={t('newsletter_placeholder')}
                    className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${status === 'error' ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'
                        }`}
                />
                {status === 'error' && (
                    <span data-testid="newsletter-error" className="text-red-500 text-sm">
                        {t('newsletter_error')}
                    </span>
                )}
            </div>
            <button
                data-testid="newsletter-submit"
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors h-fit"
            >
                {t('subscribe')}
            </button>
        </form>
    );
}
