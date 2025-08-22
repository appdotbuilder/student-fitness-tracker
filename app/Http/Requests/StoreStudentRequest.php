<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:10|max:30',
            'height' => 'required|numeric|min:100|max:250',
            'weight' => 'required|numeric|min:30|max:150',
            'running_time' => 'required|numeric|min:5|max:30',
            'sit_ups' => 'required|integer|min:0|max:100',
            'push_ups' => 'required|integer|min:0|max:100',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Student name is required.',
            'age.required' => 'Age is required.',
            'age.min' => 'Age must be at least 10 years old.',
            'age.max' => 'Age must not exceed 30 years old.',
            'height.required' => 'Height is required.',
            'height.min' => 'Height must be at least 100 cm.',
            'height.max' => 'Height must not exceed 250 cm.',
            'weight.required' => 'Weight is required.',
            'weight.min' => 'Weight must be at least 30 kg.',
            'weight.max' => 'Weight must not exceed 150 kg.',
            'running_time.required' => 'Running time is required.',
            'running_time.min' => 'Running time must be at least 5 minutes.',
            'running_time.max' => 'Running time must not exceed 30 minutes.',
            'sit_ups.required' => 'Number of sit-ups is required.',
            'sit_ups.min' => 'Sit-ups count cannot be negative.',
            'sit_ups.max' => 'Sit-ups count must not exceed 100.',
            'push_ups.required' => 'Number of push-ups is required.',
            'push_ups.min' => 'Push-ups count cannot be negative.',
            'push_ups.max' => 'Push-ups count must not exceed 100.',
        ];
    }
}