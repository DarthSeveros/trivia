let num = 0
let respuestas = []

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
        $("#trivia-quest").text(data[0].questions[num].quest)
        let i = 0;
        $("input.option").each( function () {
            $(this).val(data[0].questions[num].ans[i].text);
            i++;
        });
        let j = 0;
        $("label").each( function () {
            $(this).text(data[0].questions[num].ans[j].text);  
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
        $("#puntuacion>h3>span").text(checkQuestions());
        $(".siguiente").hide();
        $(".volver").show();
        return;
    }
    else {
        $("#trivia-select").addClass("was-validated");
    }
    completeTrivia();
}

function checkQuestions() {
    let preguntas = data[0].questions;
    let correctas = preguntas.map( (question) => {
        let corrects = question.ans;
        corrects = corrects.filter((ans) => {
            return ans.value === 1;
        });
        let lista = corrects.reduce((total, ansRight) => {
            return total.concat(ansRight.text);
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
            translateZ: 0,
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
            translateX: 50,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 900,
            delay: (el, i) => 500 * i
        })
}

function animateBackground() {
    
}

window.addEventListener("load", animateTitle);
