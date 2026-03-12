const getGrade = (marks) => {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  return 'F';
};

const buildPreview = (id, name, dept, marks) => {
  const grade = getGrade(Number(marks));
  return `<span class="sp">const</span> <span class="sv">student</span> <span class="sp">=</span> <span class="sp">{</span>
  <span class="sk">id</span><span class="sp">:</span>         <span class="sn">${id}</span><span class="sp">,</span>
  <span class="sk">name</span><span class="sp">:</span>       <span class="ss">"${name}"</span><span class="sp">,</span>
  <span class="sk">department</span><span class="sp">:</span> <span class="ss">"${dept}"</span><span class="sp">,</span>
  <span class="sk">marks</span><span class="sp">:</span>      <span class="sn">${marks}</span>
<span class="sp">};</span>

<span class="sp">const</span> <span class="sp">{</span> <span class="sk">id</span><span class="sp">,</span> <span class="sk">name</span><span class="sp">,</span> <span class="sk">department</span><span class="sp">,</span> <span class="sk">marks</span> <span class="sp">}</span> <span class="sp">=</span> <span class="sv">student</span><span class="sp">;</span>
<span class="sv">console</span><span class="sp">.</span><span class="sk">log</span><span class="sp">(</span><span class="sk">id</span><span class="sp">,</span> <span class="sk">name</span><span class="sp">,</span> <span class="sk">department</span><span class="sp">,</span> <span class="sk">marks</span><span class="sp">);</span>

<span class="sp">const</span> <span class="sv">updatedStudent</span> <span class="sp">=</span> <span class="sp">{</span>
  <span class="sp">...</span><span class="sv">student</span><span class="sp">,</span>
  <span class="sk">grade</span><span class="sp">:</span> <span class="ss">"${grade}"</span>
<span class="sp">};</span>
<span class="sv">console</span><span class="sp">.</span><span class="sk">log</span><span class="sp">(</span><span class="sv">updatedStudent</span><span class="sp">);</span>`;
};

const renderTerminal = (id, name, dept, marks, grade) => {
  const terminal = document.getElementById('terminal');
  terminal.innerHTML = '';

  const lines = [
    { prompt: '$', html: `<span class="t-value" style="color:#666;font-size:0.7rem">node student.js</span>` },
    { prompt: '›', html: `<span class="t-value">${id} &nbsp;${name} &nbsp;${dept} &nbsp;${marks}</span>` },
    {
      prompt: '›',
      html: `<span class="t-brace">{</span> <span class="t-key">id:</span> <span class="t-value">${id}</span><span class="t-brace">,</span> <span class="t-key">name:</span> <span class="t-value">'${name}'</span><span class="t-brace">,</span> <span class="t-key">department:</span> <span class="t-value">'${dept}'</span><span class="t-brace">,</span> <span class="t-key">marks:</span> <span class="t-value">${marks}</span><span class="t-brace">,</span> <span class="t-key">grade:</span> <span class="t-value">'${grade}'</span> <span class="t-brace">}</span>`
    }
  ];

  lines.forEach((line, i) => {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = `<span class="t-prompt">${line.prompt}</span>${line.html}`;
    terminal.appendChild(div);
    setTimeout(() => div.classList.add('show'), 80 + i * 180);
  });
};

const renderCards = (id, name, dept, marks, grade) => {
  const grid = document.getElementById('objGrid');
  grid.innerHTML = '';

  const entries = [
    { key: 'id',         value: id,    isNew: false },
    { key: 'name',       value: name,  isNew: false },
    { key: 'department', value: dept,  isNew: false },
    { key: 'marks',      value: marks, isNew: false },
    { key: 'grade',      value: grade, isNew: true  },
  ];

  entries.forEach((entry, i) => {
    const card = document.createElement('div');
    card.className = 'obj-card' + (entry.isNew ? ' new-prop' : '');
    card.innerHTML = `<div class="obj-key">${entry.key}</div><div class="obj-value">${entry.value}</div>`;
    grid.appendChild(card);
    setTimeout(() => card.classList.add('show'), 500 + i * 100);
  });
};

const run = () => {
  const id    = document.getElementById('fId').value    || '101';
  const name  = document.getElementById('fName').value  || 'Priya';
  const dept  = document.getElementById('fDept').value  || 'CSE';
  const marks = document.getElementById('fMarks').value || '92';
  const grade = getGrade(Number(marks));

  renderTerminal(id, name, dept, marks, grade);
  renderCards(id, name, dept, marks, grade);
};

const updatePreview = () => {
  const id    = document.getElementById('fId').value    || '101';
  const name  = document.getElementById('fName').value  || 'Priya';
  const dept  = document.getElementById('fDept').value  || 'CSE';
  const marks = document.getElementById('fMarks').value || '92';
  document.getElementById('codePreview').innerHTML = buildPreview(id, name, dept, marks);
};

document.addEventListener('DOMContentLoaded', () => {
  updatePreview();
  ['fId', 'fName', 'fDept', 'fMarks'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
  });
  document.getElementById('runBtn').addEventListener('click', run);
});