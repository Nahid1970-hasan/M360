# M360
┌─────────────────────────────────────────────────────────────────┐
│                     Multi-Step Form Flow                        │
├─────────────────────────────────────────────────────────────────┤
│  Step 1: Personal Info        Step 2: Job Details               │
│  - Full Name (required)       - Department (dropdown)           │
│  - Email (required)           - Position Title (required)       │
│  - Phone (required)           - Start Date (validation)         │
│  - Date of Birth (18+)        - Job Type (radio)                │
│  - Profile Picture (optional) - Salary (conditional)            │
│                               - Manager (department filtered)   │
│                                                                 │
│  Step 3: Skills & Preferences Step 4: Emergency Contact         │
│  - Primary Skills (3+ req)    - Contact Name (required)         │
│  - Experience per skill       - Relationship (dropdown)         │
│  - Working Hours (range)      - Phone (required)                │
│  - Remote Work (slider)       - Guardian Contact (if age < 21)  │
│  - Extra Notes (optional)                                       │
│                                                                 │
│  Step 5: Review & Submit                                        │
│  - All data displayed (read-only)                               │
│  - Confirmation checkbox (required)                             │
│  - Submit button                                                │
└─────────────────────────────────────────────────────────────────┘
.
├── app/
│   ├── layout.tsx         # Root layout for Next.js app
│   ├── page.tsx           # Main page component (where the form resides)
│   └── globals.css        # Global styles
├── components/
│   ├── form/              # Form-specific components
│   │   ├── MultiStepForm.tsx # Orchestrates the entire multi-step form
│   │   ├── steps/         # Individual step components
│   │   │   ├── Step1Personal.tsx
│   │   │   ├── Step2JobDetails.tsx
│   │   │   ├── Step3SkillsPreferences.tsx
│   │   │   ├── Step4EmergencyContact.tsx
│   │   │   └── Step5ReviewSubmit.tsx
│   │   ├── ui/            # Re-usable shadcn/ui components (if customized)
│   │   └── form-schemas.ts # Zod schemas for each step and combined
│   ├── ui/                # shadcn/ui components (e.g., Button, Input, Select, Calendar, RadioGroup, Slider, Checkbox)
│   └── NavigationButtons.tsx # Component for Next/Previous buttons
├── hooks/
│   └── useMultiStepForm.ts # Custom hook for managing step state
│   └── useAutoSave.ts      # Custom hook for auto-saving form data
│   └── useUnsavedChangesWarning.ts # Custom hook for unsaved changes warning
├── lib/
│   ├── utils.ts           # Utility functions (e.g., cn for tailwind-merge)
│   └── data.ts            # Mock data for managers and skills
├── types/
│   └── form-types.ts      # TypeScript interfaces for form data
├── public/                # Static assets
└── tsconfig.json          # TypeScript configuration
└── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.js         # Next.js configuration
