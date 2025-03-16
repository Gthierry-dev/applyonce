
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FormField, { FieldType, Option } from './FormField';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldConfig[];
}

export interface FormFieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Option[];
}

export interface DynamicFormProps {
  title: string;
  description?: string;
  sections: FormSection[];
  onSubmit: (formData: Record<string, any>) => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  onCancel?: () => void;
  className?: string;
  loading?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  description,
  sections,
  onSubmit,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  onCancel,
  className,
  loading = false,
}) => {
  // Initialize form values with empty state
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(0);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error for this field if it exists
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Only validate fields in the current section
    sections[currentSection].fields.forEach((field) => {
      if (field.required) {
        const value = formValues[field.id];
        if (value === undefined || value === null || value === '') {
          newErrors[field.id] = 'This field is required';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        onSubmit(formValues);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const currentSectionData = sections[currentSection];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-6">
            {sections.length > 1 && (
              <div className="flex items-center space-x-2 mb-6">
                {sections.map((section, index) => (
                  <React.Fragment key={section.id}>
                    <div
                      className={cn(
                        "flex-1 h-1 rounded",
                        index <= currentSection ? "bg-primary" : "bg-secondary"
                      )}
                    ></div>
                    {index < sections.length - 1 && (
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium",
                          index + 1 <= currentSection
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {index + 1}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            <div className="space-y-2 mb-6">
              <h3 className="font-medium text-lg">{currentSectionData.title}</h3>
              {currentSectionData.description && (
                <p className="text-sm text-muted-foreground">{currentSectionData.description}</p>
              )}
            </div>

            <div className="space-y-4">
              {currentSectionData.fields.map((field) => (
                <FormField
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  description={field.description}
                  required={field.required}
                  options={field.options}
                  value={formValues[field.id] || ''}
                  onChange={(value) => handleFieldChange(field.id, value)}
                  error={errors[field.id]}
                />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
                {cancelButtonText}
              </Button>
            )}
            {currentSection > 0 && (
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={loading}>
                Previous
              </Button>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : currentSection < sections.length - 1 ? 'Next' : submitButtonText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DynamicForm;
