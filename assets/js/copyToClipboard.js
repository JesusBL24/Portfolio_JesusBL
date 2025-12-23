/**
 * Función que maneja la copia de texto al portapapeles.
 * * @param {string} elementId - El ID del elemento que contiene el texto a copiar (e.g., 'phoneLabel').
 * @param {Event} event - El evento click (necesario para prevenir la navegación por el enlace #).
 */
function copyToClipboard(elementId, event) {
    // 1. Prevenir que el navegador siga el enlace "#"
    if (event) {
        event.preventDefault();
    }

    // 2. Obtener el contenido a copiar
    const element = document.getElementById(elementId);
    if (!element) return;

    const textToCopy = element.textContent.trim();

    // 3. Usar la API del Portapapeles (asíncrona)
    navigator.clipboard.writeText(textToCopy).then(() => {

    // 4. Detectar idioma actual y obtener traducción
    // Asumimos que guardas el idioma en el atributo 'lang' del <html> (ej: <html lang="es">)
    const currentLang = document.documentElement.lang || 'en';
    const message = translations[currentLang]['copy_success'];

    showFeedback(element, message);

    }).catch(err => {
        const currentLang = document.documentElement.lang || 'en';
        const errorMessage = translations[currentLang]['copy_error'];
        showFeedback(element, errorMessage);
    });
}

/**
 * Función auxiliar para mostrar un mensaje temporal de confirmación.
 */
function showFeedback(targetElement, message) {
    // Creamos un nuevo elemento flotante
    const feedback = document.createElement('div');
    feedback.textContent = message;

    // Estilos para el feedback flotante (asegúrate de que el <li> padre tenga position: relative)
    feedback.style.cssText = `
        position: absolute;
        top: -30px; 
        left: 50%;
        transform: translateX(-50%);
        background: #dcd0fe; 
        color: black;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 1.5em;
        font-family: 'Roboto', sans-serif; /* REEMPLAZA 'Roboto' con tu fuente principal */
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 9999;
        pointer-events: none; /* Ignorar clicks en el mensaje */
    `;

    // El <li> (contenedor padre del <a> y <span>) debe ser el que contenga el feedback
    // El padre del elemento a copiar (targetElement, que es el <span>) es el <li>.
    targetElement.parentNode.appendChild(feedback);

    // Mostrar el mensaje
    setTimeout(() => {
        feedback.style.opacity = 1;
    }, 10);

    // Ocultar y remover el mensaje después de 1.5 segundos
    setTimeout(() => {
        feedback.style.opacity = 0;
        feedback.addEventListener('transitionend', () => feedback.remove());
    }, 1500);
}