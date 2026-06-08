/* ═══════════════════════════════════════════════
   PORTFOLIO — JavaScript
   Terminal engine, typing animation, scroll effects
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TYPING ANIMATION ───────────────────────────
  const roles = [
    'Software Engineer',
    'Backend Engineer',
    'Distributed Systems Engineer'
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
          'I am a Software Engineer focused on backend systems, distributed architectures, APIs, and AI-powered applications. My engineering approach centers on designing fault-tolerant architectures, database optimization, implementing multi-layer caching, and setting up background job processing pipelines to power data-intensive applications.\n\n' +
          'Beyond standard development, I actively make upstream open-source contributions to core frameworks like Prefect\'s FastMCP ecosystem, hardening asynchronous lifecycles and runtime schemas to improve framework reliability for developers globally.' +
          '</pre>'
        );
        break;

      case 'experience':
        addResponse(
          '<pre>' +
          'Software Engineer Intern — <a href="https://www.linkedin.com/company/study-cubs/" target="_blank" rel="noopener">StudyCubs</a>\n' +
          'December 2025 - January 2026\n' +
          '- Architected a data platform for 5K+ users, offloading real-time webhooks and 180-day batch syncs via a message broker across 6 parallel data streams.\n' +
          '- Reduced database lookup complexity from O(N) table scans to O(log N) index seeks using a composite B-tree index on user and date fields for atomic upserts.\n' +
          '- Hardened throughput via 500-item chunked bulk upserts and nested transactions to isolate data failures and prevent complete batch rollbacks.\n\n' +
          'Tech Stack: FastAPI, PostgreSQL, RabbitMQ, SQLAlchemy, Alembic\n\n\n' +
          'Software Engineer Intern — <a href="https://www.linkedin.com/company/ak-capital-advisors/" target="_blank" rel="noopener">AK Capital Advisors</a>\n' +
          'June 2025 - August 2025\n' +
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
          'CogniitSearch — Distributed Retrieval & Streaming Platform\n' +
          'Links: <a href="https://github.com/kvdhanush06/CogniitSearch" target="_blank" rel="noopener">GitHub</a> | <a href="https://cogniitsearch.allkvd.dev/" target="_blank" rel="noopener">Live Site</a>\n' +
          '[Distributed Retrieval & Streaming Platform]: Coordinates external services and processes queue-backed jobs for search and generation.\n' +
          '- Architected a distributed retrieval platform coordinating 5 external services and queue-backed workers processing 14 concurrent jobs with retries and fault-tolerant recovery across search, retrieval, and LLM generation stages.\n' +
          '- Reduced redundant retrieval workloads through multi-layer Redis caching (1-hour query TTL, 24-hour content TTL), while implementing query rewriting, response streaming, citation validation, and multi-turn AI workflows.\n\n' +
          'Tech Stack: TypeScript, Node.js, Express.js, Redis, BullMQ, PostgreSQL, Supabase, React, Docker, Nginx\n\n\n' +
          'EduToolsHub — Fault-Tolerant Workflow Automation Platform\n' +
          'Links: <a href="https://github.com/kvdhanush06/EduToolsHub" target="_blank" rel="noopener">GitHub</a> | <a href="https://youtu.be/Fe0io0Mu53A" target="_blank" rel="noopener">Video Demo</a> | <a href="https://edutoolshub.onrender.com/" target="_blank" rel="noopener">Live Site</a>\n' +
          '[Fault-Tolerant Workflow Automation Platform]: Asynchronous automation gate built to interface with external application systems safely.\n' +
          '- Integrated 4 external service APIs into a monolithic controller layer, enforcing explicit 5-second timeout boundaries and elegant empty-state schema fallbacks.\n' +
          '- Built a secure, server-side rendered application utilizing a 3-layer input validation pipeline coupled with a dictionary-configured framework for structured logging.\n\n' +
          'Tech Stack: Django, Python, Requests\n\n\n' +
          'SociaSphere — Distributed Feed Optimization Engine & Session Service\n' +
          'Links: <a href="https://github.com/kvdhanush06/SociaSphere" target="_blank" rel="noopener">GitHub</a> | <a href="https://youtu.be/pIHj1mT5XzU" target="_blank" rel="noopener">Video Demo</a> | <a href="https://sociasphere.onrender.com/" target="_blank" rel="noopener">Live Site</a>\n' +
          '[Distributed Feed Optimization Engine & Session Service]: Backend services engineered to reduce connection constraints and handle data queries under concurrent load.\n' +
          '- Developed a secure session-based authentication system, constructing server-side request validation layers to protect database entities from malformed data payloads.\n' +
          '- Reduced feed query complexity from O(N) relational round-trips to O(1) single-query execution using explicit relationship prefetching and database annotations.\n\n' +
          'Tech Stack: Django, PostgreSQL, REST APIs' +
          '</pre>'
        );
        break;

      case 'contributions':
      case 'os':
        addResponse(
          '<pre>' +
          '<a href="https://github.com/PrefectHQ/fastmcp" target="_blank" rel="noopener">Prefect — FastMCP</a> (25k+ Stars on GitHub)\n' +
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
          'Python, TypeScript, JavaScript, SQL, Java, C/C++\n\n' +
          'Frameworks & Libraries:\n' +
          'FastAPI, Express.js, Django, React, SQLAlchemy, Alembic, Pydantic\n\n' +
          'Databases & Messaging:\n' +
          'PostgreSQL, Redis, RabbitMQ, BullMQ, Supabase\n\n' +
          'Cloud & Infrastructure:\n' +
          'AWS, OCI, Docker, Nginx\n\n' +
          'AI & Machine Learning:\n' +
          'PyTorch, TensorFlow, OpenCV, Scikit-Learn, Pandas, NumPy, MediaPipe, Matplotlib, Jupyter, Generative AI\n\n' +
          'Tools:\n' +
          'Git, GitHub, Postman' +
          '</pre>'
        );
        break;

      case 'certifications':
      case 'certs':
        addResponse(
          '<pre>' +
          'Oracle -- Oracle Cloud Infrastructure 2025 Certified Generative AI Professional\n' +
          'NVIDIA -- Building LLM Applications With Prompt Engineering\n' +
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
          'Open to: Software Engineering, Backend Engineering, and New Graduate opportunities.\n' +
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
