<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class blockmiddlaware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   $isblocked=$request->user()->isblocked;
        if($isblocked){
            return response()->json(["messag"=>"you are blocked"], 200);
        }
        else{
              return $next($request);
        }
      
    }
}
