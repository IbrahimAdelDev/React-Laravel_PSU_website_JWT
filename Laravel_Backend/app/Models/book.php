<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class book extends Model
{
    use HasFactory;
    protected $fillable=[
        'title',
        'author',
        'borrowed',
        'category_id',
        'category_name',
        'posterurl',
        'stu_id'
    ];
    public function category()
    {
        return $this->belongsTo(category::class);
    }
    
    // public function student()
    // {
    //     return $this->belongsTo(student::class);
    // }

}
