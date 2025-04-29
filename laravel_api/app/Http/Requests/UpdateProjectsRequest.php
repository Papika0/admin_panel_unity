<?php

namespace App\Http\Requests;

use App\Http\Requests\StoreProjectsRequest;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectsRequest extends FormRequest
{
    public function rules()
    {
        return (new StoreProjectsRequest)->rules();
    }
}
