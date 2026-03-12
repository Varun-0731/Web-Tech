const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

const getGrade = (avg) => {
  if (avg >= 90) return 'A+';
  if (avg >= 80) return 'A';
  if (avg >= 70) return 'B';
  if (avg >= 60) return 'C';
  return 'D';
};

const buildCodeHTML = (name, m1, m2, m3) => `<span class="c">// ES6 Variable Declarations</span>
<span class="k">let</span>   <span class="v">studentName</span> = <span class="s">"${name}"</span>;
<span class="k">let</span>   <span class="v">mark1</span>       = <span class="n">${m1}</span>;
<span class="k">let</span>   <span class="v">mark2</span>       = <span class="n">${m2}</span>;
<span class="k">let</span>   <span class="v">mark3</span>       = <span class="n">${m3}</span>;

<span class="c">// Arrow Function</span>
<span class="k">const</span> <span class="fn">calculateAverage</span> = (m1, m2, m3) => {
    <span class="k">return</span> (m1 + m2 + m3) / <span class="n">3</span>;
}

<span class="c">// Template Literals</span>
<span class="k">let</span> <span class="v">total</span>   = <span class="v">mark1</span> + <span class="v">mark2</span> + <span class="v">mark3</span>;
<span class="k">let</span> <span class="v">average</span> = <span class="fn">calculateAverage</span>(<span class="v">mark1</span>, <span class="v">mark2</span>, <span class="v">mark3</span>);

console.<span class="fn">log</span>(\`Student Name  : \${studentName}\`);
console.<span class="fn">log</span>(\`Total Marks   : \${total}\`);
console.<span class="fn">log</span>(\`Average Marks : \${average.toFixed(2)}\`);`;

const updateCode = () => {
  const name = document.getElementById('name').value || 'Arun';
  const m1   = document.getElementById('m1').value  || 0;
  const m2   = document.getElementById('m2').value  || 0;
  const m3   = document.getElementById('m3').value  || 0;
  document.getElementById('codeBlock').innerHTML = buildCodeHTML(name, m1, m2, m3);
};

const runCode = () => {
  const studentName = document.getElementById('name').value  || 'Arun';
  const mark1       = parseFloat(document.getElementById('m1').value) || 0;
  const mark2       = parseFloat(document.getElementById('m2').value) || 0;
  const mark3       = parseFloat(document.getElementById('m3').value) || 0;

  const total   = mark1 + mark2 + mark3;
  const average = calculateAverage(mark1, mark2, mark3);
  const grade   = getGrade(average);

  ['l0', 'l1', 'l2', 'l3'].forEach(id => {
    document.getElementById(id).classList.remove('show');
  });

  setTimeout(() => {
    const l0 = document.getElementById('l0');
    l0.innerHTML = `<span class="prompt">$</span><span style="color:var(--subtle);font-size:0.72rem">node main.js</span>`;
    l0.classList.add('show');
  }, 50);

  setTimeout(() => {
    document.getElementById('outName').textContent = studentName;
    document.getElementById('l1').classList.add('show');
  }, 250);

  setTimeout(() => {
    document.getElementById('outTotal').textContent = total;
    document.getElementById('l2').classList.add('show');
  }, 450);

  setTimeout(() => {
    document.getElementById('outAvg').textContent = average.toFixed(2);
    document.getElementById('l3').classList.add('show');
  }, 650);

  setTimeout(() => {
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statAvg').textContent   = average.toFixed(2);
    document.getElementById('statGrade').textContent = grade;
  }, 700);
};

document.addEventListener('DOMContentLoaded', () => {
  updateCode();
  ['name', 'm1', 'm2', 'm3'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateCode);
  });
});