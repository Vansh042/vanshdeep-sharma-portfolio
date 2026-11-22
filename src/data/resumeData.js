export const PERSONAL_INFO = {
  name: "Vanshdeep Sharma",
  title: "Computer Science Engineering Student | Aspiring Software Developer | Python Developer | Data Science & AI Enthusiast",
  specialization: "B.Tech CSE (Artificial Intelligence & Data Science)",
  experienceLevel: "Fresher / Final-Year Undergraduate Student (2023 – 2027)",
  college: "Chandigarh Group of Colleges (CGC), Landran, Mohali, Punjab",
  location: "Behlana, UT Chandigarh (160003) / Punjab, India",
  email: "vanshdeep042@gmail.com",
  phone: "+91 7814438015",
  linkedin: "https://www.linkedin.com/in/vanshdeep-sharma-a08747215",
  github: "https://github.com/Vansh042",
  availability: "Open to Opportunities",
  objective: "Seeking internship and entry-level opportunities in Software Development, Python Development, Data Analytics, Artificial Intelligence, and Machine Learning."
};

export const TYPING_ROLES = [
  "Python Developer",
  "Software Developer",
  "Data Science Enthusiast",
  "AI/ML Learner"
];

export const CAREER_TRACKS = [
  {
    track: "Track 1: AI / ML & Data Science",
    skills: ["Python", "SQL", "C++", "Scikit-Learn (Logistic Regression, Random Forest, Naive Bayes)", "NLTK", "TF-IDF", "Google Gemini API (google-genai)", "Pydantic", "Streamlit", "Gradio", "Pandas", "NumPy", "AWS Cloud"],
    repos: ["Phishing Email Detection System", "AI Property Video Generator", "Instagram NLP Image & Metadata Classifier"]
  },
  {
    track: "Track 2: Data Analyst & BI",
    skills: ["SQL (Joins, CTEs, Window Queries, MySQL/SQLite)", "MS Excel (VLOOKUP/XLOOKUP, Pivot Tables)", "Power BI (DAX Basics, KPI Dashboards)", "Python (Pandas, NumPy, Matplotlib, Seaborn)", "EDA", "Statistics"],
    repos: ["Circadian-Metabolic Health Platform", "Phishing Email Detection System", "Instagram NLP Image & Metadata Classifier"]
  },
  {
    track: "Track 3: Software Engineer / Full-Stack",
    skills: ["Python", "C", "C++", "JavaScript (ES6+)", "React.js", "Node.js", "SQL", "HTML5", "CSS3", "DSA", "OOP", "REST APIs", "Pydantic", "Streamlit", "Gradio", "Automated Unit/System Testing", "Git", "GitHub", "AWS"],
    repos: ["Phishing Email Detection System", "AI Property Video Generator", "Circadian-Metabolic Health Platform"]
  },
  {
    track: "Track 4: QA / Software Testing & SDET",
    skills: ["Unit, Integration, System & UAT Testing", "Test Case Design", "Boundary & Negative Testing", "Bug Reporting", "Python Test Scripting", "Pydantic JSON Schema Validation", "SQL Data Integrity Testing", "HTML/CSS/JS DOM Inspection"],
    repos: ["Phishing Email Detection System (27 Test Cases)", "AI Property Video Generator", "Circadian-Metabolic Health Platform"]
  },
  {
    track: "Track 5: ADM, App Support & Cloud/IT Infra",
    skills: ["AWS Academy Cloud Operations", "Linux & Windows OS Administration", "CLI Troubleshooting", "Application Maintenance", "Deployment & Log Root-Cause Analysis", "Incident Triage & SLA Tracking", "SQL & Python Automation"],
    repos: ["AI Property Video Generator", "Circadian-Metabolic Health Platform", "Phishing Email Detection System"]
  },
  {
    track: "Track 6: Cybersecurity, SOC Analyst L1 & Cloud Security",
    skills: ["Phishing & Malicious URL Detection", "Alert Triage & Log Analysis", "AWS IAM/VPC/Security Groups/CloudWatch", "Linux/Windows Hardening", "Regex Payload Sanitization", "Python Security Scripting", "SQLite Data Privacy"],
    repos: ["Phishing Email Detection System", "Instagram NLP Image & Metadata Classifier", "Circadian-Metabolic Health Platform"]
  },
  {
    track: "Track 7: Business Analyst (BA), Product Ops & APM",
    skills: ["Requirement Gathering (BRDs, PRDs, User Stories)", "KPI & Funnel Metrics", "Cohort Analysis", "SQL", "MS Excel (XLOOKUP, Pivot Tables, MIS)", "Power BI Dashboards", "UAT Coordination", "AI Product Prototyping"],
    repos: ["Circadian-Metabolic Health Platform", "AI Property Video Generator", "Phishing Email Detection System"]
  },
  {
    track: "Track 8: Implementation, Solutions & AI/RPA Automation",
    skills: ["REST API Integrations", "Pydantic JSON Schema Validation", "Client Data Onboarding & SQL ETL", "Prompt Engineering & LLM Orchestration (Gemini API)", "Voice AI Workflows", "RPA & CRM/ERP Technical Configuration"],
    repos: ["AI Property Video Generator", "Circadian-Metabolic Health Platform", "Phishing Email Detection System"]
  }
];

