
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'select' 
  | 'multiselect'
  | 'checkbox' 
  | 'switch'
  | 'date'
  | 'file';

export interface Option {
  label: string;
  value: string;
}

export interface FormFieldProps {
  type: FieldType;
  id: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Option[];
  value: any;
  onChange: (value: any) => void;
  error?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  id,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  options = [],
  value,
  onChange,
  error,
  className,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    onChange(value);
  };

  const handleMultiSelectChange = (selectedValue: string) => {
    // Initialize value as array if it's not
    const currentValues = Array.isArray(value) ? [...value] : [];
    
    // Check if value is already selected
    if (currentValues.includes(selectedValue)) {
      // Remove value if already selected
      onChange(currentValues.filter(v => v !== selectedValue));
    } else {
      // Add value if not selected
      onChange([...currentValues, selectedValue]);
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    const updatedValues = Array.isArray(value) 
      ? value.filter(item => item !== itemToRemove)
      : [];
    onChange(updatedValues);
  };

  const handleCheckboxChange = (checked: boolean) => {
    onChange(checked);
  };

  const handleSwitchChange = (checked: boolean) => {
    onChange(checked);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <Input
            type={type}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            value={value || ''}
            onChange={handleInputChange}
            className={cn(error && 'border-red-500')}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            id={id}
            disabled={disabled}
            value={value || ''}
            onChange={handleInputChange}
            className={cn(error && 'border-red-500')}
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            value={value || ''}
            onChange={handleInputChange}
            className={cn(error && 'border-red-500')}
          />
        );
      case 'select':
        return (
          <Select
            disabled={disabled}
            value={value || ''}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className={cn(error && 'border-red-500')}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value || '_empty_'}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'multiselect':
        return (
          <div className="space-y-2">
            <Select
              disabled={disabled}
              onValueChange={handleMultiSelectChange}
            >
              <SelectTrigger className={cn(error && 'border-red-500')}>
                <SelectValue placeholder={placeholder || "Select options..."} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value || `_empty_${option.label}`}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Selected items display */}
            {Array.isArray(value) && value.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {value.map((item: string) => {
                  const option = options.find(opt => opt.value === item);
                  return (
                    <Badge key={item} variant="secondary" className="flex items-center gap-1">
                      {option?.label || item}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => handleRemoveItem(item)}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={id}
              checked={value || false}
              onCheckedChange={handleCheckboxChange}
              disabled={disabled}
            />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {placeholder}
            </label>
          </div>
        );
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={id}
              checked={value || false}
              onCheckedChange={handleSwitchChange}
              disabled={disabled}
            />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {placeholder}
            </label>
          </div>
        );
      case 'file':
        return (
          <Input
            type="file"
            id={id}
            disabled={disabled}
            onChange={handleFileChange}
            className={cn(error && 'border-red-500')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
