<?php namespace App\Models;

use DB;

class HighscoreManager
{
    public function __construct() {
        $query = "SELECT * FROM `ballpit` ORDER BY `score` DESC";
        
        $raw = DB::query($query)->get();

        $this->data = $raw;
    }

    public function GetTopHighscore($amount) {
        $results = array_slice($this->data, 0, $amount); 
        return json_encode($results);
    }
}