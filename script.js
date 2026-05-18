/* ═══════════════════════════════════════════════
   PORTFOLIO — JavaScript
   Terminal engine, typing animation, scroll effects
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TYPING ANIMATION ───────────────────────────
  const roles = [
    'Backend Engineer',
    'Software Engineer',
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
          'Backend developer with experience designing and building scalable systems using FastAPI and Django.\n\n' +
          'Worked on real-time and batch processing pipelines for 5K+ users, focusing on performance optimization,\n' +
          'database efficiency, and reliable API design.\n\n' +
          'Experience in backend systems, data processing, and production-grade API development.' +
          '</pre>'
        );
        break;

      case 'experience':
        addResponse(
          '<pre>' +
          'Software Engineer Intern — <a href="https://www.linkedin.com/company/study-cubs/" target="_blank" rel="noopener">StudyCubs</a>\n' +
          'Dec 2025 – Jan 2026\n\n' +
          '– Designed a centralized analytics platform with Terra API for real-time and batch processing of 5K+ users.\n' +
          '– Built async FastAPI pipelines processing 40+ days of historical and streaming data, improving latency.\n' +
          '– Optimized PostgreSQL JSONB queries using indexing and query restructuring, improving query performance.\n\n' +
          'Tech Stack: FastAPI, PostgreSQL, SQLAlchemy, Alembic\n\n\n' +
          'Software Engineer Intern — <a href="https://www.linkedin.com/company/ak-capital-advisors/" target="_blank" rel="noopener">AK Capital Advisors</a>\n' +
          'Jun 2025 – Aug 2025\n\n' +
          '– Designed and deployed 30+ REST APIs with JWT authentication and rate limiting for credit workflows.\n' +
          '– Implemented Alembic-based schema versioning and migrations to ensure database consistency.\n' +
          '– Performed backend debugging and API validation using Postman during production deployment cycles.\n\n' +
          'Tech Stack: FastAPI, PostgreSQL, Supabase, Alembic' +
          '</pre>'
        );
        break;

      case 'projects':
        addResponse(
          '<pre>' +
          'SociaSphere — Social Media Backend\n' +
          'Links: <a href="https://github.com/kvdhanush06/SociaSphere" target="_blank" rel="noopener">GitHub</a> | <a href="https://youtu.be/pIHj1mT5XzU" target="_blank" rel="noopener">Video Demo</a>\n\n' +
          '– Implemented JWT-based authentication and rate limiting for secure and controlled user access.\n' +
          '– Optimized feed queries and introduced caching strategies to reduce response time under concurrent usage.\n\n' +
          'Tech Stack: Django, PostgreSQL, REST APIs\n\n\n' +
          'EduToolsHub — Workflow Automation Platform\n' +
          'Links: <a href="https://github.com/kvdhanush06/EduToolsHub" target="_blank" rel="noopener">GitHub</a> | <a href="https://youtu.be/Fe0io0Mu53A" target="_blank" rel="noopener">Video Demo</a> | <a href="https://edutoolshub.onrender.com/" target="_blank" rel="noopener">Demo Site</a>\n\n' +
          '– Designed workflow automation system integrating multiple external APIs with validation and error handling.\n' +
          '– Developed REST endpoints with structured logging, input validation, and failure handling mechanisms.\n\n' +
          'Tech Stack: Django, REST APIs, Requests\n\n\n' +
          'United — Real-Time Tournament Platform\n' +
          'Links: <a href="https://github.com/kvdhanush06/united" target="_blank" rel="noopener">GitHub</a>\n\n' +
          '– Designed and implemented a real-time tournament management system with secure authentication and live data synchronization.\n' +
          '– Developed REST APIs to support tournament workflows and leaderboard updates.\n\n' +
          'Tech Stack: React, JavaScript, REST APIs' +
          '</pre>'
        );
        break;

      case 'contributions':
      case 'os':
        addResponse(
          '<pre>' +
          '<a href="https://github.com/PrefectHQ/fastmcp" target="_blank" rel="noopener">Prefect — FastMCP</a> @ <a href="https://www.linkedin.com/company/prefect/" target="_blank" rel="noopener">LinkedIn</a>\n\n' +
          '– Resolved FastAPI TestClient lifespan compatibility issue affecting async test environments. <a href="https://github.com/PrefectHQ/fastmcp/pull/3736" target="_blank" rel="noopener">[PR #3736]</a>\n' +
          '– Implemented upstream_claims propagation for consistent JWT custom claim handling across services. <a href="https://github.com/PrefectHQ/fastmcp/pull/3750" target="_blank" rel="noopener">[PR #3750]</a>\n' +
          '– Fixed OpenAPI nullable schema generation bug, improving API client compatibility. <a href="https://github.com/PrefectHQ/fastmcp/pull/3768" target="_blank" rel="noopener">[PR #3768]</a>\n\n' +
          'Tech Stack: FastAPI, Pydantic, OAuth2/JWT' +
          '</pre>'
        );
        break;

      case 'skills':
        addResponse(
          '<pre>' +
          'Languages:\n' +
          'Python, SQL, JavaScript, Java, C, C++\n\n' +
          'Backend & Systems:\n' +
          'FastAPI, Django, Flask, REST APIs, SQLAlchemy, Alembic\n\n' +
          'Databases & Cloud:\n' +
          'PostgreSQL, Supabase, AWS, OCI, Render\n\n' +
          'Data & ML:\n' +
          'PyTorch, OpenCV, Scikit-Learn, Pandas, NumPy\n\n' +
          'Tools:\n' +
          'Git, GitHub, Postman' +
          '</pre>'
        );
        break;

      case 'certifications':
      case 'certs':
        addResponse(
          '<pre>' +
          'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional — <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=9A0A7CC8C8DBBE15A972B3642518E75372D91D22C1E469A9DCBB6D2E2750F162" target="_blank" rel="noopener">View Credential</a>\n\n' +
          'NVIDIA – Building LLM Applications With Prompt Engineering — <a href="https://learn.nvidia.com/certificates?id=fZPQ-F1qQWOVo1SjcbS9wA" target="_blank" rel="noopener">View Credential</a>' +
          '</pre>'
        );
        break;

      case 'por':
        addResponse(
          '<pre>' +
          'Co-Lead, Deep Learning & Computer Vision Team\n' +
          'Club: <a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n\n' +
          '– Led a 12-member team building computer vision and deep learning systems.\n' +
          '– Developed GAN-based sketch-to-image system and real-time CV pipelines with optimized training workflows.\n' +
          '– Mentored team members on debugging, model optimization, and implementation practices.\n\n\n' +
          'Member, Deep Learning Team\n' +
          'Club: <a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n\n' +
          '– Built real-time computer vision pipeline using OpenCV and PyTorch with optimized inference workflows.\n' +
          '– Improved model performance through tuning of training processes and optimization techniques.\n\n\n' +
          'Member, Research Team\n' +
          'Club: <a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n\n' +
          '– Developed data preprocessing and feature engineering pipelines to improve dataset consistency.\n' +
          '– Performed model benchmarking and evaluation using Scikit-Learn for reliable performance comparison.' +
          '</pre>'
        );
        break;

      case 'awards':
        addResponse(
          '<pre>' +
          'GATE 2026 Qualified – Computer Science\n\n' +
          '– Qualified Graduate Aptitude Test in Engineering (GATE) 2026 in Computer Science.\n\n\n' +
          'Smart India Hackathon 2025 – National Round Qualifier\n\n' +
          '– Selected as National Round Qualifier in Smart India Hackathon 2025.\n' +
          '– Contributed to development of an AI-based agricultural platform delivering localized crop insights.\n\n\n' +
          'Smart India Hackathon 2023 – National Round Qualifier\n\n' +
          '– Selected as National Round Qualifier in Smart India Hackathon 2023.\n' +
          '– Led a team to build a time-series weather forecasting system with a 7-day prediction horizon.' +
          '</pre>'
        );
        break;

      case 'education':
        addResponse(
          '<pre>' +
          'Bachelor of Technology in Computer Science and Engineering (2023 – 2027)\n' +
          'VIT-AP University, Andhra Pradesh\n' +
          'CGPA: 8.45 / 10' +
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
          'YouTube: <a href="https://youtube.com/@kvdhanush0608" target="_blank" rel="noopener">youtube.com/@kvdhanush0608</a>\n' +
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
