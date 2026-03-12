class Course {
  constructor(courseName, instructor) {
    this.courseName = courseName;
    this.instructor = instructor;
  }

  displayCourse() {
    return `Course: ${this.courseName}, Instructor: ${this.instructor}`;
  }
}

const enrollCourse = (seatsAvailable) => {
  return new Promise((resolve, reject) => {
    if (seatsAvailable) {
      resolve("Enrollment Successful");
    } else {
      reject("Course Full");
    }
  });
};

const buildPreview = (courseName, instructor, totalSeats, enrolled) => {
  const seatsAvailable = enrolled < totalSeats;
  return `<span class="kw">class</span> <span class="cl">Course</span> <span class="pm">{</span>
  <span class="mt">constructor</span><span class="pm">(</span>courseName<span class="pm">,</span> instructor<span class="pm">) {</span>
    <span class="kw">this</span>.courseName <span class="pm">=</span> courseName<span class="pm">;</span>
    <span class="kw">this</span>.instructor <span class="pm">=</span> instructor<span class="pm">;</span>
  <span class="pm">}</span>

  <span class="mt">displayCourse</span><span class="pm">() {</span>
    console.<span class="mt">log</span><span class="pm">(</span><span class="st">\`Course: \${this.courseName}, Instructor: \${this.instructor}\`</span><span class="pm">);</span>
  <span class="pm">}</span>
<span class="pm">}</span>

<span class="kw">let</span> course1 <span class="pm">=</span> <span class="kw">new</span> <span class="cl">Course</span><span class="pm">(</span><span class="st">"${courseName}"</span><span class="pm">,</span> <span class="st">"${instructor}"</span><span class="pm">);</span>
course1.<span class="mt">displayCourse</span><span class="pm">();</span>

<span class="kw">let</span> seatsAvailable <span class="pm">=</span> <span class="nm">${seatsAvailable}</span><span class="pm">;</span>  <span class="cm">// ${enrolled}/${totalSeats} enrolled</span>

<span class="kw">let</span> enrollCourse <span class="pm">=</span> <span class="kw">new</span> <span class="cl">Promise</span><span class="pm">((</span>resolve<span class="pm">,</span> reject<span class="pm">) => {</span>
  <span class="kw">if</span> <span class="pm">(</span>seatsAvailable<span class="pm">)</span>
    resolve<span class="pm">(</span><span class="st">"Enrollment Successful"</span><span class="pm">);</span>
  <span class="kw">else</span>
    reject<span class="pm">(</span><span class="st">"Course Full"</span><span class="pm">);</span>
<span class="pm">});</span>

enrollCourse
  <span class="pm">.</span><span class="mt">then</span><span class="pm">(</span>msg <span class="pm">=></span> console.<span class="mt">log</span><span class="pm">(</span>msg<span class="pm">))</span>
  <span class="pm">.</span><span class="mt">catch</span><span class="pm">(</span>err <span class="pm">=></span> console.<span class="mt">log</span><span class="pm">(</span>err<span class="pm">));</span>`;
};

const renderTerminal = (displayText, enrollMsg, isSuccess) => {
  const terminal = document.getElementById('terminal');
  terminal.innerHTML = '';

  const lines = [
    { prompt: '$', cls: 't-dim',  text: 'node main.js' },
    { prompt: '›', cls: 't-out',  text: displayText },
    { prompt: '›', cls: isSuccess ? 't-ok' : 't-err', text: enrollMsg },
  ];

  lines.forEach((line, i) => {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = `<span class="t-prompt">${line.prompt}</span><span class="${line.cls}">${line.text}</span>`;
    terminal.appendChild(div);
    setTimeout(() => div.classList.add('show'), 60 + i * 200);
  });
};

const renderStatus = (totalSeats, enrolled, isSuccess, enrollMsg) => {
  const body = document.getElementById('statusBody');
  const available = totalSeats - enrolled;
  const pct = totalSeats > 0 ? Math.min((enrolled / totalSeats) * 100, 100) : 0;
  const statusCls = isSuccess ? 'success' : 'fail';
  const valCls    = isSuccess ? 'ok' : 'bad';

  body.innerHTML = `
    <div class="info-box ${statusCls}">
      <div class="info-key">Promise Result</div>
      <div class="info-val ${valCls}">${isSuccess ? '✓' : '✗'}</div>
      <div class="info-sub">${enrollMsg}</div>
    </div>
    <div class="info-box">
      <div class="info-key">Seats Available</div>
      <div class="info-val">${available}</div>
      <div class="info-sub">of ${totalSeats} total</div>
    </div>
    <div class="seat-bar-wrap">
      <div class="seat-bar-label">Seat Occupancy</div>
      <div class="seat-bar-track">
        <div class="seat-bar-fill ${valCls}" id="barFill"></div>
      </div>
      <div class="seat-bar-nums">${enrolled} enrolled / ${totalSeats} total</div>
    </div>`;

  setTimeout(() => {
    body.querySelectorAll('.info-box, .seat-bar-wrap').forEach((el, i) => {
      setTimeout(() => el.classList.add('show'), i * 100 + 400);
    });
  }, 10);

  setTimeout(() => {
    const fill = document.getElementById('barFill');
    if (fill) fill.style.width = pct + '%';
  }, 500);
};

const updatePreview = () => {
  const courseName = document.getElementById('fCourse').value     || 'Web Technologies';
  const instructor = document.getElementById('fInstructor').value || 'Dr. Kumar';
  const totalSeats = parseInt(document.getElementById('fSeats').value)    || 30;
  const enrolled   = parseInt(document.getElementById('fEnrolled').value) || 0;
  document.getElementById('codePreview').innerHTML = buildPreview(courseName, instructor, totalSeats, enrolled);
};

const run = () => {
  const courseName = document.getElementById('fCourse').value     || 'Web Technologies';
  const instructor = document.getElementById('fInstructor').value || 'Dr. Kumar';
  const totalSeats = parseInt(document.getElementById('fSeats').value)    || 30;
  const enrolled   = parseInt(document.getElementById('fEnrolled').value) || 0;

  const course1        = new Course(courseName, instructor);
  const displayText    = course1.displayCourse();
  const seatsAvailable = enrolled < totalSeats;

  enrollCourse(seatsAvailable)
    .then(msg => {
      renderTerminal(displayText, msg, true);
      renderStatus(totalSeats, enrolled, true, msg);
    })
    .catch(err => {
      renderTerminal(displayText, err, false);
      renderStatus(totalSeats, enrolled, false, err);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  updatePreview();
  ['fCourse', 'fInstructor', 'fSeats', 'fEnrolled'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
  });
  document.getElementById('runBtn').addEventListener('click', run);
});