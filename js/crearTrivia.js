function createTrivia() {
    let nombre = document.getElementById("inputNombre");
    let categoria = document.getElementById("inputCategoria");
    let cantidadPreguntas = document.getElementById("inputCantidadPreguntas").value;
    return setInputPreguntas(nombre, categoria, cantidadPreguntas);
}

function setInputPreguntas(nombre, categoria, cantidadPreguntas) {
    let trivia = document.getElementById("trivia");
    preguntas = ''
    for(let i in Array.from({length: cantidadPreguntas}, (x, i) => i)){
        preguntas = preguntas.concat(`
        <div class="mb-3">
            <label for="inputPregunta${i}" class="form-label">Pregunta ${i}</label>
            <input type="text" class="form-control" id="inputPregunta${i}" aria-describedby="pregunta${i}Help">
            <div id="pregunta${i}Help" class="form-text">Ingresa la cantidad de preguntas</div>
        </div>
        `)
    }
    trivia.innerHTML = preguntas;
}

let trivia = document.getElementById("create-trivia").addEventListener("click", createTrivia);