export const PROJECTS = [
  {
    id: "proj-health",
    title: "Circadian-Metabolic Health Platform (Cardiac & Metabolic Readiness System)",
    status: "Completed",
    categories: ["Python", "Data Analytics", "Web Development"],
    problem: "Wearable health sensor exports and regional nutrition references exist in fragmented formats, making unified circadian and cardiac-metabolic readiness monitoring difficult.",
    description: "Full-stack local web application (Python, Streamlit, SQLite) and Pandas ETL pipeline harmonizing 15+ wearable sensor datasets and Indian nutrition tables (indianfoods.xlsx) with interactive health indicator visualizations and automated weekly PDF reports.",
    tech: ["Python", "Streamlit", "Pandas", "SQLite", "Data Visualization", "Automated PDF Reporting"],
    features: [
      "Pandas ETL pipeline harmonizing 15+ heterogeneous wearable health and sensor datasets",
      "Integrated Indian dietary nutrition database (indianfoods.xlsx) for metabolic correlation",
      "Interactive Streamlit dashboard tracking cardiac & metabolic readiness indicators",
      "Automated weekly PDF summary generation backed by local SQLite storage"
    ],
    github: "https://github.com/Vansh042/Circadian-Metabolic-Health-Platform"
  },
  {
    id: "proj-phishing",
    title: "Phishing Email Detection System",
    status: "Completed",
    categories: ["Python", "AI/ML", "Data Analytics"],
    problem: "Sophisticated phishing emails frequently bypass static rule filters, requiring an accurate, modular NLP classification system with rigorous quality assurance.",
    description: "Modular 4-file Python system (preprocess.py, train.py, predict.py, ui.py) using Scikit-Learn, NLTK, and 5,000 unigram/bigram TF-IDF features across ~10,000 emails, achieving 97.3% accuracy and 0.99 ROC-AUC.",
    tech: ["Python", "Scikit-Learn", "NLTK", "TF-IDF", "Streamlit", "27 Automated QA Tests"],
    features: [
      "Decoupled 4-file architecture separating preprocessing, training, inference, and UI",
      "Trained across ~10,000 emails with 5,000 unigram/bigram TF-IDF features (97.3% accuracy, 0.99 ROC-AUC)",
      "Verified across 27 automated Unit, Integration, System, and UAT test cases",
      "Defensive exception handling for malformed inputs, missing datasets, and corrupted model artifacts"
    ],
    github: "https://github.com/Vansh042/Phishing-Email-Detection-System"
  },
  {
    id: "proj-video",
    title: "AI Property Video Generator",
    status: "Completed",
    categories: ["Python", "AI/ML", "Web Development"],
    problem: "Producing narrated promotional videos from raw real-estate listing metadata and photos is manual, slow, and prone to external binary rendering failures.",
    description: "Automated multimodal GenAI pipeline (CLI + Gradio web UI) converting property metadata and photos into narrated MP4 promo videos using Google Gemini 2.5 Flash API and Pydantic structured JSON validation.",
    tech: ["Python", "Google Gemini 2.5 Flash API", "Pydantic", "Gradio", "Pillow (PIL)", "MoviePy", "gTTS"],
    features: [
      "Multimodal script & scene generation via Google Gemini 2.5 Flash API (google-genai)",
      "Strict Pydantic JSON schema validation guaranteeing structured prompt outputs",
      "Eliminated external ImageMagick binary failures by re-engineering caption overlays in pure Python (Pillow/PIL)",
      "Synchronized MoviePy video assembly and gTTS narration accessible via CLI and Gradio UI"
    ],
    github: "https://github.com/Vansh042/real-estate-video-generator"
  },
  {
    id: "proj-instagram",
    title: "Instagram NLP Image & Metadata Classifier",
    status: "Completed",
    categories: ["Python", "AI/ML", "Data Analytics"],
    problem: "Public social media hashtag feeds contain deeply nested JSON payloads heavily polluted with promotional spam alongside genuine user content.",
    description: "Text-based NLP classification pipeline separating genuine food posts from spam over deeply nested Instagram JSON metadata (pavbhaji.json) using Regex cleaning, 1–3 n-gram TF-IDF, and Logistic Regression.",
    tech: ["Python", "Scikit-Learn", "Logistic Regression", "TF-IDF (1–3 n-grams)", "Regex", "JSON ETL"],
    features: [
      "Automated parser traversing deeply nested Instagram JSON metadata (pavbhaji.json)",
      "Regex payload sanitization stripping noisy symbols, URLs, and malformed tags",
      "1–3 n-gram TF-IDF feature extraction paired with Logistic Regression classification",
      "Actionable spam vs. genuine content triage metrics for analytics workflows"
    ],
    github: "https://github.com/Vansh042/Instagram-NLP-Image-and-Metadata-Classifier"
  },
  {
    id: "proj-amazon",
    title: "Amazon E-Commerce Website Clone",
    status: "Completed",
    categories: ["Web Development"],
    problem: "Replicating complex multi-category e-commerce product layouts, responsive navigation bars, and interactive client-side UI flows using core web standards.",
    description: "Frontend e-commerce website built with HTML5, CSS3, and JavaScript featuring responsive product discovery grids, promotional banners, interactive cart interactions, and clean component styling.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "DOM Manipulation"],
    features: [
      "Responsive product catalog grid and category navigation header",
      "Interactive UI elements for product filtering and cart state preview",
      "Cross-device layout compatibility across desktop, tablet, and mobile viewports"
    ],
    github: "https://github.com/Vansh042"
  },
  {
    id: "proj-future-slot",
    title: "Upcoming Project Slot: Enterprise SQL & Power BI Cohort Analytics",
    status: "Planned",
    categories: ["Data Analytics", "Python"],
    problem: "Editable placeholder slot reserved for upcoming Data Analytics, Python Development, and Machine Learning case studies.",
    description: "Planned analytics benchmark combining SQL window queries, Python Pandas cohort retention modeling, and interactive Power BI executive KPI dashboards.",
    tech: ["SQL", "Python", "Pandas", "Power BI", "MS Excel"],
    features: [
      "Clearly marked as a planned project placeholder (zero fabricated claims)",
      "Ready to be updated in src/data/resumeData.js as new projects are completed"
    ],
    github: "https://github.com/Vansh042"
  }
];

