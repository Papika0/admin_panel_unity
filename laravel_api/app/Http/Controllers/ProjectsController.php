<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
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

    public function update(UpdateProjectsRequest $request, $id)
{
    try {
        $project = Projects::findOrFail($id);
        $data    = $request->validated();

        // handle single images
        if ($request->hasFile('main_image')) {
            $data['main_image'] = $request->file('main_image')
                                        ->store('projects/main', 'public');
        }
        if ($request->hasFile('render_image')) {
            $data['render_image'] = $request->file('render_image')
                                          ->store('projects/renders', 'public');
        }

        // handle gallery
        if ($request->hasFile('gallery_images')) {
            $paths = [];
            foreach ($request->file('gallery_images') as $file) {
                $paths[] = $file->store('projects/gallery', 'public');
            }
            $data['gallery_images'] = $paths;
        }

        $project->update($data);
        return $this->success(new ProjectResource($project), 'Project updated');
    } catch (\Exception $e) {
        return $this->error('Failed to update project', 500);
    }
}
}
