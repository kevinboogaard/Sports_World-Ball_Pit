<?php namespace App\Models;

use DB;

class Highscore
{
    public function __construct($id) {
        $this->id = $id;
        $this->data;

        $this->_load();
    }

    private function _load() {
        $query = "SELECT * FROM `ballpit` WHERE `id` = ?";
        $raw = DB::query($query, array($this->id));

        $this->data = $raw;
    }
}