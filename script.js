/* ═══════════════════════════════════════════════
   PORTFOLIO — JavaScript
   Terminal engine, typing animation, scroll effects
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TYPING ANIMATION ───────────────────────────
  const roles = [
    'Backend Developer',
    'Software Engineer',
    'Forward Deployed Engineer',
    'Python Developer',
    'API Architect',
  ];

  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_END = 2000;
  const PAUSE_START = 500;

  function typeRole() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeRole, PAUSE_END);
        return;
      }
      setTimeout(typeRole, TYPING_SPEED);
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, PAUSE_START);
        return;
      }
      setTimeout(typeRole, DELETING_SPEED);
    }
  }

  typeRole();

  // ─── SCROLL ANIMATIONS (IntersectionObserver) ──
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  // ═══════════════════════════════════════════════
  // TERMINAL ENGINE
  // ═══════════════════════════════════════════════

  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');

  let commandHistory = [];
  let historyIndex = -1;

  // Focus terminal on click anywhere in body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value.trim().toLowerCase();
      if (cmd) {
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
      }
      addPromptLine(terminalInput.value);
      processCommand(cmd);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autoComplete(terminalInput.value.trim().toLowerCase());
    }
  });

  function addPromptLine(text) {
    var div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML =
      '<span class="terminal-prompt">visitor@portfolio:~$</span>' +
      '<span class="terminal-text">' + escapeHtml(text) + '</span>';
    terminalOutput.appendChild(div);
  }

  function addResponse(html) {
    var div = document.createElement('div');
    div.className = 'terminal-response';
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    scrollTerminal();
  }

  function scrollTerminal() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  var commands = [
    'help', 'welcome', 'about', 'experience', 'projects', 'contributions', 'skills',
    'certifications', 'por', 'awards', 'contact', 'socials',
    'education', 'resume', 'clear'
  ];

  function autoComplete(partial) {
    if (!partial) return;
    var matches = commands.filter(function (c) { return c.startsWith(partial); });
    if (matches.length === 1) {
      terminalInput.value = matches[0];
    } else if (matches.length > 1) {
      addPromptLine(partial);
      addResponse(matches.join('  '));
    }
  }

  function processCommand(cmd) {
    switch (cmd) {
      case '':
        break;

      case 'welcome':
        addResponse(
          '<pre>' +
          '╔══════════════════════════════════════════════════════════╗\n' +
          '║                                                     ║\n' +
          '║   Welcome to Dhanush\'s Portfolio Terminal           ║\n' +
          '║                                                     ║\n' +
          '║   Type \'help\' to see available commands.            ║\n' +
          '║                                                     ║\n' +
          '╚══════════════════════════════════════════════════════════╝' +
          '</pre>'
        );
        break;

      case 'help':
        addResponse(
          '<pre>' +
          'Available commands:\n\n' +
          '  welcome          Welcome message\n' +
          '  about            About me\n' +
          '  experience       Work experience\n' +
          '  projects         Featured projects\n' +
          '  contributions    Open source contributions\n' +
          '  skills           Technical skills\n' +
          '  certifications   Certifications\n' +
          '  por              Positions of responsibility\n' +
          '  awards           Honors & awards\n' +
          '  contact          Contact information\n' +
          '  socials          Social links\n' +
          '  education        Education\n' +
          '  resume           Open resume\n' +
          '  clear            Clear terminal\n' +
          '  help             Show this list\n' +
          '</pre>'
        );
        break;

      case 'about':
        addResponse(
          '<pre>' +
          'About\n' +
          '─────\n\n' +
          'Backend developer with hands-on experience building scalable FastAPI systems serving 5K+ users at sub-200ms latency.\n' +
          'Delivered up to 50% efficiency gains through LLM-powered PostgreSQL JSONB solutions. Led high-impact ML Club\n' +
          'projects achieving 90%+ accuracy in real-time computer vision pipelines and GAN-based image synthesis systems.\n' +
          '</pre>'
        );
        break;

      case 'experience':
        addResponse(
          '<pre>' +
          'Work Experience\n' +
          '───────────────\n\n' +
          'Software Engineer Intern                             Dec 2025 – Jan 2026\n' +
          '<a href="https://www.linkedin.com/company/study-cubs/" target="_blank" rel="noopener">StudyCubs</a>                                    Remote – Pune, Maharashtra, India\n\n' +
          '– Delivered centralized analytics platform integrating Terra API for real-time monitoring of 5K+ users\n' +
          '– Built high-performance FastAPI pipelines processing 40+ days of historical and streaming data at 200ms latency\n' +
          '– Modernized data layer using PostgreSQL JSONB schemas and LLM-powered queries, reducing analysis effort by 50%\n' +
          '– Tech Stack: FastAPI, SQLAlchemy, PostgreSQL, Alembic, Postman, Git, GitHub\n\n' +
          '────────────────────────────────────────\n\n' +
          'Software Engineer Intern                             Jun 2025 – Aug 2025\n' +
          '<a href="https://www.linkedin.com/company/ak-capital-advisors/" target="_blank" rel="noopener">AK Capital Advisors</a>                          Remote – Pune, Maharashtra, India\n\n' +
          '– Designed and shipped 30+ APIs with JWT authentication and rate limiting, cutting invalid requests by 40%\n' +
          '– Architected microservices architecture with PostgreSQL and Alembic, improving deployment stability by 35%\n' +
          '– Tech Stack: FastAPI, SQLAlchemy, PostgreSQL, Supabase, Postman, Git, GitHub\n' +
          '</pre>'
        );
        break;

      case 'projects':
        addResponse(
          '<pre>' +
          'Projects\n' +
          '────────\n\n' +
          '<a href="https://github.com/kvdhanush06/SociaSphere" target="_blank" rel="noopener">SociaSphere</a> | <a href="https://youtu.be/pIHj1mT5XzU" target="_blank" rel="noopener">Demo Video</a>\n' +
          'Social Media Platform Backend\n\n' +
          '– Engineered scalable authentication and media services supporting concurrent user activity with JWT and rate limiting\n' +
          '– Optimized feed generation using indexed PostgreSQL queries and caching strategies, reducing response time by 30%\n' +
          '– Tech Stack: Python, Django, Pillow, REST APIs\n\n' +
          '────────────────────────────────────────\n\n' +
          '<a href="https://github.com/kvdhanush06/EduToolsHub" target="_blank" rel="noopener">EduToolsHub</a> | <a href="https://youtu.be/Fe0io0Mu53A" target="_blank" rel="noopener">Demo Video</a> | <a href="https://edutoolshub.allkvd.me/" target="_blank" rel="noopener">Live Demo</a>\n' +
          'Workflow Automation Platform\n\n' +
          '– Built automated task scheduling and external API aggregation that reduced manual research time by 40% for users\n' +
          '– Implemented production-ready REST endpoints with proper error handling, logging, and documentation\n' +
          '– Tech Stack: Python, Django, REST APIs, Requests\n' +
          '</pre>'
        );
        break;

      case 'contributions':
      case 'os':
        addResponse(
          '<pre>' +
          'Open Source Contributions\n' +
          '─────────────────────────\n\n' +
          '<a href="https://github.com/PrefectHQ/fastmcp" target="_blank" rel="noopener">FastMCP</a> @ <a href="https://www.linkedin.com/company/prefect/" target="_blank" rel="noopener">Prefect</a>                              Feb 2026 – Present\n' +
          'Leading Python framework for the Model Context Protocol (MCP)\n\n' +
          '– Delivered FastAPI TestClient lifespan compatibility fix, eliminating RuntimeError\n' +
          '  in multiple test runs and improving developer testing reliability\n' +
          '  <a href="https://github.com/PrefectHQ/fastmcp/pull/3736" target="_blank" rel="noopener">[PR #3736]</a>\n\n' +
          '– Engineered upstream_claims propagation in load_access_token, ensuring custom\n' +
          '  signed JWT claims survive token swaps and strengthening authentication consistency\n' +
          '  <a href="https://github.com/PrefectHQ/fastmcp/pull/3750" target="_blank" rel="noopener">[PR #3750]</a>\n\n' +
          '– Fixed OpenAPI 3.0 nullable fields in tool input schemas, converting nullable: true\n' +
          '  to proper JSON Schema unions and ensuring full compatibility with downstream MCP clients\n' +
          '  <a href="https://github.com/PrefectHQ/fastmcp/pull/3768" target="_blank" rel="noopener">[PR #3768]</a>\n\n' +
          '– Tech Stack: FastAPI, Pydantic, OAuth2/JWT, ASGI lifespans\n' +
          '</pre>'
        );
        break;

      case 'skills':
        addResponse(
          '<pre>' +
          'Technical Skills\n' +
          '────────────────\n\n' +
          '• Languages: Python, JavaScript, Java, C, C++, SQL\n\n' +
          '• Backend & Systems: FastAPI, Django, Flask, Node.js, REST APIs,\n' +
          '  JSON Web Token (JWT), Microservices, Caching\n\n' +
          '• Databases & Cloud: PostgreSQL (JSONB), Supabase, Firebase,\n' +
          '  AWS, OCI, Render, Query Optimization\n\n' +
          '• Data & ML: PyTorch, TensorFlow, OpenCV, Scikit-Learn,\n' +
          '  Pandas, NumPy, Matplotlib, MediaPipe, Pillow\n\n' +
          '• Generative AI: Generative AI, LangChain, RAG, Prompt Engineering,\n' +
          '  Fine Tuning, AI Agents, Vector Databases\n\n' +
          '• Tools: SQLAlchemy, Alembic, Git, GitHub, Postman, Jupyter\n' +
          '</pre>'
        );
        break;

      case 'certifications':
      case 'certs':
        addResponse(
          '<pre>' +
          'Certifications\n' +
          '──────────────\n\n' +
          '• Oracle Cloud Infrastructure 2025 Certified Generative AI Professional (July 2025) - <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=9A0A7CC8C8DBBE15A972B3642518E75372D91D22C1E469A9DCBB6D2E2750F162" target="_blank" rel="noopener">Link</a>\n' +
          '• NVIDIA – Building LLM Applications With Prompt Engineering (April 2025) - <a href="https://learn.nvidia.com/certificates?id=fZPQ-F1qQWOVo1SjcbS9wA" target="_blank" rel="noopener">Link</a>\n' +
          '</pre>'
        );
        break;

      case 'por':
        addResponse(
          '<pre>' +
          'Positions of Responsibility\n' +
          '───────────────────────────\n\n' +
          'Co-Lead, Deep Learning & Computer Vision Team                      Aug 2025 – Present\n' +
          '<a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>                       Amaravati, Andhra Pradesh, India\n\n' +
          '– Led 12-member team and established structured project delivery pipelines, improving execution efficiency\n' +
          '– Directed development of GAN-based image synthesis system enabling automated sketch-to-image generation\n' +
          '– Tech Stack: Python, TensorFlow, OpenCV, Git\n\n' +
          '────────────────────────────────────────\n\n' +
          'Member, Deep Learning Team                                         Sep 2024 – Aug 2025\n' +
          '<a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n\n' +
          '– Engineered real-time computer vision pipeline achieving 90%+ accuracy at 30 FPS using OpenCV + PyTorch\n' +
          '– Tuned non-convex optimization and gradient descent methods for stable model convergence\n' +
          '– Tech Stack: Python, PyTorch, OpenCV, MediaPipe, NumPy, Git\n\n' +
          '────────────────────────────────────────\n\n' +
          'Member, Research Team                                              Oct 2023 – Sep 2024\n' +
          '<a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n\n' +
          '– Built automated data preprocessing and feature engineering pipelines, improving dataset consistency by 20%\n' +
          '– Optimized and benchmarked Scikit-Learn models for reliable performance comparison across experiments\n' +
          '– Tech Stack: Python, Scikit-Learn, Pandas, Matplotlib, Jupyter, Git\n' +
          '</pre>'
        );
        break;

      case 'awards':
        addResponse(
          '<pre>' +
          'Honors & Awards\n' +
          '───────────────\n\n' +
          'GATE 2026 Qualified – Computer Science\n' +
          'Issued by Indian Institute of Technology, Guwahati · Mar 2026\n\n' +
          '– Qualified Graduate Aptitude Test in Engineering\n' +
          '  (GATE) 2026 in Computer Science\n\n' +
          '────────────────────────────────────────\n\n' +
          'Smart India Hackathon 2025 –\n' +
          'National Round Qualifier\n' +
          'Issued by VIT-AP · Sep 2025\n\n' +
          '– Collaborated in a 6-member team to engineer\n' +
          '  \'CropSynth\', an AI-driven agricultural platform\n' +
          '  delivering localized crop insights and\n' +
          '  recommendations for farmers in Kerala\n\n' +
          '– Architected a Node.js backend integrating the Groq\n' +
          '  API for high-speed LLM inference, achieving sub-500ms\n' +
          '  response times and serving real-time actionable\n' +
          '  data to a ReactJS frontend\n\n' +
          '────────────────────────────────────────\n\n' +
          'Smart India Hackathon 2023 –\n' +
          'National Round Qualifier (Team Leader)\n' +
          'Issued by VIT-AP · Sep 2023\n\n' +
          '– Led a 5-member team to develop a time-series weather\n' +
          '  forecasting system with a 7-day prediction horizon\n\n' +
          '– Built an end-to-end pipeline processing 10k+\n' +
          '  historical records from ingestion to web deployment,\n' +
          '  improving model accuracy by ~20% through feature\n' +
          '  engineering and hyperparameter tuning\n' +
          '</pre>'
        );
        break;

      case 'education':
        addResponse(
          '<pre>' +
          'Education\n' +
          '─────────\n\n' +
          'Bachelor of Technology in Computer Science and Engineering 2023 – 2027\n' +
          'Vellore Institute of Technology (VIT-AP University), Andhra Pradesh CGPA: 8.45 / 10\n' +
          '</pre>'
        );
        break;

      case 'contact':
        addResponse(
          '<pre>' +
          'Contact Me\n' +
          '──────────\n\n' +
          'Email     <a href="mailto:kvdhanush06@gmail.com">kvdhanush06@gmail.com</a>\n' +
          'LinkedIn  <a href="https://www.linkedin.com/in/venkata-dhanush-k/" target="_blank" rel="noopener">linkedin.com/in/venkata-dhanush-k</a>\n' +
          '</pre>'
        );
        break;

      case 'socials':
        addResponse(
          '<pre>' +
          'Socials\n' +
          '───────\n\n' +
          'GitHub    <a href="https://github.com/kvdhanush06" target="_blank" rel="noopener">github.com/kvdhanush06</a>\n' +
          'YouTube   <a href="https://www.youtube.com/@kvdhanush0608" target="_blank" rel="noopener">youtube.com/@kvdhanush0608</a>\n' +
          '</pre>'
        );
        break;

      case 'resume':
        addResponse('Opening resume in new tab...');
        window.open('https://drive.google.com/file/d/1NCT6ZCa_HfxCdScqI-1Q2yA6y2c7O-qA/view?usp=sharing', '_blank');
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        break;

      default:
        addResponse(
          "Command not found: '" + escapeHtml(cmd) + "'. Type 'help' for available commands."
        );
    }
  }
})();
