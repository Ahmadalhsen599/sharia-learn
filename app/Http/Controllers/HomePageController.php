<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\course_track;
use App\Models\course;
use App\Models\tracks;
use App\Models\User;

class HomePageController extends Controller
{
    public function GetAllLearningPath(Request $data){
    $tracks=tracks::all();
    return response()->json($tracks, 200);
    }
    public function GetAllTeacher(){
     $teachers=User::where('role',2)->get();
     return response()->json($teachers, 200);
    }
}
