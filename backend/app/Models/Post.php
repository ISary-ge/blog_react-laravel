<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $table = "posts";
    protected $fillable = ['views'];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public static function MySQLtimestamp_conrverter($date){
        $formated_date = date_parse($date);

        return "Дата: $formated_date[day].$formated_date[month].$formated_date[year] в $formated_date[hour]:$formated_date[minute]";
    }
}
