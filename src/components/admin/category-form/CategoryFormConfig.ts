
import { FormSection } from '@/components/forms/DynamicForm';

// Form configuration for category creation
export const categorySections: FormSection[] = [
  {
    id: 'basic',
    title: 'Category Information',
    description: 'Create a new opportunity category',
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter category title',
        required: true,
      },
      {
        id: 'description',
        type: 'textarea',
        label: 'Description',
        placeholder: 'Short description of this category',
        required: true,
      },
      {
        id: 'icon_name',
        type: 'select',
        label: 'Icon',
        required: true,
        options: [
          { label: 'Graduation Cap', value: 'GraduationCap' },
          { label: 'Briefcase', value: 'Briefcase' },
          { label: 'Award', value: 'Award' },
          { label: 'Globe', value: 'Globe' },
          { label: 'Banknote', value: 'banknote' },
          { label: 'Trophy', value: 'trophy' },
          { label: 'Building', value: 'Building' },
          { label: 'Lightbulb', value: 'Lightbulb' },
          { label: 'Users', value: 'Users' },
          { label: 'HeartHandshake', value: 'HeartHandshake' },
          { label: 'PenTool', value: 'PenTool' },
        ],
      },
      {
        id: 'color',
        type: 'select',
        label: 'Color',
        required: true,
        options: [
          { label: 'Blue', value: 'bg-blue-100' },
          { label: 'Green', value: 'bg-green-100' },
          { label: 'Purple', value: 'bg-purple-100' },
          { label: 'Yellow', value: 'bg-yellow-100' },
          { label: 'Red', value: 'bg-red-100' },
          { label: 'Indigo', value: 'bg-indigo-100' },
          { label: 'Orange', value: 'bg-orange-100' },
          { label: 'Pink', value: 'bg-pink-100' },
          { label: 'Teal', value: 'bg-teal-100' },
        ],
      },
      {
        id: 'count',
        type: 'number',
        label: 'Opportunity Count',
        placeholder: 'Number of opportunities',
        required: false,
      },
    ],
  },
];
