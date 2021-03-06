<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\AliasLoader;
use View;

class FAPServiceProvider extends ServiceProvider
{

	public function boot() {

		View::composer(["inc.header", "inc.footer"], function ($view) {
		
			// 

			$view->with([

			]);
		});

		$this->app->bind('fastadminpanel:translate', function ($app) {
			return new \App\FastAdminPanel\Commands\FastAdminPanelTranslate();
		});
		
		$this->commands([
			'fastadminpanel:translate',
		]);

		include base_path('/routes/fap.php');
	}

	public function register() {

		$this->app->booting(function() {
			$loader = AliasLoader::getInstance();
			$loader->alias('JSAssembler', \App\FastAdminPanel\Helpers\JSAssembler::class);
			$loader->alias('Lang', \App\FastAdminPanel\Helpers\Lang::class);
			$loader->alias('ResizeImg', \App\FastAdminPanel\Helpers\ResizeImg::class);
			$loader->alias('Single', \App\FastAdminPanel\Helpers\Single::class);
			$loader->alias('Field', \App\FastAdminPanel\Helpers\Field::class);
			$loader->alias('Platform', \App\FastAdminPanel\Helpers\Platform::class);

		});
	}
}