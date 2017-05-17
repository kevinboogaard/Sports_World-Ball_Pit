<?php namespace App\Controllers;

use App\Models\Highscore;
use App\Models\Highscoremanager;

class Controller {

	public function __construct() {
        $this->manager = new HighscoreManager();
    }

    public function GetGame() {
        return include("adg.website.php");
    }

    public function GetHighscores($amount) {
        return $this->manager->GetTopHighscore($amount);
    }
}