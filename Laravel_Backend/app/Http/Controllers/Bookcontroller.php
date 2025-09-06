<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\book;


class Bookcontroller extends Controller
{
    function showbooknb(){
        $book = book::where("borrowed" , "=" , "no") ->get();
        return $book;
    }

    function showstubook($id){
        $book = book::where("stu_id" , "=" , $id) ->get();
        return $book;
    }

    public function createbook(Request $request){
        $categoryController = new Categorycontroller();
        $category_name = $categoryController->showcategoryname($request->category_id);
        $book = book::create([
            "title" => $request->title,
            "author" => $request->author,
            "borrowed" => $request->borrowed,
            "category_id" => $request->category_id,
            "category_name"=>$category_name,
            "posterurl"=>$request->posterurl,
            "stu_id" => $request->stu_id
        ]);
        return $book;
    }

    public function unborrow(Request $request){
        book::where('id','=', $request->id)->update([
            "borrowed" => "no",
            "stu_id" => 0
        ]);
        $book = book::find($request->id);
        return $book;
    }

    public function borrow(Request $request){
        book::where('id','=', $request->id)->update([
            "borrowed" => "yes",
            "stu_id" => $request->stu_id
        ]);
        $book = book::find($request->id);
        return $book;
    }
}
