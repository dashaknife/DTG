<?php

namespace App\Providers;

use App\Convertor;
use App\FastAdminPanel\Helpers\Platform;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        
        Blade::directive('desktopcss', function () {

            return "<?php if(Platform::desktop()){ ob_start(); ?>";
        });

        Blade::directive('mobilecss', function () {
        
            return '<?php Convertor::create($view_name, ob_get_clean()); } else { ob_start(); ?>';
        });

        Blade::directive('endcss', function () {

            return '<?php Convertor::create($view_name, ob_get_clean()); } ?>';
        });

        Blade::directive('js', function ($index) {
            
            return '<?php $position_js = '.($index ? $index : '1').'; ob_start(); ?>';
        });

        Blade::directive('endjs', function () {

            return '<?php JSAssembler::str($view_name.":".$position_js, ob_get_clean()); ?>';
        });
        
        


        View::composer('*', function($view){

            $view->with([
                'view_name' => $view->getName(),
            ]);
        });
    }
}
