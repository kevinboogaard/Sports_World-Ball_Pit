<?php
/**
 * Sports World: Ball Pit - Puzzle game for Cool Games.
 *
 * @package   Sports World: Ball Pit
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 */

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our application. We just need to utilize it! We'll simply require it
| into the script here so that we don't have to worry about manual
| loading any of our classes later on. It feels nice to relax.
|
*/
require_once __DIR__.'/vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| HTTP Routing
|--------------------------------------------------------------------------
|
| We need to enable the routing system in order to get the routing working.
| We're using a framework called Slim to do this for us!
| See the documentary at: https://github.com/codeguy/Slim.
|
*/
$route = new Slim\App();

/*
|--------------------------------------------------------------------------
| Environment Variables
|--------------------------------------------------------------------------
|
*/
$env = (new josegonzalez\Dotenv\Loader('.env'))
              ->parse()
              ->toEnv(true);

/*
|--------------------------------------------------------------------------
| Enable The Query Builder
|--------------------------------------------------------------------------
|
| For beautiful code we use Pixie: A query builder framework.
|
*/
$config = array(
    'driver'    => 'mysql', 
    'host'      => $_ENV["DB_HOST"],
    'database'  => $_ENV["DB_DATABASE"],
    'username'  => $_ENV["DB_USERNAME"],
    'password'  => $_ENV["DB_PASSWORD"],
);
$conn = new \Pixie\Connection('mysql', $config, "DB");

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Register the application routes in Slim.
|
*/
require_once __DIR__.'/advancedgames.framework.backend/app/http/routes.php';

/*
|--------------------------------------------------------------------------
| Run The Routing
|--------------------------------------------------------------------------
|
| Once we have the routing complete, we simply call the run method,
| which will load all the routes made.
*/
$route->run();