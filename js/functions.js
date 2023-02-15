let num = 0;
let respuestas = [];
data = '';

$.fn.isValid = function(){
    return this[0].checkValidity()
  }

function questionCounter(){
    let count = 0;
    return function() {
        if (count >= 9) {
            return count;
        }
        else{
            return count++;
        }
    }
}

function completeTrivia() {
    $(document).ready(function () {
        $(".trivia-quest-num").text("Pregunta " + (num+1));
        $("#trivia-quest").text(data.preguntas[num].texto)
        let i = 0;
        $("input.option").each( function () {
            $(this).val(data.preguntas[num].respuestas[i].texto);
            i++;
        });
        let j = 0;
        $("label").each( function () {
            $(this).text(data.preguntas[num].respuestas[j].texto);  
            j++;
        });
        $(":checked").prop('checked', false);
    })
}

function nextQuestion() {
    if (num < 9 && $("#trivia-select").isValid()){
        $("#trivia-select").removeClass("was-validated");
        respuestas.push($(":checked").val());
        num++;
    }
    else if (num === 9) {
        respuestas.push($(":checked").val());
        $(".hide-on-finish").hide();
        $("#puntuacion").show();
        $("#puntuacion>h3>span").text(checkpreguntas());
        $(".siguiente").hide();
        $(".volver").show();
        return;
    }
    else {
        $("#trivia-select").addClass("was-validated");
    }
    completeTrivia();
}

function checkpreguntas() {
    let preguntas = data.preguntas;
    let correctas = preguntas.map( (question) => {
        let corrects = question.respuestas;
        corrects = corrects.filter((respuestas) => {
            return respuestas.valor === 1;
        });
        let lista = corrects.reduce((total, respuestasRight) => {
            return total.concat(respuestasRight.text);
        },[]);
        
        return lista[0];
    });
    let puntuacion = 0;
    for (i in respuestas) {
        if (correctas[i] === respuestas[i]){
            puntuacion++;
        }
    }

    return puntuacion;
}

function animateTitle() {
    let textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.ml2 .letter',
            scale: [4, 1],
            opacity: [0, 1],
            trrespuestaslateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i
        });
}

function animateOptions() {
    document.querySelectorAll('.aoption').forEach((option) =>{
        option.style.cssText = "position: relative; left: -50px;";
    });

    anime.timeline()
        .add({
            targets: '.aoption',
            trrespuestaslateX: 50,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 500,
            delay: (el, i) => 500 * i
        })
}

function loadData() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/trivia/6", requestOptions)
        .then(response => response.json())
        .then(result => {
            data = result;
        })
        .catch(error => {
            console.log('error', error);
            fetch("js/data.json")
            .then((res) => res.json())
            .then((result) => data = result);
        })
        .finally(() => {
            document.querySelector("#loading").style.display = "none";
            document.querySelector("#start-button").style.display = "inline-block";
        });
    
    
}

window.addEventListener("load", animateTitle);
window.addEventListener("load", loadData);