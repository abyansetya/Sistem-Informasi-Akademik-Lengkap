<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    // protected $fillable = [
    //     'name', // Changed from 'name' to 'nama' to match your table
    //     'email',
    //     'password',
    //     'NIM_NIP',
    //     'alamat',
    //     'telepon',
    //     'status',
    // ];
    protected $primaryKey = 'user_id';

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relationship to the roles.
     * Assuming there's a 'userrole' pivot table with 'user_id' and 'role_id'.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    public function dosenPegawai()
    {
    return $this->hasOne(DosenPegawai::class, 'user_id', 'user_id');
    }

    
}
