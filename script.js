/* ═══════════════════════════════════════════
   ATS RESUME BUILDER — script.js
   Handles: dynamic form entries, Claude API call,
            resume output, copy, and download.
═══════════════════════════════════════════ */

// ── Counter IDs for dynamic entries ──
let expCount = 0;
let eduCount = 0;
let projCount = 0;
let leadCount = 0;

// ─────────────────────────────────────────
// ADD EDUCATION ENTRY
// ─────────────────────────────────────────
function addEdu() {
  eduCount++;
  const id = eduCount;
  const container = document.getElementById('edu-list');
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = 'edu-' + id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('edu-${id}')" aria-label="Remove education">&#10005; Remove</button>
    <div class="field-row two">
      <div class="field">
        <label>Degree / Program</label>
        <input type="text" class="edu-degree" placeholder="Bachelor's in Engineering" />
      </div>
      <div class="field">
        <label>Institution</label>
        <input type="text" class="edu-school" placeholder="Sagarmatha Engineering College" />
      </div>
    </div>
    <div class="field-row two">
      <div class="field">
        <label>Year / Duration</label>
        <input type="text" class="edu-year" placeholder="2019 – 2025" />
      </div>
      <div class="field">
        <label>Specialization / Board <span class="hint">(optional)</span></label>
        <input type="text" class="edu-spec" placeholder="Tribhuvan University" />
      </div>
    </div>
  `;
  container.appendChild(div);
}

// ─────────────────────────────────────────
// ADD EXPERIENCE ENTRY
// ─────────────────────────────────────────
function addExp() {
  expCount++;
  const id = expCount;
  const container = document.getElementById('exp-list');
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = 'exp-' + id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('exp-${id}')" aria-label="Remove experience">&#10005; Remove</button>
    <div class="field-row two">
      <div class="field">
        <label>Job Title</label>
        <input type="text" class="exp-title" placeholder="Visiting Lecturer" />
      </div>
      <div class="field">
        <label>Organisation</label>
        <input type="text" class="exp-org" placeholder="Space Academy Narephat" />
      </div>
    </div>
    <div class="field-row two">
      <div class="field">
        <label>Start Date</label>
        <input type="text" class="exp-start" placeholder="Jan 2025" />
      </div>
      <div class="field">
        <label>End Date</label>
        <input type="text" class="exp-end" placeholder="Present" />
      </div>
    </div>
    <div class="field">
      <label>Key Responsibilities &amp; Achievements</label>
      <textarea class="exp-bullets" rows="3" placeholder="• Delivered lectures on Digital Control Systems to 60+ undergraduate students&#10;• Achieved 95% pass rate across all taught modules"></textarea>
    </div>
  `;
  container.appendChild(div);
}

// ─────────────────────────────────────────
// ADD PROJECT ENTRY
// ─────────────────────────────────────────
function addProj() {
  projCount++;
  const id = projCount;
  const container = document.getElementById('proj-list');
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = 'proj-' + id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('proj-${id}')" aria-label="Remove project">&#10005; Remove</button>
    <div class="field-row two">
      <div class="field">
        <label>Project Name</label>
        <input type="text" class="proj-name" placeholder="C-Programming Learning Platform" />
      </div>
      <div class="field">
        <label>Duration / Year</label>
        <input type="text" class="proj-year" placeholder="2025 – Present" />
      </div>
    </div>
    <div class="field">
      <label>Description &amp; Key Contributions</label>
      <textarea class="proj-desc" rows="3" placeholder="• Built a structured learning platform for IOE-level C programming&#10;• Helped 200+ students prepare for engineering exams effectively"></textarea>
    </div>
  `;
  container.appendChild(div);
}

// ─────────────────────────────────────────
// ADD LEADERSHIP ENTRY
// ─────────────────────────────────────────
function addLead() {
  leadCount++;
  const id = leadCount;
  const container = document.getElementById('lead-list');
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = 'lead-' + id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('lead-${id}')" aria-label="Remove role">&#10005; Remove</button>
    <div class="field-row two">
      <div class="field">
        <label>Role / Title</label>
        <input type="text" class="lead-role" placeholder="Vice-President" />
      </div>
      <div class="field">
        <label>Organisation</label>
        <input type="text" class="lead-org" placeholder="SEIES Society" />
      </div>
    </div>
    <div class="field-row two">
      <div class="field">
        <label>Duration</label>
        <input type="text" class="lead-duration" placeholder="May 2023 – May 2024" />
      </div>
      <div class="field">
        <label>Key Contributions <span class="hint">(optional)</span></label>
        <input type="text" class="lead-desc" placeholder="Led events, coordinated teams of 20+" />
      </div>
    </div>
  `;
  container.appendChild(div);
}

