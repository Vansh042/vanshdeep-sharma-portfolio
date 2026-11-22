import React, { useState, useEffect } from 'react';
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, FolderGit2, Send,
  Sun, Moon, Award, GraduationCap, Flame, Layers, Cpu, UserCheck,
  ArrowUpRight, X, Terminal, Globe, Database, Sparkles, Wrench,
  Code2, BarChart3, BrainCircuit, ShieldCheck, Users, Trophy, GitBranch,
  CheckCircle2, ArrowUp, Menu, FileDown, Printer
} from 'lucide-react';
import { PERSONAL_INFO, TYPING_ROLES, CAREER_TRACKS, PROJECTS, CERTIFICATIONS } from './data/resumeData';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('vs_portfolio_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [skillView, setSkillView] = useState('core');
  const [selectedProject, setSelectedProject] = useState(null);
  const [pipelineTraceText, setPipelineTraceText] = useState('');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeTrack, setResumeTrack] = useState('all');
  const [toastMsg, setToastMsg] = useState('');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    roleTrack: 'Software Development Internship / Role',
    subject: '',
    message: ''
  });
  const [submittedMailto, setSubmittedMailto] = useState(null);

  // Typing animation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync theme with <html> class and localStorage
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (theme === 'light') {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
    } else {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');
    }
    try {
      localStorage.setItem('vs_portfolio_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    triggerToast(next === 'light' ? 'Switched to Light Theme' : 'Switched to Dark Theme');
  };

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? '' : prev));
    }, 3000);
  };

  // Typing effect
  useEffect(() => {
    const currentWord = TYPING_ROLES[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, displayedRole.length + 1);
        setDisplayedRole(next);
        if (next === currentWord) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        const next = currentWord.slice(0, displayedRole.length - 1);
        setDisplayedRole(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
        }
      }
    }, isDeleting ? 45 : 85);
    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(activeFilter));

  const openProjectDetails = (proj) => {
    setSelectedProject(proj);
    setPipelineTraceText(
      `[1/3] Repository: ${proj.github}
[2/3] Stack: ${proj.tech.join(', ')}
[3/3] Status: ${proj.status} — Ready for code review.`
    );
  };

  const runPipelineSimulation = () => {
    if (!selectedProject) return;
    setPipelineTraceText(`Executing verification trace...\n`);
    selectedProject.features.forEach((feat, idx) => {
      setTimeout(() => {
        setPipelineTraceText((prev) => prev + `[Step ${idx + 1}] ✓ ${feat}
`);
      }, (idx + 1) * 220);
    });
    triggerToast('Pipeline trace completed!');
  };

  const copyText = (text, label) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      triggerToast(label);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const fullSubject = `[Portfolio Inquiry - ${contactForm.roleTrack}] ${contactForm.subject}`;
    const fullBody = `Hello Vanshdeep,

${contactForm.message}

---
Sender Name: ${contactForm.name}
Sender Email: ${contactForm.email}
Opportunity Track: ${contactForm.roleTrack}`;
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(fullBody)}`;
    setSubmittedMailto({ mailto, fullBody, fullSubject, status: 'Sending directly to vanshdeep042@gmail.com...', ...contactForm });
    try {
      const res = await fetch('https://formsubmit.co/ajax/vanshdeep042@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          _replyto: contactForm.email,
          opportunity_track: contactForm.roleTrack,
          _subject: fullSubject,
          message: contactForm.message
        })
      });
      const data = await res.json();
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setSubmittedMailto({
          mailto,
          fullBody,
          fullSubject,
          status: 'Delivered directly to vanshdeep042@gmail.com! (Check Gmail inbox/spam on first run for one-time FormSubmit activation).',
          ...contactForm
        });
        triggerToast('Email sent directly to vanshdeep042@gmail.com!');
      } else {
        setSubmittedMailto({
          mailto,
          fullBody,
          fullSubject,
          status: 'Click "Open in Email App" below or confirm your one-time FormSubmit activation email in Gmail.',
          ...contactForm
        });
        triggerToast('Check status box below to complete dispatch');
      }
    } catch {
      setSubmittedMailto({
        mailto,
        fullBody,
        fullSubject,
        status: 'Click "Open in Email App" below to send via your email client.',
        ...contactForm
      });
      triggerToast('Ready to send via email app!');
    }
  };

  const fillSampleRecruiterMessage = () => {
    setContactForm({
      name: 'Ananya Mehta (Technical Recruiter)',
      email: 'ananya.mehta@techhiring.in',
      roleTrack: 'Python Developer Opportunity',
      subject: 'Interview Invitation — Python & AI Engineering Intern',
      message: 'Hi Vanshdeep, we reviewed your Phishing Email Detection System (with 27 automated test cases) and your Gemini 2.5 Flash Property Video Generator. Are you available this week for a 20-minute introductory screening call?'
    });
    triggerToast('Sample recruiter inquiry populated!');
  };

  const selectedTrackObj = resumeTrack === 'all' ? null : CAREER_TRACKS[parseInt(resumeTrack, 10)];

  return (
    <div className="min-h-screen relative selection:bg-electric/30 selection:text-cyan-200">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-electric/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-violetAccent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-cyanAccent/10 rounded-full blur-3xl"></div>
      </div>

      {/* A. Sticky Navbar */}
      <header className="theme-nav sticky top-0 z-40 w-full backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <a href="#home" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric via-indigo-500 to-cyanAccent p-[1.5px] shadow-lg shadow-electric/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-display font-bold text-sm text-white">
                VS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight theme-heading leading-none">{PERSONAL_INFO.name}</span>
              <span className="font-mono text-[11px] theme-cyan mt-1">B.Tech CSE (AI &amp; DS) '27</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium theme-body">
            <a href="#home" className="px-3 py-1.5 rounded-lg hover:text-electric transition">Home</a>
            <a href="#about" className="px-3 py-1.5 rounded-lg hover:text-electric transition">About</a>
            <a href="#skills" className="px-3 py-1.5 rounded-lg hover:text-electric transition">Skills</a>
            <a href="#projects" className="px-3 py-1.5 rounded-lg hover:text-electric transition">Projects</a>
            <a href="#education" className="px-3 py-1.5 rounded-lg hover:text-electric transition">Education</a>
            <a href="#certifications" className="px-3 py-1.5 rounded-lg hover:text-electric transition">Certifications</a>
            <a href="#experience" className="px-3 py-1.5 rounded-lg hover:text-electric transition">Activities</a>
            <a href="#contact" className="px-3 py-1.5 rounded-lg hover:text-electric transition">Contact</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-chip inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-mono hover:border-electric transition"
              aria-label="Toggle Dark or Light Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-electric" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-electric to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-electric/25 transition"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border theme-chip"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-b theme-nav px-4 pt-2 pb-4 space-y-1">
            {['home', 'about', 'skills', 'projects', 'education', 'certifications', 'experience', 'contact'].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium capitalize theme-heading hover:text-electric"
              >
                {sec}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10 bg-grid-pattern">
        {/* B. Hero Section */}
        <section id="home" className="pt-12 pb-20 md:pt-20 md:pb-28 border-b theme-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="theme-subcard inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full border">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-500">{PERSONAL_INFO.availability}</span>
                <span className="theme-muted">•</span>
                <span className="text-xs theme-body flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 theme-cyan" /> Chandigarh / Punjab, India
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight theme-heading leading-[1.12]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyanAccent to-violetAccent">Vanshdeep</span>. I Build, Analyze &amp; Innovate with Technology.
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-base sm:text-xl font-mono theme-body min-h-[2rem]">
                <span className="theme-muted">&gt;</span>
                <span>Focus:</span>
                <span className="font-semibold theme-cyan">{displayedRole}</span>
                <span className="animate-pulse theme-cyan">|</span>
              </div>

              <p className="text-base sm:text-lg theme-body leading-relaxed max-w-2xl">
                Computer Science Engineering student passionate about Python development, software engineering, data analytics, and artificial intelligence. Focused on transforming ideas into practical solutions.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => setResumeModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-electric to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-electric/25 transition"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </button>
                <a href="#projects" className="theme-chip inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border hover:border-electric transition">
                  <FolderGit2 className="w-4 h-4 theme-cyan" /> View Projects
                </a>
                <a href="#contact" className="theme-chip inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border hover:border-violetAccent transition">
                  <Send className="w-4 h-4 text-violetAccent" /> Contact Me
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-5 border-t theme-border text-sm theme-muted">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-electric transition">
                  <span className="p-2 rounded-lg border theme-chip"><Github className="w-4 h-4" /></span>
                  <span className="font-mono text-xs">github.com/Vansh042</span>
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-electric transition">
                  <span className="p-2 rounded-lg border theme-chip text-blue-500"><Linkedin className="w-4 h-4" /></span>
                  <span className="font-mono text-xs">in/vanshdeep-sharma</span>
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-2 hover:text-electric transition">
                  <span className="p-2 rounded-lg border theme-chip theme-cyan"><Mail className="w-4 h-4" /></span>
                  <span className="font-mono text-xs">{PERSONAL_INFO.email}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="theme-card rounded-2xl border p-6">
                <div className="flex items-center justify-between pb-4 mb-5 border-b theme-border">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 font-mono text-xs theme-muted">profile_vanshdeep.py</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-electric/15 text-electric border border-electric/30">Fresher / B.Tech '27</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-electric via-indigo-600 to-cyanAccent p-[2px] shadow-lg shrink-0">
                    <div className="w-full h-full rounded-[14px] bg-slate-950 flex flex-col items-center justify-center text-center p-2">
                      <span className="font-display font-extrabold text-2xl text-white">VS</span>
                      <span className="font-mono text-[10px] text-cyan-300 mt-0.5">AI &amp; DS</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left space-y-1.5">
                    <h2 className="font-display font-bold text-xl theme-heading">{PERSONAL_INFO.name}</h2>
                    <p className="text-xs font-mono theme-cyan">{PERSONAL_INFO.specialization}</p>
                    <p className="text-xs theme-muted">{PERSONAL_INFO.college}</p>
                    <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-1.5">
                      {['Python', 'SQL', 'Scikit-Learn', 'GenAI'].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded border text-[11px] font-mono theme-chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="theme-subcard rounded-xl border p-4 font-mono text-xs space-y-2">
                  <div className="flex justify-between gap-2">
                    <span className="theme-muted">degree:</span>
                    <span className="text-emerald-500 font-semibold">"B.Tech AI &amp; DS (2023–2027)"</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="theme-muted">core_stack:</span>
                    <span className="theme-cyan font-semibold">["Python", "SQL", "React", "ML"]</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="theme-muted">verified_repos:</span>
                    <span className="text-violetAccent font-semibold">4 End-to-End Systems</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="theme-muted">hackathons:</span>
                    <span className="text-amber-500 font-semibold">SIH '23 (L2), '24 &amp; '25 Coord.</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="theme-muted">status:</span>
                    <span className="text-emerald-500 font-semibold">"Open to Internships &amp; FTE"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* C. About Me Section */}
        <section id="about" className="py-20 border-b theme-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric font-mono text-xs mb-3">
                <UserCheck className="w-3.5 h-3.5" /> <span>01 / ABOUT ME</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold theme-heading tracking-tight">
                Engineering Mindset Grounded in Practical Execution
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <div className="theme-card rounded-2xl border p-6 sm:p-8 space-y-4 theme-body leading-relaxed">
                  <p>
                    I am a final-year <strong className="theme-heading font-semibold">Bachelor of Technology (B.Tech) undergraduate in Computer Science Engineering (Artificial Intelligence &amp; Data Science)</strong> at <strong className="theme-heading font-semibold">Chandigarh Group of Colleges (CGC), Landran, Mohali</strong> (2023–2027).
                  </p>
                  <p>
                    My primary technical strength lies in <strong className="theme-cyan font-semibold">Python programming, modular software design, and data-driven problem solving</strong>—verified across 27 automated Unit, Integration, System, and UAT test cases in my Phishing Detection System and 15+ harmonized wearable health datasets in my Circadian-Metabolic Health Platform.
                  </p>
                  <div className="theme-subcard mt-6 p-4 rounded-xl border-l-4 border-electric">
                    <div className="text-xs font-mono uppercase tracking-wider text-electric mb-1">Career Objective</div>
                    <p className="text-sm theme-body">{PERSONAL_INFO.objective}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {[
                  { icon: Code2, title: 'Modular Python & Software Architecture', desc: 'Decoupling preprocessing, training, inference, and UI layers (Streamlit, Gradio, React.js, REST APIs).' },
                  { icon: BarChart3, title: 'Data Analytics & ETL Pipelines', desc: 'Harmonizing multi-source datasets using Pandas, NumPy, SQL (CTEs, Joins, Window Queries), MS Excel, and Power BI.' },
                  { icon: BrainCircuit, title: 'Applied AI, NLP & GenAI Workflows', desc: 'Building classification pipelines (Scikit-Learn, TF-IDF, NLTK) and Google Gemini API workflows with Pydantic validation.' },
                  { icon: ShieldCheck, title: 'Verification & Defensive Testing', desc: 'Validating software across Unit, Integration, System, and UAT test cases with clean exception handling.' }
                ].map((item, idx) => (
                  <div key={idx} className="theme-card rounded-xl border p-5 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-electric/15 text-electric border border-electric/30 shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold theme-heading text-base">{item.title}</h3>
                      <p className="text-xs theme-muted mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* D. Technical Skills Section */}
        <section id="skills" className="py-20 border-b theme-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyanAccent/10 border border-cyanAccent/30 theme-cyan font-mono text-xs mb-3">
                  <Cpu className="w-3.5 h-3.5" /> <span>02 / TECHNICAL SKILLS</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold theme-heading tracking-tight">
                  Categorized Technical Stack &amp; Role Readiness
                </h2>
              </div>
              <div className="theme-subcard inline-flex p-1 rounded-xl border self-start">
                <button
                  type="button"
                  onClick={() => setSkillView('core')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${skillView === 'core' ? 'bg-electric text-white' : 'theme-muted hover:text-electric'}`}
                >
                  Core Domains (5)
                </button>
                <button
                  type="button"
                  onClick={() => setSkillView('tracks')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${skillView === 'tracks' ? 'bg-electric text-white' : 'theme-muted hover:text-electric'}`}
                >
                  8-Track Role Matrix
                </button>
              </div>
            </div>

            {skillView === 'core' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Programming Languages', icon: Terminal, skills: ['Python (Primary)', 'SQL (MySQL / SQLite)', 'JavaScript (ES6+)', 'C / C++', 'R (Foundational)'] },
                  { title: 'Web Technologies', icon: Globe, skills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Node.js', 'Streamlit', 'Gradio Web UI', 'REST APIs'] },
                  { title: 'Data Analytics & BI', icon: Database, skills: ['Pandas & NumPy', 'Matplotlib & Seaborn', 'Data Visualization', 'SQL (Joins, CTEs, Window)', 'MS Excel (XLOOKUP, Pivots)', 'Power BI (DAX, KPIs)'] },
                  { title: 'AI & Machine Learning', icon: Sparkles, skills: ['Scikit-Learn', 'Machine Learning Fundamentals', 'Data Preprocessing', 'Classification Algorithms', 'NLP (NLTK, TF-IDF, Regex)', 'Google Gemini API', 'Pydantic Validation'] },
                  { title: 'Tools, Cloud & QA Testing', icon: Wrench, skills: ['Git & GitHub', 'VS Code', 'Jupyter Notebook', 'AWS Cloud (IAM, VPC, CloudWatch)', 'Unit, Integration, System & UAT Testing', 'Linux & Windows CLI', 'Pillow & MoviePy'] }
                ].map((cat, idx) => (
                  <div key={idx} className={`theme-card rounded-2xl border p-6 ${idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-electric/15 text-electric border border-electric/30">
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg theme-heading">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((s) => (
                        <span key={s} className="theme-chip px-3 py-1.5 rounded-lg border text-xs font-mono">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CAREER_TRACKS.map((t, idx) => (
                  <div key={idx} className="theme-card rounded-xl border p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-sm theme-heading">{t.track}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-electric/15 text-electric border border-electric/30">Track {idx + 1}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {t.skills.map((s) => (
                        <span key={s} className="theme-chip px-2 py-1 rounded border text-[11px] font-mono">{s}</span>
                      ))}
                    </div>
                    <div className="pt-2 border-t theme-border text-[11px] font-mono theme-cyan">
                      Key Repos: {t.repos.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* E. Featured Projects Section */}
        <section id="projects" className="py-20 border-b theme-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violetAccent/10 border border-violetAccent/30 text-violetAccent font-mono text-xs mb-3">
                  <Layers className="w-3.5 h-3.5" /> <span>03 / FEATURED PROJECTS</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold theme-heading tracking-tight">
                  Verified Engineering &amp; AI Projects
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', 'Python', 'Web Development', 'Data Analytics', 'AI/ML'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition ${activeFilter === cat ? 'bg-electric text-white' : 'theme-chip border hover:border-electric'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <article key={proj.id} className="theme-card rounded-2xl border p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${proj.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' : 'bg-amber-500/15 text-amber-500 border-amber-500/30'}`}>
                        {proj.status}
                      </span>
                      <span className="text-[11px] font-mono theme-cyan">{proj.categories.join(' • ')}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg theme-heading leading-snug">{proj.title}</h3>
                    <div className="theme-subcard mt-3 p-3 rounded-xl border">
                      <div className="text-[10px] font-mono uppercase theme-muted mb-0.5">Problem Statement</div>
                      <p className="text-xs theme-body line-clamp-2">{proj.problem}</p>
                    </div>
                    <p className="mt-3 text-xs theme-body leading-relaxed">{proj.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.tech.slice(0, 5).map((t) => (
                        <span key={t} className="theme-chip px-2.5 py-1 rounded-md border text-[11px] font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t theme-border flex items-center justify-between gap-2">
                    <a href={proj.github} target="_blank" rel="noreferrer" className="theme-chip inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border hover:border-electric">
                      <Github className="w-3.5 h-3.5 text-electric" /> GitHub
                    </a>
                    <button
                      type="button"
                      onClick={() => openProjectDetails(proj)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-electric/15 hover:bg-electric/25 text-electric border border-electric/30 transition"
                    >
                      Interactive Demo &amp; Specs <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* F. Education Timeline */}
        <section id="education" className="py-20 border-b theme-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric font-mono text-xs mb-3">
                <GraduationCap className="w-3.5 h-3.5" /> <span>04 / EDUCATION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold theme-heading tracking-tight">Academic Timeline</h2>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 theme-border space-y-8 max-w-4xl">
              <div className="theme-card rounded-2xl border p-6">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-electric/15 text-electric border border-electric/30">2023 – 2027 (Expected Graduation)</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">Final-Year Undergraduate</span>
                </div>
                <h3 className="font-display text-xl font-bold theme-heading mt-2">
                  Bachelor of Technology (B.Tech) — Computer Science Engineering (AI &amp; Data Science)
                </h3>
                <p className="text-sm theme-cyan font-medium mt-1">Chandigarh Group of Colleges (CGC), Landran, Mohali, Punjab</p>
              </div>

              <div className="theme-card rounded-2xl border p-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono theme-cyan bg-cyanAccent/10 border border-cyanAccent/30">2022 – 2023</span>
                <h3 className="font-display text-lg font-bold theme-heading mt-2">CBSE Class XII (Senior Secondary Education)</h3>
                <p className="text-sm theme-body mt-1">Dev Samaj Modern School, Sector 21C, Chandigarh</p>
              </div>

              <div className="theme-card rounded-2xl border p-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono text-violetAccent bg-violetAccent/10 border border-violetAccent/30">2020 – 2021</span>
                <h3 className="font-display text-lg font-bold theme-heading mt-2">CBSE Class X (Secondary Education)</h3>
                <p className="text-sm theme-body mt-1">Dev Samaj Modern School, Sector 21C, Chandigarh</p>
              </div>
            </div>
          </div>
        </section>

        {/* G. Certifications Section */}
        <section id="certifications" className="py-20 border-b theme-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono text-xs mb-3">
                <Award className="w-3.5 h-3.5" /> <span>05 / CERTIFICATIONS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold theme-heading tracking-tight">Verified Technical Certifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="theme-card rounded-2xl border p-5 flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">{cert.date}</span>
                    <h3 className="font-display font-bold text-base theme-heading mt-3">{cert.title}</h3>
                    <p className="text-xs font-mono theme-cyan mt-1">{cert.issuer}</p>
                    <p className="text-xs theme-muted mt-2.5 leading-relaxed">{cert.skills}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t theme-border flex justify-between text-xs">
                    <span className="font-mono text-[11px] theme-muted">Verified Credential</span>
                    <a href={cert.link} target="_blank" rel="noreferrer" className="font-mono text-electric hover:underline">View Profile ↗</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* H. Experience & Activities Section */}
        <section id="experience" className="py-20 border-b theme-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs mb-3">
                <Flame className="w-3.5 h-3.5" /> <span>06 / EXPERIENCE &amp; ACTIVITIES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold theme-heading tracking-tight">Hackathons, Leadership &amp; Practical Development</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="theme-card rounded-2xl border p-6">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/15 text-amber-500 border border-amber-500/30">Smart India Hackathon 2025</span>
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-display font-bold text-lg theme-heading">Institutional Execution &amp; Participant Coordinator — SIH 2025</h3>
                <p className="text-sm theme-body mt-3 leading-relaxed">
                  Coordinated participant onboarding, technical team workflows, and institutional execution for Smart India Hackathon 2025 at CGC Landran.
                </p>
              </div>

              <div className="theme-card rounded-2xl border p-6">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-electric/15 text-electric border border-electric/30">SIH 2023 &amp; SIH 2024</span>
                  <Trophy className="w-5 h-5 text-electric" />
                </div>
                <h3 className="font-display font-bold text-lg theme-heading">Smart India Hackathon Competitor (Cleared Two Levels in SIH 2023)</h3>
                <p className="text-sm theme-body mt-3 leading-relaxed">
                  Cleared two evaluation levels in Smart India Hackathon 2023 and participated in SIH 2024, contributing to problem scoping and rapid prototyping.
                </p>
              </div>

              <div className="theme-card rounded-2xl border p-6">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">2023 – Present</span>
                  <GitBranch className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="font-display font-bold text-lg theme-heading">Applied AI, Data &amp; Software Engineering Projects</h3>
                <p className="text-sm theme-body mt-3 leading-relaxed">
                  Engineered and documented modular Python systems spanning phishing detection (27 automated tests), GenAI video synthesis, and wearable health ETL.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* I. Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyanAccent/10 border border-cyanAccent/30 theme-cyan font-mono text-xs">
                <Mail className="w-3.5 h-3.5" /> <span>07 / CONTACT ME</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold theme-heading">Let's Discuss Internships &amp; Entry-Level Roles</h2>
              <p className="theme-muted text-sm leading-relaxed">
                Reach out directly via email, phone, LinkedIn, or the instant message dispatch form.
              </p>

              <div className="theme-card rounded-xl border p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono theme-muted">Email</div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-medium theme-heading">{PERSONAL_INFO.email}</a>
                </div>
                <button type="button" onClick={() => copyText(PERSONAL_INFO.email, 'Email copied!')} className="theme-chip px-2.5 py-1 rounded border text-xs font-mono">Copy</button>
              </div>

              <div className="theme-card rounded-xl border p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono theme-muted">Phone</div>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-medium theme-heading">{PERSONAL_INFO.phone}</a>
                </div>
                <button type="button" onClick={() => copyText(PERSONAL_INFO.phone, 'Phone copied!')} className="theme-chip px-2.5 py-1 rounded border text-xs font-mono">Copy</button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="theme-card rounded-2xl border p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold theme-heading mb-4">Send a Direct Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="theme-input w-full px-3.5 py-2.5 rounded-xl border text-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email *"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="theme-input w-full px-3.5 py-2.5 rounded-xl border text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Subject *"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="theme-input w-full px-3.5 py-2.5 rounded-xl border text-sm"
                  />
                  <textarea
                    rows="4"
                    required
                    placeholder="Message *"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="theme-input w-full px-3.5 py-2.5 rounded-xl border text-sm"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-electric hover:bg-blue-500 text-white">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                    <button type="button" onClick={fillSampleRecruiterMessage} className="text-xs font-mono theme-muted hover:text-electric">
                      Auto-Fill Sample Recruiter Note
                    </button>
                  </div>
                </form>

                {submittedMailto && (
                  <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-xs space-y-2">
                    <div className="font-mono font-bold text-emerald-500 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> {submittedMailto.status || "Message Prepared!"}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <a href={submittedMailto.mailto} className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold">
                        Open in Email App ↗
                      </a>
                      <button type="button" onClick={() => copyText(submittedMailto.fullBody, 'Copied message body!')} className="theme-chip px-3 py-1.5 rounded-lg border font-mono">
                        Copy Text
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* J. Footer */}
      <footer className="theme-footer border-t py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs theme-muted">
          <div>© 2026 {PERSONAL_INFO.name}. Built with React, Tailwind CSS &amp; verified project data.</div>
          <a href="#home" className="theme-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono">
            Back to Top <ArrowUp className="w-3.5 h-3.5 theme-cyan" />
          </a>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="theme-card w-full max-w-2xl rounded-2xl border p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b theme-border pb-3">
              <h3 className="font-display text-xl font-bold theme-heading">{selectedProject.title}</h3>
              <button type="button" onClick={() => setSelectedProject(null)} className="p-1 theme-muted hover:text-electric">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm theme-body leading-relaxed">{selectedProject.description}</p>
            <div className="theme-subcard p-4 rounded-xl border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-electric">Interactive Pipeline Walkthrough</span>
                <button type="button" onClick={runPipelineSimulation} className="px-3 py-1 rounded bg-electric text-white text-xs font-mono">
                  Run Pipeline Trace ▶
                </button>
              </div>
              <pre className="text-xs font-mono text-emerald-400 bg-slate-950 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">{pipelineTraceText}</pre>
            </div>
            <ul className="list-disc pl-5 text-xs theme-body space-y-1">
              {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <div className="flex justify-between pt-3 border-t theme-border">
              <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-electric text-white text-xs font-semibold">
                View GitHub Repository ↗
              </a>
              <button type="button" onClick={() => setSelectedProject(null)} className="theme-chip px-4 py-2 rounded-xl border text-xs font-mono">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Resume Modal */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="theme-card w-full max-w-4xl rounded-2xl border overflow-hidden my-6 max-h-[90vh] flex flex-col">
            <div className="theme-subcard px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display font-bold text-base theme-heading">Vanshdeep Sharma — Tailored Resume Studio</h3>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={resumeTrack}
                  onChange={(e) => setResumeTrack(e.target.value)}
                  className="theme-input px-3 py-1.5 rounded-lg border text-xs font-mono"
                >
                  <option value="all">All-Rounder CSE (AI &amp; DS) Resume</option>
                  {CAREER_TRACKS.map((t, i) => (
                    <option key={i} value={String(i)}>{t.track}</option>
                  ))}
                </select>
                <a href="/Vanshdeep_Sharma_Resume.txt" download className="px-3.5 py-1.5 rounded-lg bg-electric text-white text-xs font-semibold">
                  Download (.TXT)
                </a>
                <button type="button" onClick={() => window.print()} className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-xs font-mono flex items-center gap-1">
                  <Printer className="w-3.5 h-3.5" /> Print / PDF
                </button>
                <button type="button" onClick={() => setResumeModalOpen(false)} className="p-1 theme-muted hover:text-electric">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              <div id="printable-resume-sheet" className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 space-y-4">
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between flex-wrap gap-2">
                  <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">VANSHDEEP SHARMA</h1>
                    <p className="text-sm font-semibold text-blue-700">
                      {selectedTrackObj ? `B.Tech (AI & Data Science) — ${selectedTrackObj.track}` : PERSONAL_INFO.specialization}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-700">
                    <div>{PERSONAL_INFO.location}</div>
                    <div>{PERSONAL_INFO.phone} | {PERSONAL_INFO.email}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-800 space-y-2">
                  <div className="font-bold uppercase border-b pb-1">Technical Skills</div>
                  {selectedTrackObj ? (
                    <p>{selectedTrackObj.skills.join(', ')}</p>
                  ) : (
                    <p>Python, SQL, C, C++, JavaScript (ES6+), React.js, Node.js, HTML5, CSS3, Scikit-Learn, NLTK, TF-IDF, Google Gemini API, Pydantic, Streamlit, Gradio, Pandas, NumPy, Power BI, MS Excel, AWS Cloud, Unit/Integration/System/UAT Testing.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 theme-card px-4 py-3 rounded-xl border border-electric/50 text-xs font-mono shadow-xl">
          <span className="theme-heading">{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
