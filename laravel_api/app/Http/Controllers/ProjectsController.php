<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectsRequest;
use App\Http\Requests\UpdateProjectsRequest;

class ProjectsController extends Controller
{
    use ApiResponse;

    public function index()
    {
        try {
            $projects = Projects::all();
            // wrap each model in our resource
            $resources = ProjectResource::collection($projects);
        
            return $this->success($resources);
        } catch (\Exception $e) {
            return $this->error('Failed to fetch projects', 500);
        }
    }

    public function show($id)
    {
        try {
            $project = Projects::findOrFail($id);
            return $this->success(new ProjectResource($project));
        } catch (\Exception $e) {
            return $this->error('Project not found', 404);
        }
    }

    public function store(StoreProjectsRequest $request)
    {
        try {
            $project = Projects::create($request->validated());
            return $this->success($project, 'Project created', 201);
        } catch (\Exception $e) {
            return $this->error('Failed to create project', 500);
        }
    }

   public function update(UpdateProjectsRequest $request, $id) : \Illuminate\Http\JsonResponse
{
    try {
        $project = Projects::findOrFail($id);

        $data = [...$request->validated()];

        if ($request->hasFile('main_image')) {
            // Delete old main image if exists
            if ($project->main_image && Storage::disk('public')->exists(str_replace('/storage/', '', $project->main_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->main_image));
            }
            
            $path = $request->file('main_image')->store('projects/main', 'public');
            $data['main_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('render_image')) {
            // Delete old render image if exists
            if ($project->render_image && Storage::disk('public')->exists(str_replace('/storage/', '', $project->render_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->render_image));
            }
            
            $path = $request->file('render_image')->store('projects/render', 'public');
            $data['render_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('gallery_images')) {
            // Get existing gallery images if any
            $existingGallery = [];
            if ($project->gallery_images) {
                // Check if it's already an array or a JSON string
                if (is_array($project->gallery_images)) {
                    $existingGallery = $project->gallery_images;
                } else {
                    $decoded = json_decode($project->gallery_images, true);
                    $existingGallery = is_array($decoded) ? $decoded : [];
                }
            }
            
            // Delete all existing gallery images
            foreach ($existingGallery as $oldImage) {
                if (Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            
            // Store new gallery images
            $paths = [];
            foreach ($request->file('gallery_images') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $paths[] = '/storage/' . $path;
            }
            
            // Store paths as array instead of JSON
            $data['gallery_images'] = $paths;
        }

        $project->update($data);

        $project->refresh(); // important!

        return $this->success(new ProjectResource($project), 'Project updated');
    } catch (\Exception $e) {
        return $this->error('Failed to update project: ' . $e->getMessage(), 500);
    }
}

}