export const CERTIFICATIONS = [
  {
    title: "AWS Academy Graduate — Cloud Operations & Generative AI Foundations",
    issuer: "Amazon Web Services (AWS Academy)",
    date: "Verified Graduate",
    skills: "AWS Cloud Operations, IAM, VPC, CloudWatch, Generative AI Foundations",
    link: "https://www.linkedin.com/in/vanshdeep-sharma-a08747215"
  },
  {
    title: "AI First Software Engineering Certificate",
    issuer: "Technical Certification Program",
    date: "Completed",
    skills: "AI-Assisted Software Engineering, Modular Design, Automated Verification",
    link: "https://www.linkedin.com/in/vanshdeep-sharma-a08747215"
  },
  {
    title: "Infosys Prompt Engineering Certificate",
    issuer: "Infosys Springboard",
    date: "Completed",
    skills: "LLM Prompt Design, Structured Output Orchestration, GenAI Workflows",
    link: "https://www.linkedin.com/in/vanshdeep-sharma-a08747215"
  },
  {
    title: "Cisco Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "Completed",
    skills: "Data Transformation, Exploratory Data Analysis, SQL & BI Fundamentals",
    link: "https://www.linkedin.com/in/vanshdeep-sharma-a08747215"
  },
  {
    title: "Python for Data Analysis (Pandas & NumPy)",
    issuer: "Data Science Certification",
    date: "Completed",
    skills: "Pandas DataFrames, NumPy Vectorization, Data Cleaning & Aggregation",
    link: "https://github.com/Vansh042"
  },
  {
    title: "IBM ML0101EN: Machine Learning with Python",
    issuer: "IBM / Cognitive Class",
    date: "Completed",
    skills: "Classification, Regression, Clustering, Scikit-Learn Evaluation Metrics",
    link: "https://www.linkedin.com/in/vanshdeep-sharma-a08747215"
  }
];
