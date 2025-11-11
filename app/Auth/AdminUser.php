<?php

namespace App\Auth;

use Illuminate\Contracts\Auth\Authenticatable;

class AdminUser implements Authenticatable
{
    public $id = 'adminuser';
    public $name = 'Administrator';
    public $email = 'admin@app.com';

    // ---- Required by Authenticatable ----
    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getAuthPassword()
    {
        return null; // Admin has no password
    }

    public function getAuthPasswordName()
    {
        return 'password'; // Just return the field name Laravel expects
    }

    public function getRememberToken()
    {
        return null;
    }

    public function setRememberToken($value)
    {
        // No-op
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }
}
