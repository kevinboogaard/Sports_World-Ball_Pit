<?php

use App\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where we register all of the routes for the application.
|
*/

$route->get("/", function() {
    $controller = new Controller();
    return $controller->GetGame();
});

$route->get("/GetHighscores/{amount}", function($request, $response, $arguments) {
    $controller = new Controller();
    return $controller->GetHighscores($arguments["amount"]);
});