<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\teacher;
use App\Models\track;
use App\Models\User;

class HomePageController extends Controller
{
    public function GetAllLearningPath(){
    $tracks=track::all();
    return response()->json($tracks, 200);
    }
    public function GetAllTeacher(){
     $teachers=teacher::all();
     return response()->json($teachers, 200);
    }
}
