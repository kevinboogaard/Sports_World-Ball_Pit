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

$route->post("/SaveHighscoreFromPost", function ($request, $response, $args) {
    $name = $request->getParam("name");
    $score = $request->getParam("score");

    $controller = new Controller();
    $controller->SaveHighscoreFromPost($name, $score);
});

$route->post("/GetHighscores", function ($request, $response, $args) {
    $amount = $request->getParam("amount");

    $controller = new Controller();
    $highscores = $controller->GetHighscores($amount);

    return json_encode($highscores);
});