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
    
    //Se realiza un mapeo para encontrar los valores de las respuestas correctas que seran almacenados en el arreglo correctas
    let correctas = preguntas.map( (question) => {
        let corrects = question.respuestas;
        corrects = corrects.filter((respuestas) => {
            return respuestas.valor === 1;
        });
        let lista = corrects.reduce((total, respuestasRight) => {
            return total.concat(respuestasRight.texto);
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
            translateX: 50,
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
        .then(result => data = result)
        .catch(error => {
            fetch("js/data.json")
            .then((res) => res.json())
            .then((result) => data = result);
        })
        .finally(() => {
            document.querySelector("#loading").style.display = "none";
            document.querySelector("#start-button").style.display = "inline-block";
            data = {
                "nombre": "Cuanto sabes de ",
                "categoria": "geografia",
                "preguntas": [
                    {
                        "texto": "¿Cual es la capital de Chile?",
                        "respuestas": [
                            {
                                "valor": 1,
                                "texto": "Santiago"
                            },
                            {
                                "valor": 0,
                                "texto": "Temuco"
                            },
                            {
                                "valor": 0,
                                "texto": "Medellin"
                            },
                            {
                                "valor": 0,
                                "texto": "Buenos Aires"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de Francia?",
                        "respuestas": [
                            {
                                "valor": 0,
                                "texto": "Madrid"
                            },
                            {
                                "valor": 0,
                                "texto": "Berlin"
                            },
                            {
                                "valor": 0,
                                "texto": "Praga"
                            },
                            {
                                "valor": 1,
                                "texto": "Paris"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de Italia?",
                        "respuestas": [
                            {
                                "valor": 0,
                                "texto": "Milán"
                            },
                            {
                                "valor": 0,
                                "texto": "Nápoles"
                            },
                            {
                                "valor": 1,
                                "texto": "Roma"
                            },
                            {
                                "valor": 0,
                                "texto": "Venecia"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de España?",
                        "respuestas": [
                            {
                                "valor": 1,
                                "texto": "Madrid"
                            },
                            {
                                "valor": 0,
                                "texto": "Valencia"
                            },
                            {
                                "valor": 0,
                                "texto": "Barcelona"
                            },
                            {
                                "valor": 0,
                                "texto": "Sevilla"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de Japón?",
                        "respuestas": [
                            {
                                "valor": 0,
                                "texto": "Seul"
                            },
                            {
                                "valor": 0,
                                "texto": "Fukushima"
                            },
                            {
                                "valor": 1,
                                "texto": "Tokio"
                            },
                            {
                                "valor": 0,
                                "texto": "Okinawa"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de China?",
                        "respuestas": [
                            {
                                "valor": 0,
                                "texto": "Beijing"
                            },
                            {
                                "valor": 0,
                                "texto": "Bangkok"
                            },
                            {
                                "valor": 0,
                                "texto": "Hong Kong"
                            },
                            {
                                "valor": 1,
                                "texto": "Pekin"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de Alemania?",
                        "respuestas": [
                            {
                                "valor": 0,
                                "texto": "Praga"
                            },
                            {
                                "valor": 1,
                                "texto": "Berlin"
                            },
                            {
                                "valor": 0,
                                "texto": "Versalles"
                            },
                            {
                                "valor": 0,
                                "texto": "Oslo"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de Rusia?",
                        "respuestas": [
                            {
                                "valor": 1,
                                "texto": "Moscú"
                            },
                            {
                                "valor": 0,
                                "texto": "Lima"
                            },
                            {
                                "valor": 0,
                                "texto": "Tokio"
                            },
                            {
                                "valor": 0,
                                "texto": "Lisboa"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de Eslovenia?",
                        "respuestas": [
                            {
                                "valor": 1,
                                "texto": "Liubliana"
                            },
                            {
                                "valor": 0,
                                "texto": "Doha"
                            },
                            {
                                "valor": 0,
                                "texto": "Bruselas"
                            },
                            {
                                "valor": 0,
                                "texto": "Beirut"
                            }
                        ]
                    },
                    {
                        "texto": "¿Cual es la capital de Lituania?",
                        "respuestas": [
                            {
                                "valor": 0,
                                "texto": "Luxemburgo"
                            },
                            {
                                "valor": 0,
                                "texto": "Riga"
                            },
                            {
                                "valor": 0,
                                "texto": "Luanda"
                            },
                            {
                                "valor": 1,
                                "texto": "Vilna"
                            }
                        ]
                    }
                ]
            }
        });
    
    
}

window.addEventListener("load", animateTitle);
window.addEventListener("load", loadData);