import '../css/app.css';

import { PrimeToastProvider } from '@/context/toast';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Musyawarah Wilayah Hidayatullah Jateng Bagsel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PrimeToastProvider>
                <App {...props} />
            </PrimeToastProvider>,
        );
    },
    progress: {
        delay: 250,
        color: '#29d',
        includeCSS: true,
    },
});
