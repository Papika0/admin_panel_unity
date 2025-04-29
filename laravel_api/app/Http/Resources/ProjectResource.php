<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'               => $this->id,
            'title'            => $this->getTranslation('title', 'ka'),
            'description'      => $this->getTranslation('description', 'ka'),
            'location'         => $this->getTranslation('location', 'ka'),
           'status'           => trans(
                                     'projects.statuses.' . $this->status,
                                     [], 
                                     'ka'
                                  ),
            'start_date'       => $this->start_date->toDateString(),
            'completion_date'  => $this->completion_date->toDateString(),
            'main_image'       => $this->main_image,
            'render_image'     => $this->render_image,
            'gallery_images'   => $this->gallery_images,
            'year'             => $this->year,
            'is_active'        => (bool) $this->is_active,
            'is_featured'      => (bool) $this->is_featured,
            'latitude'         => $this->latitude,
            'longitude'        => $this->longitude,
            'meta_title'       => $this->meta_title,
            'meta_description' => $this->meta_description,
            'created_at'       => $this->created_at->toIso8601String(),
            'updated_at'       => $this->updated_at->toIso8601String(),
        ];
    }
}
