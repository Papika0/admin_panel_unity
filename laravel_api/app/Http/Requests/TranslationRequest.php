<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TranslationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'key' => 'required|string|unique:translations,key,',
            'text' => 'required|array',
            'text.en' => 'required|string',
            'text.ka' => 'required|string',
            'text.ru' => 'required|string',
            'group' => 'required|string',
            'active' => 'boolean',
        ];
    }
}
