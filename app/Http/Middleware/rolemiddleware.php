<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class rolemiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $role)
{
    $user = $request->user();

       
        $actualRole = $user->role;

        if ($actualRole != $role) {
            return response()->json(['error' => 'غير مصرح'], 403);
        }

        return $next($request);
}
}
