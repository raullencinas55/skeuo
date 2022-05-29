const formulario = document.getElementById("formulario");
const datos = document.querySelectorAll("#formulario input, select, textarea");
const aLink = document.querySelectorAll("#formulario fieldset a");
const expresiones = {
    mensaje: /^[a-zA-ZÀ-ÿ\s.,\/#¡!$%\^&\*;:{}=\-_`~()”“"…¿?]{7,250}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    correo: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    telefono: /^[+-]*\d{7,14}$/,
    website: /^h?t?t?p?[s]?:?\/?\/?[\w]+([\.]+[\w]+)+$/
}

const option = document.createElement('option');
option.value = "";
option.text = "selecciona una opcion";
const probarCasos = (casos) => {
    switch (casos.name) {
        case "mensaje":
            validarImput(casos, expresiones.mensaje)
            break;
        case "nombre":
            validarImput(casos, expresiones.nombre)
            break;
        case "apellido":
            validarImput(casos, expresiones.nombre)
            break;
        case "telefono":
            validarImput(casos, expresiones.telefono)
            break;
        case "correo":
            validarImput(casos, expresiones.correo)
            break;
        case "website":
            validarImput(casos, expresiones.website)
            break;
        default:
            validarImput(casos);
            break;
    }
}
const validarFormulario = function (e) {
    probarCasos(e.target);
}
const cambiarCorrecto = (input) => {
    if (input.classList.contains('box_incorrecto')) {
        document.getElementById(`${input.name}`).classList.remove('box_incorrecto');
        document.querySelector(`label[for="${input.name}"]`).classList.remove('label_incorrecto');
    }
}
const cambiarInorrecto = (input) => {
    document.getElementById(`${input.name}`).classList.add('box_incorrecto');
    document.querySelector(`label[for="${input.name}"]`).classList.add('label_incorrecto');
}

const validarImput = (input, expresion) => {
    let expresionFLag = "";
    let inputFLag = "";

    if (input.tagName == "SELECT") {
        document.getElementById(`${input.name}`).getElementsByTagName('option')[0].text = "Seleciona una opción";
    }
    if (input.value == "") {
        cambiarInorrecto(input);
        inputFLag = "incorrecto";
    } else {
        cambiarCorrecto(input);
        inputFLag = "correcto";
    }
    if (expresion == undefined) {

    } else {
        if (expresion.test(input.value)) {
            cambiarCorrecto(input);
            expresionFLag = "correcto";
        } else {
            cambiarInorrecto(input);
            expresionFLag = "incorrecto";
        }
    }
    if (inputFLag == "correcto" && expresionFLag == "correcto") {
        return true;
    } else {
        return false;
    }

}
const validarParte = (array) => {
    array.forEach(element => {
        probarCasos(datos[element]);
    });
}

const comprobar = function (array) {
    arrays = array || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    contador = 0;
    arrays.forEach(elemento => {
        if (datos[elemento].classList.contains('box_incorrecto')) {
            contador++;
        }
    });

    if (contador == 0) {
        return true;
    } else {
        return false;
    }
}

datos.forEach((Element) => {
    Element.addEventListener('keyup', validarFormulario);
    Element.addEventListener('blur', validarFormulario);
});
aLink.forEach((Element) => {
    Element.addEventListener('click', (e) => {

        switch (e.target.innerHTML) {
            case "1":
                document.querySelector("#datos-personales").classList.add('unbloked-portatil');
                document.querySelector("#info-adicional").classList.add('unbloked-portatil');
                document.querySelector("#enviar").classList.add('unbloked-portatil');
                document.querySelector("#tu-proyecto").classList.remove('unbloked-portatil');
                break;
            case "2":
                document.querySelector("#info-adicional").classList.add('unbloked-portatil');
                document.querySelector("#enviar").classList.add('unbloked-portatil');
                document.querySelector("#tu-proyecto").classList.add('unbloked-portatil');
                document.querySelector("#datos-personales").classList.remove('unbloked-portatil');
                break;
            case "3":
                document.querySelector("#datos-personales").classList.add('unbloked-portatil');
                document.querySelector("#tu-proyecto").classList.add('unbloked-portatil');
                document.querySelector("#info-adicional").classList.remove('unbloked-portatil');
                document.querySelector("#enviar").classList.remove('unbloked-portatil');

                break;
            case "Siguiente":

                if (e.target.attributes.id.value == "siguiente-proyecto") {
                    validarParte([0, 1]);
                    if (comprobar([0, 1])) {
                        document.querySelector("#info-adicional").classList.add('unbloked-portatil');
                        document.querySelector("#enviar").classList.add('unbloked-portatil');
                        document.querySelector("#tu-proyecto").classList.add('unbloked-portatil');
                        document.querySelector("#datos-personales").classList.remove('unbloked-portatil');
                    } else {
                        e.preventDefault();
                    }
                } else {
                    validarParte([2, 3, 4, 5]);
                    if (comprobar([2, 3, 4, 5])) {
                        document.querySelector("#datos-personales").classList.add('unbloked-portatil');
                        document.querySelector("#tu-proyecto").classList.add('unbloked-portatil');
                        document.querySelector("#info-adicional").classList.remove('unbloked-portatil');
                        document.querySelector("#enviar").classList.remove('unbloked-portatil');

                    } else {
                        e.preventDefault();
                    }

                }

                break;
            case "Atras":

                if (e.target.attributes.id.value == "atras-adicional") {
                    document.querySelector("#info-adicional").classList.add('unbloked-portatil');
                    document.querySelector("#enviar").classList.add('unbloked-portatil');
                    document.querySelector("#tu-proyecto").classList.add('unbloked-portatil');
                    document.querySelector("#datos-personales").classList.remove('unbloked-portatil');

                } else {
                    document.querySelector("#tu-proyecto").classList.remove('unbloked-portatil');
                    document.querySelector("#datos-personales").classList.add('unbloked-portatil');
                    document.querySelector("#info-adicional").classList.add('unbloked-portatil');
                    document.querySelector("#enviar").classList.add('unbloked-portatil');

                }

                break;
            default:
                break;
        }
    }

    )
})
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    validarParte([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    if (comprobar()) {
        document.getElementById('contacto').innerHTML = "<h2>Formulario enviado correctamente</h2><br><h3>Pronto nos pondremos en contacto</h3>";
    }

});

