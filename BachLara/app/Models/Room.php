<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $fillable=[
        'room_type',
        'lec_start_date',
        'lec_end_date',
        'emp_id',
        'floor_id'
    ];
}
