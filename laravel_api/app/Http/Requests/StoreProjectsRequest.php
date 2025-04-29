<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectsRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title'            => 'required|array',
            'title.en'         => 'required|string',
            'title.ru'         => 'required|string',
            'title.ka'         => 'required|string',
            'description'      => 'required|array',
            'description.en'   => 'required|string',
            'description.ka'   => 'required|string',
            'description.ru'   => 'required|string',
            'location'         => 'required|string|max:255',
            'status'           => 'required|string|max:50',
            'start_date'       => 'required|date',
            'completion_date'  => 'required|date|after_or_equal:start_date',
            'render_image'       => 'required|string|max:255',
            'main_image'       => 'required|string|max:255',
            'gallery_images'   => 'nullable|array',
            'gallery_images.*' => 'string|max:255',
            'architect_name'   => 'nullable|string|max:100',
            'year'             => 'required|integer|min:1900|max:2100',
            'latitude'         => 'nullable|numeric',
            'longitude'        => 'nullable|numeric',
            'meta_title'       => 'nullable|string|max:155',
            'meta_description' => 'nullable|string',
        ];
    }
}
