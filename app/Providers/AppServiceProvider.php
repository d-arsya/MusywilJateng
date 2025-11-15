<?php

namespace App\Providers;

use App\Auth\StaticAdminProvider;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
            URL::forceRootUrl(config('app.url'));
        }
        Auth::provider('static_admin', function ($app, array $config) {
            return new StaticAdminProvider();
        });
    }
}
