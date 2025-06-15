<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'f_name'     => 'required|string',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'role'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'errors'  => $validator->errors(),
            ], 422);
        }
        $data = $validator->validated();
        $user = User::create([
            'f_name'     => $data['f_name'],
            'l_name'     => $request->l_name,
            'email'    => $data['email'],
            'birth_date'    => $request->birth_date,
            'password' => bcrypt($data['password']),
            'phone_number'=>$request->phone_number,
            'role'     => $data['role'],
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
//  Mail::send('emails.welcome', ['user' => $user], function ($message) use ($user) {
//     $message->to($user->email)
//             ->subject('منصة إقرأ التعليمية');
// });
        return response()->json([
            'token' => $token,
            'user'  => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $credentials = $validator->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
    public function send_email(Request $data){
    $code = rand(100, 999);

    Mail::send([], [], function ($message) use ($code) {
        $message->to('ahmadalhussein788@gmail.com')
                ->subject('كود تغيير كلمة السر ')
                ->html('هذا الكود الخاص فيك: ' . $code);
    });
    }
    public function reset_password_send_code(Request $data){
        $user=User::where('email',$data->email)->first();
        if(!$user)
        {
            return response()->jsonp(['message'=>'you dont register on these platform'],400);
        }
        else{
    // $code = rand(100, 999);
    // Mail::send([], [], function ($message) use ($code) {
    //     $message->to($user->email)
    //             ->subject('كود تغيير كلمة السر ')
    //             ->html('هذا الكود الخاص فيك: ' . $code);
    // });
        }
    }
    public function verifi_reset_password_code(Request $data){
    $code=$data->code;
    $user=User::where('email',$data->email)->first();
    if($code==$user->email_verification_code){
        return response()->json(["message"=>"code is whright"], 200);
    }
    else{
         return response()->json(["message"=>"code is invalide"], 200);
    }
    }
    public function change_code(Request $data){
     $user=User::where('email',$data->email)->first();
     $user->password=$data->password;
     $user->save();
    }
}
