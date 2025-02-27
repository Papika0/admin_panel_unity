<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TranslationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'text' => $this->text,
            'group' => $this->group,
            'active' => $this->active,
        ];
    }
}
