let data;
let index = 0;
let score = 0;

fetch("SOA_test.json")
  .then(res => res.json())
  .then(json => {
    data = json.questions;
    showQuestion();
  });

function showQuestion() {
  const q = data[index];
  let html = `<h3>Pregunta ${index + 1}</h3><p>${q.question}</p>`;

  q.options.forEach(opt => {
    html += `
      <label>
        <input type="radio" name="opt" value="${opt}"> ${opt}
      </label><br>`;
  });

  html += `<button onclick="check()">Responder</button>`;
  document.getElementById("quiz").innerHTML = html;
}

function check() {
  const selected = document.querySelector("input[name=opt]:checked");
  if (!selected) return;

  const correct = data[index].correct_answer;
  let result = "";

  if (selected.value === correct) {
    score++;
    result = `<p style="color:green;font-weight:bold">Correcto</p>`;
  } else {
    result = `<p style="color:red;font-weight:bold">
      Incorrecto. Correcta: ${correct}
    </p>`;
  }

  index++;
  if (index < data.length) {
    document.getElementById("quiz").innerHTML = result;
    setTimeout(showQuestion, 1200);
  } else {
    document.getElementById("quiz").innerHTML =
      `<h2>Fin del test</h2>
       <p>Puntuación: ${score} / ${data.length}</p>`;
  }
}
