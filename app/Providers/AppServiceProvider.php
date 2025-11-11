<?php

namespace App\Providers;

use App\Auth\StaticAdminProvider;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;

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
        Auth::provider('static_admin', function ($app, array $config) {
            return new StaticAdminProvider();
        });
    }
}
