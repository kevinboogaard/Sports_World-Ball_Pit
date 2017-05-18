<?php namespace App\Controllers;

use App\Models\Highscoremanager;

class Controller {

	public function __construct() {
        $this->manager = new HighscoreManager();
    }

    public function GetGame() {
        return include("adg.website.php");
    }

    public function GetHighscores($amount) {
        return $this->manager->GetTopHighscores($amount);
    }

    public function SaveHighscore($name, $score) {
        return $this->manager->SaveHighscore($name, $score);
    }

    public function SaveHighscoreFromPost($name, $score) {
        $this->SaveHighscore($name, $score);
    }
}