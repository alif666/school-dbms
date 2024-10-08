# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


### STUDENT ENROLLMENT TABLE 
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(10) NOT NULL, 
    udise_code VARCHAR(15), 
    grade_class VARCHAR(10),
    section VARCHAR(10),
    student_name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(10),
    gender INT CHECK (gender IN (1, 2, 3)), -- 1: Male, 2: Female, 3: Transgender
    date_of_birth DATE,
    mother_name VARCHAR(100),
    father_name VARCHAR(100),
    guardian_name VARCHAR(100),
    aadhaar_number VARCHAR(12),
    aadhaar_name VARCHAR(100),
    address TEXT,
    pincode VARCHAR(6),
    mobile_number VARCHAR(15),
    alternate_mobile VARCHAR(15),
    email VARCHAR(100),
    mother_tongue VARCHAR(50),
    social_category INT CHECK (social_category IN (1, 2, 3, 4)), -- 1: General, 2: SC, 3: ST, 4: OBC
    minority_group INT CHECK (minority_group IN (1, 2, 3, 4, 5, 6, 7)), -- 1: Muslim, 2: Christian, etc.
    bpl_beneficiary BOOLEAN,
    antyodaya_aay BOOLEAN,
    ews_disadvantaged BOOLEAN,
    cwsn BOOLEAN,
    impairment_type INT,
    is_indian BOOLEAN,
    out_of_school_child BOOLEAN,
    mainstreamed INT, -- 1: In current academic year, 2: Earlier AC Year
    admission_number VARCHAR(15),
    admission_date DATE,
    stream_opted INT, -- For Higher Secondary (Art-1, Science-2, etc.)
    previous_school_status INT, -- 1: Current school, 2: Other school
    previous_class VARCHAR(10),
    previous_exam_status INT, -- 1: Appeared, 2: Not Appeared
    exam_result INT, -- 1: Promoted/Passed, etc.
    exam_percentage NUMERIC(5, 2),
    attendance_last_year INT,
    facilities JSONB, -- to store multiple facility values (textbook, uniform, transport, etc.)
    scholarships JSONB, -- to store scholarship information as a JSON object
    extracurricular JSONB, -- JSON for extra-curricular activities, gifted areas, etc.
    vocational_course BOOLEAN,
    vocational_sector VARCHAR(100),
    vocational_job_role VARCHAR(100),
    vocational_theory_hours INT,
    vocational_practical_hours INT,
    vocational_training_hours INT,
    vocational_field_visits INT,
    vocational_exam_status INT, -- 1: Passed, 2: Not Passed
    vocational_marks NUMERIC(5, 2),
    placement_status INT, -- 1: Placed, 2: Not Placed
    apprenticeship_status INT, -- 1: Given, 2: Not Given
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- This will trigger the updated_at column to auto-update on record modification
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

