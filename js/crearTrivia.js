function createTrivia() {
    let nombre = document.getElementById("inputNombre").value;
    let categoria = document.getElementById("inputCategoria").value;
    let cantidadPreguntas = document.getElementById("inputCantidadPreguntas").value;
    return setInputPreguntas(nombre, categoria, cantidadPreguntas);
}

function setInputPreguntas(nombre, categoria, cantidadPreguntas) {
    let trivia = document.getElementById("trivia");
    preguntas = `
        <div>
            <h2>${nombre}</h2>
            <h4>${categoria}</h4>
        </div>
    `
    for(let i in Array.from({length: cantidadPreguntas}, (x, i) => i)){
        preguntas = preguntas.concat(`
        <div class="mb-3">
            <label for="inputPregunta${i}" class="form-label">Pregunta ${i}</label>
            <input type="text" class="form-control" id="inputPregunta${i}" aria-describedby="pregunta${i}Help">
            <div id="pregunta${i}Help" class="form-text">Ingresa la cantidad de preguntas</div>
        </div>
        <div class="mb-3">
            <div class="col-3">
                <label class="form-label">A</label>
                <input type="text" class="form-control">
            </div>
            <div class="col-3">
                <label class="form-label">B</label>
                <input type="text" class="form-control">
            </div>
            <div class="col-3">
                <label class="form-label">C</label>
                <input type="text" class="form-control">
            </div>
            <div class="col-3">
                <label class="form-label">D</label>
                <input type="text" class="form-control">
            </div>
        </div>
        `)
    }
    preguntas = preguntas.concat(`
        <div>
            <a href="../index.html" class="btn btn-outline-mora">Volver</a>
            <button id="send-trivia" class="btn btn-mora">Crear</button>
        </div>
    `)
    trivia.innerHTML = preguntas;
}

 document.getElementById("create-trivia").addEventListener("click", createTrivia);
 

