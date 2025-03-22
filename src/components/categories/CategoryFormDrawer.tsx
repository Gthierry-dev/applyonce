
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import DynamicForm, { FormSection } from '@/components/forms/DynamicForm';
import { useToast } from '@/hooks/use-toast';

interface CategoryFormDrawerProps {
  categoryName: string;
  categoryIcon: React.ReactNode;
  trigger?: React.ReactNode;
}

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  categoryName,
  categoryIcon,
  trigger
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // Form sections for a multi-step form
  const formSections: FormSection[] = [
    {
      id: "basic-info",
      title: "Basic Information",
      description: "Let's start with some essential information",
      fields: [
        {
          id: "fullName",
          type: "text",
          label: "Full Name",
          placeholder: "Enter your full name",
          required: true,
        },
        {
          id: "dateOfBirth",
          type: "date",
          label: "Date of Birth",
          required: true,
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          placeholder: "your.email@example.com",
          required: true,
        },
        {
          id: "phoneNumber",
          type: "text",
          label: "Phone Number",
          placeholder: "+1 (555) 123-4567",
          required: true,
        },
        {
          id: "address",
          type: "textarea",
          label: "Address",
          placeholder: "Enter your full address",
          required: true,
        },
        {
          id: "nationality",
          type: "text",
          label: "Nationality",
          required: true,
        },
        {
          id: "workAuthorization",
          type: "select",
          label: "Work Authorization",
          required: true,
          options: [
            { label: "US Citizen", value: "usCitizen" },
            { label: "Green Card Holder", value: "greenCard" },
            { label: "Work Visa", value: "workVisa" },
            { label: "Need Visa Sponsorship", value: "needSponsorship" }
          ]
        }
      ]
    },
    {
      id: "professional-details",
      title: "Professional Details",
      description: "Tell us about your professional background",
      fields: [
        {
          id: "currentJobStatus",
          type: "select",
          label: "Current Job Status",
          required: true,
          options: [
            { label: "Employed", value: "employed" },
            { label: "Unemployed", value: "unemployed" },
            { label: "Student", value: "student" },
            { label: "Freelancer", value: "freelancer" }
          ]
        },
        {
          id: "desiredJobTitles",
          type: "textarea",
          label: "Desired Job Titles",
          placeholder: "List preferred job roles (separated by commas)",
          required: true,
        },
        {
          id: "preferredWorkType",
          type: "select",
          label: "Preferred Work Type",
          required: true,
          options: [
            { label: "Full-time", value: "fullTime" },
            { label: "Part-time", value: "partTime" },
            { label: "Remote", value: "remote" },
            { label: "Freelance", value: "freelance" },
            { label: "Internship", value: "internship" }
          ]
        },
        {
          id: "preferredLocations",
          type: "textarea",
          label: "Preferred Job Locations",
          placeholder: "List cities, countries, or 'Remote' (separated by commas)",
          required: true,
        },
        {
          id: "salaryExpectations",
          type: "text",
          label: "Salary Expectations",
          placeholder: "e.g., $50,000 - $70,000",
        }
      ]
    },
    {
      id: "skills-expertise",
      title: "Skills & Expertise",
      description: "Share your skills and qualifications",
      fields: [
        {
          id: "hardSkills",
          type: "textarea",
          label: "Hard Skills",
          placeholder: "e.g., Programming languages, Marketing, Data Analysis (separated by commas)",
          required: true,
        },
        {
          id: "softSkills",
          type: "textarea",
          label: "Soft Skills",
          placeholder: "e.g., Leadership, Communication, Teamwork (separated by commas)",
          required: true,
        },
        {
          id: "certifications",
          type: "textarea",
          label: "Certifications & Courses",
          placeholder: "e.g., Google Analytics Certification, AWS Certified Developer",
        },
        {
          id: "languages",
          type: "textarea",
          label: "Languages Spoken",
          placeholder: "e.g., English (Fluent), Spanish (Intermediate)",
        }
      ]
    },
    {
      id: "education",
      title: "Education & Qualifications",
      description: "Tell us about your educational background",
      fields: [
        {
          id: "highestDegree",
          type: "select",
          label: "Highest Degree Attained",
          required: true,
          options: [
            { label: "High School", value: "highSchool" },
            { label: "Associate's", value: "associates" },
            { label: "Bachelor's", value: "bachelors" },
            { label: "Master's", value: "masters" },
            { label: "Doctorate", value: "doctorate" },
            { label: "Other", value: "other" }
          ]
        },
        {
          id: "institution",
          type: "text",
          label: "Institution Name",
          placeholder: "Enter your school/university name",
          required: true,
        },
        {
          id: "fieldOfStudy",
          type: "text",
          label: "Field of Study",
          placeholder: "e.g., Computer Science, Business Administration",
          required: true,
        },
        {
          id: "graduationYear",
          type: "text",
          label: "Graduation Year",
          placeholder: "e.g., 2020",
          required: true,
        },
        {
          id: "gpa",
          type: "text",
          label: "GPA",
          placeholder: "e.g., 3.8/4.0",
        }
      ]
    },
    {
      id: "work-experience",
      title: "Work Experience",
      description: "Share your most recent work experience",
      fields: [
        {
          id: "jobTitle",
          type: "text",
          label: "Job Title",
          placeholder: "e.g., Software Engineer",
          required: true,
        },
        {
          id: "companyName",
          type: "text",
          label: "Company Name",
          placeholder: "e.g., Google, Inc.",
          required: true,
        },
        {
          id: "employmentPeriod",
          type: "text",
          label: "Employment Period",
          placeholder: "e.g., January 2020 - Present",
          required: true,
        },
        {
          id: "responsibilities",
          type: "textarea",
          label: "Key Responsibilities",
          placeholder: "Describe your main responsibilities",
          required: true,
        },
        {
          id: "achievements",
          type: "textarea",
          label: "Achievements & Impact",
          placeholder: "e.g., Increased sales by 20%, Led a team of 10 people",
        }
      ]
    },
    {
      id: "additional-uploads",
      title: "Resume & Additional Documents",
      description: "Upload your resume and other relevant documents",
      fields: [
        {
          id: "resume",
          type: "file",
          label: "Resume/CV",
          required: true,
        },
        {
          id: "coverLetter",
          type: "file",
          label: "Cover Letter",
        },
        {
          id: "portfolio",
          type: "text",
          label: "Portfolio URL",
          placeholder: "e.g., https://yourportfolio.com",
        },
        {
          id: "linkedIn",
          type: "text",
          label: "LinkedIn Profile",
          placeholder: "e.g., https://linkedin.com/in/yourname",
        },
        {
          id: "github",
          type: "text",
          label: "GitHub Profile",
          placeholder: "e.g., https://github.com/username",
        }
      ]
    },
    {
      id: "preferences",
      title: "Additional Preferences",
      description: "Share your job application preferences",
      fields: [
        {
          id: "willingToRelocate",
          type: "select",
          label: "Willing to Relocate?",
          required: true,
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "Only to certain locations", value: "selective" }
          ]
        },
        {
          id: "jobAlertPreference",
          type: "select",
          label: "Job Alert Preferences",
          required: true,
          options: [
            { label: "Instant", value: "instant" },
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" }
          ]
        },
        {
          id: "companiesToAvoid",
          type: "textarea",
          label: "Companies to Avoid",
          placeholder: "List any companies you'd prefer not to apply to",
        },
        {
          id: "preferredCompanySize",
          type: "select",
          label: "Preferred Company Size",
          options: [
            { label: "Startup (1-50 employees)", value: "startup" },
            { label: "Small (51-200 employees)", value: "small" },
            { label: "Medium (201-1000 employees)", value: "medium" },
            { label: "Large (1001+ employees)", value: "large" },
            { label: "No preference", value: "noPreference" }
          ]
        }
      ]
    }
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    toast({
      title: "Form submitted",
      description: `Your ${categoryName} form has been submitted successfully.`,
    });
    setOpen(false);
  };

  const drawerContent = (
    <DynamicForm
      title={`${categoryName} Application`}
      description={`Complete this form to apply for opportunities in the ${categoryName} category.`}
      sections={formSections}
      onSubmit={handleSubmit}
      submitButtonText="Submit Application"
      onCancel={() => setOpen(false)}
      cancelButtonText="Cancel"
    />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger || <Button>Configure</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Configure {categoryName}</DrawerTitle>
          <DrawerDescription>Complete the form to set up your {categoryName} profile</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          {drawerContent}
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || <Button>Configure</Button>}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Configure {categoryName}</SheetTitle>
          <SheetDescription>Complete the form to set up your {categoryName} profile</SheetDescription>
        </SheetHeader>
        <div className="mt-4 pr-4">
          {drawerContent}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryFormDrawer;