// ─────────────────────────────────────────
// REMOVE ANY ENTRY BLOCK
// ─────────────────────────────────────────
function removeEntry(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ─────────────────────────────────────────
// GATHER ALL FORM DATA
// ─────────────────────────────────────────
function gatherData() {
  // Education
  const education = [...document.querySelectorAll('#edu-list .entry-block')].map(b => ({
    degree:  b.querySelector('.edu-degree')?.value.trim() || '',
    school:  b.querySelector('.edu-school')?.value.trim() || '',
    year:    b.querySelector('.edu-year')?.value.trim()   || '',
    spec:    b.querySelector('.edu-spec')?.value.trim()   || ''
  })).filter(e => e.degree || e.school);

  // Experience
  const experience = [...document.querySelectorAll('#exp-list .entry-block')].map(b => ({
    title:   b.querySelector('.exp-title')?.value.trim()   || '',
    org:     b.querySelector('.exp-org')?.value.trim()     || '',
    start:   b.querySelector('.exp-start')?.value.trim()   || '',
    end:     b.querySelector('.exp-end')?.value.trim()     || '',
    bullets: b.querySelector('.exp-bullets')?.value.trim() || ''
  })).filter(e => e.title || e.org);

  // Projects
  const projects = [...document.querySelectorAll('#proj-list .entry-block')].map(b => ({
    name: b.querySelector('.proj-name')?.value.trim() || '',
    year: b.querySelector('.proj-year')?.value.trim() || '',
    desc: b.querySelector('.proj-desc')?.value.trim() || ''
  })).filter(p => p.name);

  // Leadership
  const leadership = [...document.querySelectorAll('#lead-list .entry-block')].map(b => ({
    role:     b.querySelector('.lead-role')?.value.trim()     || '',
    org:      b.querySelector('.lead-org')?.value.trim()      || '',
    duration: b.querySelector('.lead-duration')?.value.trim() || '',
    desc:     b.querySelector('.lead-desc')?.value.trim()     || ''
  })).filter(l => l.role || l.org);

  return {
    name:         document.getElementById('name')?.value.trim()         || '',
    role:         document.getElementById('role')?.value.trim()         || '',
    email:        document.getElementById('email')?.value.trim()        || '',
    phone:        document.getElementById('phone')?.value.trim()        || '',
    location:     document.getElementById('location')?.value.trim()     || '',
    linkedin:     document.getElementById('linkedin')?.value.trim()     || '',
    summary:      document.getElementById('summary')?.value.trim()      || '',
    techSkills:   document.getElementById('tech-skills')?.value.trim()  || '',
    toolSkills:   document.getElementById('tool-skills')?.value.trim()  || '',
    softSkills:   document.getElementById('soft-skills')?.value.trim()  || '',
    achievements: document.getElementById('achievements')?.value.trim() || '',
    jd:           document.getElementById('jd')?.value.trim()           || '',
    education,
    experience,
    projects,
    leadership
  };
}

// ─────────────────────────────────────────
// BUILD THE PROMPT FOR CLAUDE
// ─────────────────────────────────────────
function buildPrompt(d) {
  const eduText = d.education.length
    ? d.education.map(e =>
        `- ${e.degree}${e.spec ? ', ' + e.spec : ''}\n  ${e.school}${e.year ? '  |  ' + e.year : ''}`
      ).join('\n')
    : 'Not provided';

  const expText = d.experience.length
    ? d.experience.map(e =>
        `- ${e.title} | ${e.org} (${e.start} – ${e.end})\n${e.bullets}`
      ).join('\n\n')
    : 'Not provided';

  const projText = d.projects.length
    ? d.projects.map(p =>
        `- ${p.name}${p.year ? '  |  ' + p.year : ''}\n${p.desc}`
      ).join('\n\n')
    : 'None';

  const leadText = d.leadership.length
    ? d.leadership.map(l =>
        `- ${l.role}${l.org ? ', ' + l.org : ''}${l.duration ? '  |  ' + l.duration : ''}${l.desc ? '\n  ' + l.desc : ''}`
      ).join('\n')
    : 'None';

  return `You are a professional resume writer specialising in ATS-optimised resumes. Generate a clean, structured, plain-text resume using EXACTLY the format described below.

=== CANDIDATE DATA ===
Name: ${d.name || 'Not provided'}
Target Role: ${d.role || 'Not provided'}
Email: ${d.email || 'Not provided'}
Phone: ${d.phone || 'Not provided'}
Location: ${d.location || 'Not provided'}
LinkedIn / Portfolio: ${d.linkedin || 'Not provided'}

SUMMARY:
${d.summary || 'Not provided'}

EDUCATION:
${eduText}

SKILLS:
Technical Skills: ${d.techSkills || 'Not provided'}
Tool-Based Skills: ${d.toolSkills || 'Not provided'}
Soft Skills: ${d.softSkills || 'Not provided'}

PROFESSIONAL EXPERIENCE:
${expText}

PROJECTS:
${projText}

LEADERSHIP & COORDINATION:
${leadText}

ACHIEVEMENTS & CERTIFICATIONS:
${d.achievements || 'None provided'}

${d.jd ? `JOB DESCRIPTION TO TAILOR FOR:\n${d.jd}` : ''}

=== OUTPUT FORMAT RULES (follow precisely) ===
1. Header: Candidate name in ALL CAPS on line 1. Contact details on line 2 separated by the diamond symbol ⋄. Email and LinkedIn on line 3 similarly separated.
2. Each section heading in ALL CAPS (e.g. SUMMARY, EDUCATION, SKILLS, PROFESSIONAL EXPERIENCES, ENGINEERING PROJECTS, LEADERSHIP & COORDINATION, ACHIEVEMENTS AND CERTIFICATION).
3. Under EDUCATION: show degree name and year range right-aligned on the same line (use spacing), then institution name on next line. Mirror Ayan's resume style.
4. Under SKILLS: show three rows — "Technical Skills", "Tool Based Skills", "Soft Skills" — each followed by a tab or spaces then the comma-separated values.
5. Under PROFESSIONAL EXPERIENCES: show job title and date range on same line (date right-aligned using spacing), organisation on next line, then bullet points starting with •.
6. Under projects: show project name and date range on same line, then bullet points.
7. Use strong action verbs. Quantify achievements wherever possible.
8. If a job description is provided, embed relevant ATS keywords naturally.
9. Keep total length to 1–2 pages of content.
10. Output ONLY the plain-text resume — no preamble, no commentary, no markdown, no code fences.`;
}

// ─────────────────────────────────────────
// MAIN GENERATE FUNCTION
// ─────────────────────────────────────────
async function generate() {
  const data = gatherData();

  if (!data.name && !data.role) {
    setStatus('Please fill in at least your name and target role.');
    return;
  }

  const btn = document.getElementById('gen-btn');
  const statusEl = document.getElementById('status');
  const outputEl = document.getElementById('resume-output');
  const placeholderEl = document.getElementById('output-placeholder');
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');

  // Loading state
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Generating…';
  setStatus('Claude is crafting your resume…');
  outputEl.style.display = 'none';
  placeholderEl.style.display = 'flex';
  copyBtn.disabled = true;
  downloadBtn.disabled = true;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: buildPrompt(data) }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${response.status}`);
    }

    const result = await response.json();
    const text = (result.content || [])
      .map(block => block.type === 'text' ? block.text : '')
      .join('');

    if (!text.trim()) throw new Error('Empty response from API.');

    // Display resume
    outputEl.textContent = text;
    outputEl.style.display = 'block';
    placeholderEl.style.display = 'none';
    copyBtn.disabled = false;
    downloadBtn.disabled = false;
    setStatus('Resume ready! Copy or download it below.');

  } catch (err) {
    console.error('Generation error:', err);
    setStatus('Error: ' + err.message + '. Please try again.');
  }

  // Reset button
  btn.disabled = false;
  btn.innerHTML = '<span class="btn-shine"></span>&#10024; Regenerate Resume';
}

// ─────────────────────────────────────────
// COPY TO CLIPBOARD
// ─────────────────────────────────────────
function copyResume() {
  const text = document.getElementById('resume-output').textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = '📋 Copy'; }, 2500);
  }).catch(() => {
    // Fallback for browsers without clipboard API
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

// ─────────────────────────────────────────
// DOWNLOAD AS .TXT
// ─────────────────────────────────────────
function downloadResume() {
  const text = document.getElementById('resume-output').textContent;
  if (!text) return;

  const name = document.getElementById('name').value.trim().replace(/\s+/g, '_') || 'Resume';
  const filename = name + '_ATS_Resume.txt';

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────
// HELPER: set status message
// ─────────────────────────────────────────
function setStatus(msg) {
  const el = document.getElementById('status');
  if (el) el.textContent = msg;
}

// ─────────────────────────────────────────
// INIT: pre-add one entry of each type
// ─────────────────────────────────────────
(function init() {
  addEdu();
  addExp();
  addProj();
})();
