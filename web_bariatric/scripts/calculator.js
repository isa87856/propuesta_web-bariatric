document.addEventListener("DOMContentLoaded", function() {
    // Abrir el modal de la calculadora IMC
    window.openIMCCalculator = function() {
        let modal = document.getElementById("imcModal");
        if (modal) {
            modal.style.display = "flex";
        } else {
            console.error("Error: No se encontró el modal de IMC.");
        }
    };

    // Cerrar el modal y limpiar los campos
    window.closeIMCCalculator = function() {
        document.getElementById("imcModal").style.display = "none";
        limpiarCamposIMC();
    };

    // Función para calcular IMC
    window.calcularIMC = function() {
        let peso = parseFloat(document.getElementById("inputPeso").value);
        let altura = parseFloat(document.getElementById("inputTalla").value) / 100; // Convertir cm a metros
        let edad = parseInt(document.getElementById("inputEdad").value);
        let genero = document.getElementById("inputGenero").value;
        let resultadoIMC = document.getElementById("resultadoIMC");
        let btnSolicitarInfo = document.getElementById("btnSolicitarInfo");

        // Limpiar resultado previo
        resultadoIMC.innerHTML = ""; 

        if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0 || isNaN(edad)) {
            resultadoIMC.innerHTML = "<p class='text-danger'>Por favor, ingrese valores válidos.</p>";
            btnSolicitarInfo.style.display = "none"; // Ocultar el botón si los datos son inválidos
            return;
        }

        let imc = peso / (altura * altura); // Cálculo de IMC
        let mensaje = `<p class='text-primary'>Tu IMC es: <strong>${imc.toFixed(2)}</strong></p>`;

        if (imc < 18.5) {
            mensaje += "<p class='text-warning'>Bajo peso. Consulta con un especialista.</p>";
        } else if (imc >= 18.5 && imc < 24.9) {
            mensaje += "<p class='text-success'>Peso normal. ¡Sigue así!</p>";
        } else if (imc >= 25 && imc < 29.9) {
            mensaje += "<p class='text-warning'>Sobrepeso. Es recomendable un cambio en el estilo de vida.</p>";
        } else if (imc >= 30 && imc < 39.9) {
            mensaje += "<p class='text-danger'>Obesidad. Consulta a un especialista para mejorar tu salud.</p>";
        } else {
            mensaje += "<p class='text-danger'>Obesidad mórbida. Consulta opciones de tratamiento especializado.</p>";
        }

        resultadoIMC.innerHTML = mensaje;
        btnSolicitarInfo.style.display = "inline-block"; // Mostrar botón después del cálculo
    };

    // Función para limpiar los campos del formulario al cerrar el modal
    function limpiarCamposIMC() {
        document.getElementById("inputPeso").value = "";
        document.getElementById("inputTalla").value = "";
        document.getElementById("inputEdad").value = "";
        document.getElementById("inputGenero").value = "";
        document.getElementById("resultadoIMC").innerHTML = "";
        document.getElementById("btnSolicitarInfo").style.display = "none"; // Ocultar el botón al limpiar
    }

    // Función para redirigir al formulario del CRM
    window.solicitarInfo = function() {
        let formWindow = window.open("https://link.admente.com/widget/form/oX2Uxusp4DDz2dcaaZhN?notrack=true", "_blank");

        // Monitorear si el usuario cierra la pestaña del formulario
        let checkWindow = setInterval(function() {
            if (formWindow.closed) {
                clearInterval(checkWindow);
                window.location.href = "index.html"; // Redirigir a la página principal
            }
        }, 1000);
    };
});
