<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\category;

class Categorycontroller extends Controller
{
    function showcategoryname($id){
        $category = category::where("id" , "=" , $id) ->first();
        return $category->name;
    }
}
