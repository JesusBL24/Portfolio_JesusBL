let currentGallery = [];
let currentIndex = 0;
let pz;

function openGallery(imagesArray) {
    if (!imagesArray || imagesArray.length === 0) return;

    // Reset total del estado de la galería
    currentGallery = [...imagesArray]; // Copiamos el array para evitar referencias raras
    currentIndex = 0;

    // 1. Mostrar el overlay
    const overlay = document.getElementById('gallery-overlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 2. Actualizar imagen y contador INMEDIATAMENTE
    updateGalleryImage();

    // 3. Inicializar Panzoom
    setTimeout(initPanzoom, 50);
}

function initPanzoom() {
    const elem = document.getElementById('gallery-img');
    if (pz) pz.dispose();

    pz = panzoom(elem, {
        maxZoom: 5,
        minZoom: 1, // No permite hacer la imagen más pequeña que el original
        bounds: true, // Activa los muros invisibles
        boundsPadding: 0, // 0 significa que choca exactamente en el borde

        // Evita que la imagen rebote y se mueva sola al principio
        initialZoom: 1,
        initialX: 0,
        initialY: 0,

        filterKey: function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.classList.contains('close-gallery')) {
                return true;
            }
        },
        beforeWheel: function(e) { return false; }
    });

    // Forzamos un reset visual para asegurar que empieza centrada
    setTimeout(() => {
        pz.moveTo(0, 0);
        pz.zoomAbs(0, 0, 1);
    }, 10);
}

// 3. EVENTO DE DOBLE CLIC (Fuera de init para que no se duplique)
// Lo ponemos una sola vez en el DOM al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('gallery-overlay');
    const img = document.getElementById('gallery-img');

    if (overlay) {
        overlay.addEventListener('dblclick', (e) => {
            // Si el doble clic es sobre la imagen y Panzoom existe
            if (e.target.id === 'gallery-img' && pz) {
                e.preventDefault();
                e.stopPropagation();

                const transform = pz.getTransform();

                if (transform.scale > 1.05) {
                    pz.zoomAbs(0, 0, 1);
                    pz.moveTo(0, 0);
                    img.style.cursor = 'zoom-in';
                } else {
                    // Zoom suave hacia la posición del ratón
                    pz.smoothZoom(e.clientX, e.clientY, 2.5);
                    img.style.cursor = 'move';
                }
            }
        }, true);
    }
});

function updateGalleryImage() {
    const img = document.getElementById('gallery-img');
    const counter = document.getElementById('gallery-counter');

    // Cambiamos la imagen
    img.src = currentGallery[currentIndex];

    // ACTUALIZAMOS EL CONTADOR (Esto arregla el error de 3 de 5)
    if (counter) {
        counter.innerText = `${currentIndex + 1} / ${currentGallery.length}`;
    }

    if (pz) {
        // Reset de posición para que la nueva imagen no herede el zoom de la anterior
        pz.zoomAbs(0, 0, 1);
        pz.moveTo(0, 0);
        img.style.cursor = 'zoom-in';
    }
}

function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= currentGallery.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentGallery.length - 1;
    updateGalleryImage();
}

function closeGallery() {
    document.getElementById('gallery-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentIndex = 0; // Limpieza preventiva
    if (pz) {
        pz.dispose();
        pz = null;
    }
}

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('gallery-overlay');
    if (overlay && overlay.style.display === 'flex') {
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
    }
});
