document.addEventListener("DOMContentLoaded", function () {
    // Cargar Header, Footer y Botones Flotantes desde la carpeta components
    loadComponent("components/header.html", "header-container");
    loadComponent("components/footer.html", "footer-container");
    loadComponent("components/wspButton.html", "wsp-button-container");
    loadComponent("components/calculatorButton.html", "calculator-button-container");
    loadComponent("components/calculatorModal.html", "calculator-modal-container");
    loadComponent("components/carouselHome.html", "carousel-home-container");
    loadComponent("components/fnsPad.html", "fonasa-pad-container");
    loadComponent("components/surgeries.html", "surgeries-container");
    loadComponent("components/aboutCard.html", "about-card-container");
    loadComponent("components/contactUs.html", "contact-container");

    // Función para cargar archivos HTML en contenedores específicos
    function loadComponent(url, containerId, callback) {
        if (!containerId) {
            console.warn(`No se especificó un contenedor para ${url}`);
            return;
        }
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se pudo cargar ${url}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
                if (callback) callback(); // Ejecutar función después de cargar el contenido
            })
            .catch(error => console.error(`Error cargando ${url}:`, error));
    }

    // Detectar el procedimiento desde la URL y cargarlo automáticamente
    const urlParams = new URLSearchParams(window.location.search);
    const procedimiento = urlParams.get("procedimiento");

    if (procedimiento) {
        console.log(`Parámetro detectado en URL: ${procedimiento}`);
        cargarProcedimiento(procedimiento);
    }
});

// Función para cargar dinámicamente el procedimiento
function cargarProcedimiento(procedimiento) {
    const contenedor = document.getElementById("procedimientoSection");

    if (!contenedor) {
        console.error("Error: No se encontró el contenedor de procedimientos.");
        return;
    }

    console.log(`Intentando cargar el procedimiento: ${procedimiento}`);

    // Asegurar que la ruta está correcta
    fetch(`components/${procedimiento}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar el archivo: components/${procedimiento}.html`);
            }
            return response.text();
        })
        .then(data => {
            console.log("Procedimiento cargado correctamente.");
            contenedor.innerHTML = data;
            contenedor.scrollIntoView({ behavior: "smooth" });
        })
        .catch(error => {
            console.error("Error al cargar el procedimiento:", error);
            contenedor.innerHTML = `<p class="text-danger">Error: No se pudo cargar el procedimiento seleccionado.</p>`;
        });
}

// Detectar el procedimiento desde la URL y cargarlo automáticamente
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const procedimiento = urlParams.get("procedimiento");

    if (procedimiento) {
        console.log(`Parámetro detectado en URL: ${procedimiento}`);
        cargarProcedimiento(procedimiento);
    }
});

