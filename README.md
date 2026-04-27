# FitCV

**Tailor your CV to every job application in seconds.**

FitCV is an AI-powered CV generator that adapts your professional experience to match specific job requirements. Instead of manually rewriting your CV for each application, simply paste the job description and let AI create a perfectly tailored version that highlights your most relevant skills and experiences.

FitCV solves the time-consuming problem of customizing your CV for different roles while maintaining accuracy and professionalism.

---

## Why FitCV?

Job hunting is exhausting. You know you're qualified, but your generic CV doesn't always reflect how well you fit a specific role. Recruiters spend seconds scanning CVs, and if yours doesn't immediately match their requirements, it's overlooked.

**The problem:** Manually tailoring your CV for each application takes hours. You need to:
- Rewrite your summary to match the job description
- Emphasize relevant experiences and downplay others
- Adjust your skills section to highlight what matters most
- Maintain consistency and professionalism across versions

**The solution:** FitCV does this automatically. You maintain your master profile with all your experiences and skills, then generate customized versions instantly for each job you apply to.

---

## Core Features

### 1. AI-Powered CV Generation
Paste any job description, and FitCV's AI analyzes the requirements to generate a CV that:
- Emphasizes your most relevant experiences
- Tailors your professional summary to the role
- Highlights skills that match the job requirements
- Maintains your authentic work history while optimizing presentation

### 2. Multiple Professional Profiles
Create different profiles for different career paths:
- **Frontend Engineer** profile for UI/UX-focused roles
- **Backend Engineer** profile for systems and API roles
- **Full-Stack Developer** profile for versatile positions

Each profile maintains its own set of experiences, skills, and professional summary, giving you flexibility without duplication.

### 3. Smart Document Generation
Beyond CVs, FitCV generates:
- **Tailored Summaries** – Professional overviews optimized for specific roles
- **Cover Letters** – Personalized letters that connect your experience to the job requirements
- **Downloadable PDFs** – Professional, print-ready documents generated instantly

### 4. Application History
Never lose track of where you've applied:
- View all your past job submissions
- See which CV version you sent to each company
- Regenerate or update documents for follow-up applications
- Track your application journey over time

### 5. Experience & Skills Management
Build your professional foundation once, use it everywhere:
- Add all your work experiences with detailed descriptions
- Categorize skills as hard skills (technical) or soft skills (interpersonal)
- Update your master profile, and all future CVs reflect the changes
- No more copy-pasting between different CV versions

---

## How It Works

1. **Create Your Profile** – Add your experiences, skills, and professional information once
2. **Paste Job Description** – Copy the job posting you're applying to
3. **Generate** – AI analyzes the requirements and creates a tailored CV
4. **Download** – Get a professional PDF ready to submit
5. **Track** – Keep a history of all your applications and generated documents

---

## App Architecture

FitCV is built with a distributed architecture designed for scalability and performance. The system separates the web application from AI processing to ensure optimal resource utilization and cost efficiency.

### System Design Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│     User's      │    │   FitCV Web     │    │    AI Model     │
│    Browser      │◄──►│  Application    │◄──►│     Server      │
│                 │    │ (EC2 t2.medium) │    │(EC2 r7i.2xlarge)│
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        
                                │                        
                                ▼                        
                       ┌─────────────────┐               
                       │                 │               
                       │   PostgreSQL    │               
                       │    Database     │               
                       │     (RDS)       │               
                       │                 │               
                       └─────────────────┘               
```

### Architecture Components

#### 1. **Web Application Server (EC2 t2.medium #1)**
- **Technology Stack**: Next.js, Node.js, Prisma
- **Responsibilities**:
  - User authentication and session management
  - Profile and experience management
  - Job submission handling
  - PDF generation and download
  - API orchestration
- **Specifications**: 
  - Instance Type: t3.medium (2 vCPU, 4GB RAM)
  - Operating System: Ubuntu 22.04 LTS
  - Load Balancer: Application Load Balancer for high availability

#### 2. **AI Model Server (EC2 Instance #2)**
- **Technology Stack**: Python, FastAPI, Qwen (Open-source LLM)
- **Responsibilities**:
  - CV content generation and tailoring
  - Cover letter creation
  - Professional summary optimization
  - Job description analysis
- **Model**: Qwen-2.5-7B-Instruct (or similar open-source model)
- **Specifications**:
  - Instance Type: r7i.2xlarge (4 vCPU, 8GB RAM, 1 GPU)
  - Operating System: Ubuntu 24.04 LTS with CUDA support

#### 3. **Database Layer (Amazon RDS)**
- **Technology**: PostgreSQL 15
- **Purpose**: 
  - User profiles and authentication data
  - Work experiences and skills
  - Job submissions and generated documents
  - Application history and analytics
- **Configuration**: Multi-AZ deployment for high availability

### Data Flow

#### CV Generation Process:
1. **User Input**: User submits job description through web interface
2. **Data Preparation**: Web app extracts user profile data from PostgreSQL
3. **AI Request**: Web app sends structured request to AI model server:
   ```json
   {
     "job_description": "...",
     "user_profile": {
       "experiences": [...],
       "skills": [...],
       "summary": "..."
     },
     "generation_type": "cv"
   }
   ```
4. **AI Processing**: Qwen model analyzes and generates tailored content
5. **Response**: AI server returns structured JSON with optimized content
6. **PDF Generation**: Web app creates PDF using React-PDF
7. **Storage**: Generated document stored in database and S3
8. **Delivery**: User downloads PDF or views in browser

### API Communication

#### Web App ↔ AI Model Server
- **Protocol**: HTTP/HTTPS REST API
- **Authentication**: API key-based authentication
- **Endpoints**:
  - `POST /api/generate/cv` - Generate tailored CV
  - `POST /api/generate/cover-letter` - Generate cover letter
  - `POST /api/generate/summary` - Generate professional summary
  - `GET /api/health` - Health check endpoint

#### Security & Performance
- **Network**: Private VPC with security groups
- **SSL/TLS**: End-to-end encryption
- **Rate Limiting**: API throttling to prevent abuse
- **Monitoring**: CloudWatch for system metrics and logging
- **Backup**: Automated daily backups of database and model artifacts

### Scalability Considerations
- **Horizontal Scaling**: Auto Scaling Groups for web servers
- **Model Scaling**: Multiple AI server instances behind load balancer
- **Caching**: Redis for session management and API response caching
- **CDN**: CloudFront for static asset delivery

This architecture ensures high availability, cost efficiency, and the ability to scale based on demand while maintaining fast response times for AI-powered CV generation.

---

## Technologies Used

FitCV is built with modern, production-ready technologies:

- **Next.js** – Full-stack React framework for seamless frontend and backend
- **PostgreSQL** – Reliable database for storing profiles and documents
- **Prisma** – Type-safe database access and migrations
- **Zustand** – Lightweight state management
- **React PDF** – Client-side PDF generation for instant downloads
- **Tailwind CSS** – Modern, responsive styling
- **Untitled UI** – Professional component library
---

## Getting Started

1. **Sign Up** – Create your account
2. **Build Your Profile** – Add your work experiences and skills
3. **Generate Your First CV** – Paste a job description and see the magic happen
4. **Download & Apply** – Get your tailored CV as a PDF

---

## Roadmap

Future enhancements planned:
- Job tracking and application management
- Interview preparation tools
- Mock interview practice
- Multi-language support
- Custom CV templates and themes

---

## About

FitCV was created to solve a real problem: the tedious process of customizing CVs for every job application. By combining AI with smart profile management, we're making job applications faster, easier, and more effective.

**Project Started:** February 2026

---

## License

This project is currently in development.
