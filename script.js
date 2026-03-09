/* ═══════════════════════════════════════════════
   PORTFOLIO — JavaScript
   Terminal engine, typing animation, scroll effects
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TYPING ANIMATION ───────────────────────────
  const roles = [
    'Backend Developer',
    'ML Engineer',
    'Systems Builder',
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
    'help', 'welcome', 'about', 'experience', 'projects', 'skills',
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
          'Backend developer experienced in building scalable FastAPI\n' +
          'systems that serve 5k+ users at 200ms latency while\n' +
          'delivering up to 50% efficiency gains through LLM-powered\n' +
          'PostgreSQL solutions. Led multiple high-impact ML club\n' +
          'projects that achieved 90%+ accuracy in real-time computer\n' +
          'vision and GAN-based image synthesis systems.\n' +
          '</pre>'
        );
        break;

      case 'experience':
        addResponse(
          '<pre>' +
          'Work Experience\n' +
          '───────────────\n\n' +
          'Backend Developer\n' +
          '<a href="https://www.linkedin.com/company/study-cubs/" target="_blank" rel="noopener">StudyCubs</a>\n' +
          'December 2025 - January 2026 · 1 mo\n' +
          'Remote - Pune, Maharashtra, India\n\n' +
          '– Delivered a centralized analytics platform integrating\n' +
          '  Terra API data to enable real-time monitoring for\n' +
          '  5k+ users\n' +
          '– Built high-performance FastAPI pipelines that process\n' +
          '  40+ days of historical and streaming data at 200ms latency\n' +
          '– Modernized data access using PostgreSQL JSONB schemas\n' +
          '  and LLM-powered queries, reducing analysis effort\n' +
          '  by 50%\n' +
          '– Tech Stack: Python, FastAPI, SQLAlchemy, PostgreSQL,\n' +
          '  Alembic, Postman, Git, GitHub\n\n' +
          '────────────────────────────────────────\n\n' +
          'Backend Developer\n' +
          '<a href="https://www.linkedin.com/company/ak-capital-advisors/" target="_blank" rel="noopener">AK Capital Advisors</a>\n' +
          'June 2025 - August 2025 · 3 mos\n' +
          'Remote - Pune, Maharashtra, India\n\n' +
          '– Developed secure backend systems that streamline digital\n' +
          '  credit card applications supporting 1k+ monthly\n' +
          '  submissions\n' +
          '– Architected 30+ production-grade APIs with JWT\n' +
          '  authentication and rate limiting, reducing invalid\n' +
          '  requests by 40%\n' +
          '– Designed a robust microservices architecture with\n' +
          '  PostgreSQL and Alembic migrations that improved\n' +
          '  deployment stability by 35%\n' +
          '– Tech Stack: Python, FastAPI, SQLAlchemy, PostgreSQL,\n' +
          '  Alembic, Supabase, Postman, Git, GitHub\n' +
          '</pre>'
        );
        break;

      case 'projects':
        addResponse(
          '<pre>' +
          'Projects\n' +
          '────────\n\n' +
          '<a href="https://github.com/kvdhanush06/EduToolsHub" target="_blank" rel="noopener">EduToolsHub</a>\n' +
          'Workflow Automation Platform\n\n' +
          '– Automated academic workflow management through task\n' +
          '  scheduling services to improve student productivity\n' +
          '– Integrated external content APIs to aggregate learning\n' +
          '  resources, reducing manual research time by 40%\n' +
          '– Tech Stack: Python, Django, REST APIs, Requests,\n' +
          '  YouTube API, Wikipedia API\n\n' +
          '────────────────────────────────────────\n\n' +
          '<a href="https://github.com/kvdhanush06/SociaSphere" target="_blank" rel="noopener">SociaSphere</a>\n' +
          'Social Media Platform Backend\n\n' +
          '– Engineered scalable authentication and media services\n' +
          '  to support concurrent user activity on the platform\n' +
          '– Optimized feed generation using indexed queries and\n' +
          '  caching strategies, cutting average response time\n' +
          '  by 30%\n' +
          '– Tech Stack: Python, Django, Pillow, REST APIs\n\n' +
          '────────────────────────────────────────\n\n' +
          '<a href="https://github.com/kvdhanush06/united" target="_blank" rel="noopener">United</a>\n' +
          'Real-Time Tournament Platform\n\n' +
          '– Built a real-time tournament management system with\n' +
          '  secure authentication and live leaderboard\n' +
          '  synchronization\n' +
          '– Developed a React single-page application with\n' +
          '  lazy-loaded routes and scalable competition workflows,\n' +
          '  reducing initial load time by 40%\n' +
          '– Tech Stack: React, JavaScript, REST APIs\n' +
          '</pre>'
        );
        break;

      case 'skills':
        addResponse(
          '<pre>' +
          'Skills\n' +
          '──────\n\n' +
          'Languages\n' +
          '  Python, JavaScript, Java, C, C++, SQL\n\n' +
          'Backend & Systems\n' +
          '  FastAPI, Django, Flask, Node.js, REST APIs,\n' +
          '  JSON Web Token (JWT), Microservices, Caching\n\n' +
          'Databases & Cloud\n' +
          '  PostgreSQL, Supabase, Amazon Web Services (AWS),\n' +
          '  Oracle Cloud Infrastructure (OCI), Render,\n' +
          '  Query Optimization, Firebase\n\n' +
          'Data & Machine Learning\n' +
          '  PyTorch, TensorFlow, OpenCV, Scikit-Learn,\n' +
          '  Pandas, NumPy, Matplotlib, MediaPipe, Pillow\n\n' +
          'Generative AI\n' +
          '  Generative AI, LangChain, Retrieval Augmented\n' +
          '  Generation (RAG), Prompt Engineering, Fine Tuning,\n' +
          '  AI Agents, Vector Databases\n\n' +
          'Tools\n' +
          '  SQLAlchemy, Alembic, Git, GitHub, Postman, Jupyter\n' +
          '</pre>'
        );
        break;

      case 'certifications':
      case 'certs':
        addResponse(
          '<pre>' +
          'Certifications\n' +
          '──────────────\n\n' +
          'Oracle\n' +
          '<a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=9A0A7CC8C8DBBE15A972B3642518E75372D91D22C1E469A9DCBB6D2E2750F162" target="_blank" rel="noopener">Oracle Cloud Infrastructure 2025 — Certified Generative AI Professional</a>\n' +
          'July 2025\n\n' +
          'NVIDIA\n' +
          '<a href="https://learn.nvidia.com/certificates?id=fZPQ-F1qQWOVo1SjcbS9wA" target="_blank" rel="noopener">Building LLM Applications With Prompt Engineering</a>\n' +
          'April 2025\n' +
          '</pre>'
        );
        break;

      case 'por':
        addResponse(
          '<pre>' +
          'Positions of Responsibility\n' +
          '───────────────────────────\n\n' +
          'Co-Lead of Deep Learning & Computer Vision Team\n' +
          '<a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n' +
          'August 2025 – Present · 7 mos\n' +
          'Onsite - Amaravati, Andhra Pradesh, India\n\n' +
          '– Coordinated a 12-member technical team and structured\n' +
          '  project delivery pipelines to improve execution\n' +
          '  efficiency\n' +
          '– Directed development of GAN-based image synthesis\n' +
          '  systems, enabling automated sketch-to-image\n' +
          '  generation\n' +
          '– Tech Stack: Python, TensorFlow, OpenCV, Git\n\n' +
          '────────────────────────────────────────\n\n' +
          'Member of Deep Learning Team\n' +
          '<a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n' +
          'September 2024 – August 2025 · 1 yr\n' +
          'Onsite - Amaravati, Andhra Pradesh, India\n\n' +
          '– Engineered a real-time computer vision pipeline using\n' +
          '  OpenCV and PyTorch, achieving 90%+ accuracy at 30 FPS\n' +
          '– Improved model convergence by tuning non-convex\n' +
          '  optimization and gradient descent methods for stable\n' +
          '  training\n' +
          '– Tech Stack: Python, PyTorch, OpenCV, MediaPipe,\n' +
          '  NumPy, Git\n\n' +
          '────────────────────────────────────────\n\n' +
          'Member of Research Team\n' +
          '<a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n' +
          'October 2023 – September 2024 · 1 yr\n' +
          'Onsite - Amaravati, Andhra Pradesh, India\n\n' +
          '– Built automated data preprocessing and feature\n' +
          '  engineering pipelines, improving dataset consistency\n' +
          '  by 20%\n' +
          '– Optimized and benchmarked Scikit-Learn models to\n' +
          '  enable reliable performance comparison across\n' +
          '  experiments\n' +
          '– Tech Stack: Python, Scikit-Learn, Pandas, Matplotlib,\n' +
          '  Jupyter, Git\n' +
          '</pre>'
        );
        break;

      case 'awards':
        addResponse(
          '<pre>' +
          'Honors & Awards\n' +
          '───────────────\n\n' +
          'Smart India Hackathon 2023 –\n' +
          'National Round Qualifier (Team Leader)\n' +
          'Issued by VIT-AP · Sep 2023\n\n' +
          '– Led a 5-member team to develop a time-series weather\n' +
          '  forecasting system with a 7-day prediction horizon\n' +
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
          'VIT-AP University\n' +
          'Bachelor of Technology, Computer Science & Engineering\n' +
          'September 2023 – June 2027\n' +
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
