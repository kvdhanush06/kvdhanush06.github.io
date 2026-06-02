/* ═══════════════════════════════════════════════
   PORTFOLIO — JavaScript
   Terminal engine, typing animation, scroll effects
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TYPING ANIMATION ───────────────────────────
  const roles = [
    'Backend Engineer',
    'Software Engineer'
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
          'Welcome to Dhanush\'s Portfolio Terminal\n\n' +
          'Type \'help\' to see available commands.' +
          '</pre>'
        );
        break;

      case 'help':
        addResponse(
          '<pre>' +
          'Available commands:\n\n' +
          'about            About me\n' +
          'experience       Work experience\n' +
          'projects         Featured projects\n' +
          'contributions    Open source contributions\n' +
          'skills           Technical skills\n' +
          'certifications   Certifications\n' +
          'por              Positions of responsibility\n' +
          'awards           Honors & awards\n' +
          'contact          Contact information\n' +
          'socials          Social links\n' +
          'education        Education\n' +
          'resume           Open resume\n' +
          'clear            Clear terminal\n' +
          'help             Show this list\n' +
          '</pre>'
        );
        break;

      case 'about':
        addResponse(
          '<pre>' +
          'I approach software engineering with a systems mindset—decomposing high-concurrency barriers into modular, asynchronous backend architectures. My technical focus centers on eliminating connection bottlenecks, converting linear system bottlenecks into constant-time executions, and designing low-latency, resilient data processing pipelines.\n\n' +
          'Beyond building standalone application layers, I evaluate engineering toolchains from the inside out. I am an active upstream open-source contributor to Prefect’s core Python framework (FastMCP ecosystem), fixing asynchronous runtime lifespan vulnerabilities and OpenAPI schema compliance behaviors to improve framework reliability for developers globally.' +
          '</pre>'
        );
        break;

      case 'experience':
        addResponse(
          '<pre>' +
          'Software Engineer Intern — <a href="https://www.linkedin.com/company/study-cubs/" target="_blank" rel="noopener">StudyCubs</a>\n' +
          'Dec 2025 – Jan 2026\n' +
          '- Architected a data platform for 5K+ users, offloading real-time webhooks and 180-day batch syncs via a message broker across 6 parallel data streams.\n' +
          '- Reduced database lookup complexity from O(N) table scans to O(log N) index seeks using a composite B-tree index on user and date fields for atomic upserts.\n' +
          '- Hardened throughput via 500-item chunked bulk upserts and nested transactions to isolate data failures and prevent complete batch rollbacks.\n\n' +
          'Tech Stack: FastAPI, PostgreSQL, RabbitMQ, SQLAlchemy, Alembic\n\n\n' +
          'Software Engineer Intern — <a href="https://www.linkedin.com/company/ak-capital-advisors/" target="_blank" rel="noopener">AK Capital Advisors</a>\n' +
          'Jun 2025 – Aug 2025\n' +
          '- Designed 30+ credit and loan workflow REST APIs, implementing strict financial domain validation using structured data schemas and token-based authentication dependencies.\n' +
          '- Managed 15 relational tables and 2 database views across 9 schema migrations, enforcing data integrity via explicit foreign keys and unique constraints.\n' +
          '- Standardized API error semantics by deploying a centralized error catalog, utilizing explicit transactional rollbacks to preserve database state during failures.\n\n' +
          'Tech Stack: FastAPI, PostgreSQL, SQLAlchemy, Alembic, Supabase' +
          '</pre>'
        );
        break;

      case 'projects':
        addResponse(
          '<pre>' +
          'United — Real-Time Tournament Platform\n' +
          'Links: <a href="https://github.com/kvdhanush06/united" target="_blank" rel="noopener">GitHub</a>\n' +
          '[Real-Time Tournament Platform]: Front-end architecture developed for live tournament management and real-time state synchronization.\n' +
          '- Engineered a responsive front-end single-page architecture using ReactJS to handle live tournament management dashboards and dynamic interface updates.\n' +
          '- Integrated secure user session states with component-level input validation barriers to ensure real-time data state synchronization.\n\n' +
          'Tech Stack: ReactJS, JavaScript, State Synchronization, Responsive UI\n\n\n' +
          'SociaSphere — Social Media Backend\n' +
          'Links: <a href="https://github.com/kvdhanush06/SociaSphere" target="_blank" rel="noopener">GitHub</a> | <a href="https://youtu.be/pIHj1mT5XzU" target="_blank" rel="noopener">Video Demo</a> | <a href="https://sociasphere.onrender.com/" target="_blank" rel="noopener">Demo Site</a>\n' +
          '[Social Media Backend Engine]: Backend services engineered to reduce connection constraints and handle data queries under concurrent load.\n' +
          '- Developed a secure session-based authentication system, constructing server-side request validation layers to protect database entities from malformed data payloads.\n' +
          '- Reduced feed query complexity from O(N) relational round-trips to O(1) single-query execution using explicit relationship prefetching and database annotations.\n\n' +
          'Tech Stack: Django, PostgreSQL, REST APIs, ORM Prefetching, Database Annotations\n\n\n' +
          'EduToolsHub — Workflow Automation Platform\n' +
          'Links: <a href="https://github.com/kvdhanush06/EduToolsHub" target="_blank" rel="noopener">GitHub</a> | <a href="https://youtu.be/Fe0io0Mu53A" target="_blank" rel="noopener">Video Demo</a> | <a href="https://edutoolshub.onrender.com/" target="_blank" rel="noopener">Demo Site</a>\n' +
          '[Workflow Automation Platform]: Asynchronous automation gate built to interface with external application systems safely.\n' +
          '- Integrated 4 external service APIs into a monolithic controller layer, enforcing explicit 5-second timeout boundaries and elegant empty-state schema fallbacks.\n' +
          '- Built a secure, server-side rendered application utilizing a 3-layer input validation pipeline coupled with a dictionary-configured framework for structured logging.\n\n' +
          'Tech Stack: Django, Python, Requests, API Integration, Structured Logging' +
          '</pre>'
        );
        break;

      case 'contributions':
      case 'os':
        addResponse(
          '<pre>' +
          '<a href="https://github.com/PrefectHQ/fastmcp" target="_blank" rel="noopener">Prefect — FastMCP</a>(25k+ Stars on GitHub)\n' +
          '[Open Source Framework Contribution]: Contributions to the primary Python framework implementing the Model Context Protocol (MCP) specification.\n' +
          '- Patched an asynchronous lifecycle state leak by dynamically provisioning a fresh session manager per runtime cycle, eliminating thread task-group failures in multi-run test suites.\n' +
          '- Hardened token validation pipelines using thread-safe deep-copy model replication to propagate upstream identity claims across service boundaries without cross-request state pollution.\n' +
          '- Resolved an OpenAPI-to-JSON Schema mismatch by intercepting nullable flags and injecting null parameters into enum constraints, protecting autogenerated client SDKs from runtime errors.\n\n' +
          'Tech Stack: FastAPI, Pydantic, OAuth2/JWT, HTTPX' +
          '</pre>'
        );
        break;

      case 'skills':
        addResponse(
          '<pre>' +
          'Languages:\n' +
          'Python, SQL, Java, JavaScript, C, C++\n\n' +
          'Frameworks & Libraries:\n' +
          'FastAPI, Django, Flask, SQLAlchemy, Alembic, Pydantic, ReactJS\n\n' +
          'Databases & Messaging:\n' +
          'PostgreSQL, RabbitMQ, Supabase\n\n' +
          'Cloud Services & Architecture:\n' +
          'Amazon Web Services (AWS), Oracle Cloud Infrastructure (OCI), OAuth2/JWT, Render\n\n' +
          'AI & Machine Learning:\n' +
          'PyTorch, TensorFlow, OpenCV, Scikit-Learn, Pandas, NumPy, MediaPipe, Matplotlib, Jupyter\n\n' +
          'Tools:\n' +
          'Git, GitHub, Postman' +
          '</pre>'
        );
        break;

      case 'certifications':
      case 'certs':
        addResponse(
          '<pre>' +
          'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional (July 2025)\n' +
          'NVIDIA – Building LLM Applications With Prompt Engineering (April 2025)\n' +
          '</pre>'
        );
        break;

      case 'por':
        addResponse(
          '<pre>' +
          'Co-Lead, Deep Learning & Computer Vision Team\n' +
          'Club: <a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n' +
          'Timeline: August 2025 – Present\n' +
          '- Led a 12-member team building computer vision and deep learning systems.\n' +
          '- Developed GAN-based sketch-to-image and real-time CV pipelines with optimized training workflows.\n' +
          '- Mentored members on debugging, model optimization, and implementation practices.\n\n\n' +
          'Member, Deep Learning Team\n' +
          'Club: <a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n' +
          'Timeline: September 2024 – August 2025\n' +
          '- Built real-time computer vision pipeline using OpenCV and PyTorch with optimized inference workflows.\n' +
          '- Improved model performance through tuning of training processes and optimization techniques.\n\n\n' +
          'Member, Research Team\n' +
          'Club: <a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n' +
          'Timeline: October 2023 – September 2024\n' +
          '- Developed data preprocessing and feature engineering pipelines to improve dataset consistency.\n' +
          '- Performed model benchmarking and evaluation using Scikit-Learn for reliable performance comparison.' +
          '</pre>'
        );
        break;

      case 'awards':
        addResponse(
          '<pre>' +
          'GATE 2026 Qualified – Computer Science\n' +
          'Issued by Indian Institute of Technology, Guwahati · March 2026\n' +
          '- Qualified Graduate Aptitude Test in Engineering (GATE) 2026 in Computer Science and Information Technology.\n\n\n' +
          'Smart India Hackathon 2025 – National Round Qualifier\n' +
          'Issued by VIT-AP · September 2025\n' +
          '- Selected as National Round Qualifier in Smart India Hackathon 2025.\n' +
          '- Contributed to development of an AI-based agricultural platform delivering localized crop insights.\n\n\n' +
          'Smart India Hackathon 2023 – National Round Qualifier (Team Leader)\n' +
          'Issued by VIT-AP · September 2023\n' +
          '- Selected as National Round Qualifier in Smart India Hackathon 2023.\n' +
          '- Led a team to build a time-series weather forecasting system with a 7-day prediction horizon.' +
          '</pre>'
        );
        break;

      case 'education':
        addResponse(
          '<pre>' +
          'VIT-AP University, Andhra Pradesh\n' +
          'Bachelor of Technology, Computer Science & Engineering\n' +
          'Timeline: September 2023 – June 2027\n' +
          'Grade: CGPA 8.45 / 10\n' +
          '</pre>'
        );
        break;

      case 'contact':
        addResponse(
          '<pre>' +
          'Email: <a href="mailto:kvdhanush06@gmail.com">kvdhanush06@gmail.com</a>\n' +
          'LinkedIn: <a href="https://linkedin.com/in/venkata-dhanush-k" target="_blank" rel="noopener">linkedin.com/in/venkata-dhanush-k</a>' +
          '</pre>'
        );
        break;

      case 'socials':
        addResponse(
          '<pre>' +
          'GitHub: <a href="https://github.com/kvdhanush06" target="_blank" rel="noopener">github.com/kvdhanush06</a>\n' +
          'YouTube: <a href="https://www.youtube.com/@kvdhanush0608" target="_blank" rel="noopener">youtube.com/kvdhanush06</a>\n' +
          'X: <a href="https://x.com/kvdhanush06" target="_blank" rel="noopener">x.com/kvdhanush06</a>' +
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
