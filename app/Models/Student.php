<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // Specify the table if it doesn’t follow Laravel's plural naming convention
    protected $table = 'students';

    // Define fillable attributes for mass assignment
    protected $fillable = [
        'nama',
        'nim',
        'angkatan',
        'status_irs',
    ];

    // Optional: Disable timestamps if not needed
    public $timestamps = true;
}
