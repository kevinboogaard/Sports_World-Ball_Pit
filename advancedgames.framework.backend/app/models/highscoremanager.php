<?php namespace App\Models;

use DB;

class HighscoreManager
{
    public function __construct() {
        $query = "SELECT * FROM `ballpit` ORDER BY `score` DESC";
        
        $raw = DB::query($query)->get();

        $this->data = $raw;
    }
    
    public function GetTopHighscores($amount) {
        $results = array_slice($this->data, 0, $amount); 
        return $results;
    }

    public function SaveHighscore($name, $score) {
        $query = "INSERT INTO ballpit( score, name ) VALUES( ?, ? )";
        DB::query($query, array($score, $name));
    }
}