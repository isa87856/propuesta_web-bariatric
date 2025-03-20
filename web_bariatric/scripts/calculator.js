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
            mensaje += "<p class='text-warning'>Tú IMC indica Bajo peso. Es necesario que acudas con un especialista.</p>";
        } else if (imc >= 18.5 && imc < 24.9) {
            mensaje += "<p class='text-success'>Tú IMC indica Peso normal. ¡Sigue así!</p>";
        } else if (imc >= 25 && imc < 29.9) {
            mensaje += "<p class='text-warning'>Tú IMC indica Sobrepeso, Es recomendable hacer cambios en el estilo de vida.<br> En Bariatric te entregamos asesoria sobre el <strong>Balón Intragástrico Spatz </strong> y el <strong>Método Clinifit</strong>, ideales para tú IMC.</p>";
        } else if (imc >= 30 && imc < 39.9) {
            mensaje += "<p class='text-danger'>Tú IMC indica Obesidad, Debes Consultar un especialista para mejorar tu salud. En Bariatric te entregamos asesoria sobre los diferentes procedimientos que estan disponibles para tu rango de IMC, recuerda que nuestros procedimientos van desde el balon intragástrico Spatz, hasta las cirugías bariatricas de mayor complejidad. Todas ellas aseguran un cambio positivo en tu calidad de vida. asesorate con nostros sobre los valores por procedimiento, uso de bono pad, copago de Fonasa y todas las dudas que puedas tener</p>";
        } else {
            mensaje += "<p class='text-danger'>Tú Índice de Masa Corporal(IMC) indica Obesidad mórbida. Consulta las opciones de tratamiento especializado para ti, nuestros asesores te entregarán toda la información sobre el <strong>Bono PAD de Fonasa</strong>, ya que tu IMC es uno de los requisitos de este beneficio.</p>";
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
        let formWindow = window.open("https://link.admente.com/widget/form/B01j4Xmb0hw1PC7ro89C", "_blank");

        // Monitorear si el usuario cierra la pestaña del formulario
        let checkWindow = setInterval(function() {
            if (formWindow.closed) {
                clearInterval(checkWindow);
                window.location.href = "index.html"; // Redirigir a la página principal
            }
        }, 1000);
    };
});
