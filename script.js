// ==========================================
// 1. MODAL DEL PLAN MAESTRO (Zoom e Imagen de Lotes)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const contenedorPlano = document.querySelector('.imagen-plan-wrapper');
    const modalPlano = document.getElementById('modalPlanoVisual');
    const imgModalAmpliada = document.getElementById('imgModalAmpliada');
    const botonCerrar = document.querySelector('.cerrar-modal');

    // Abrir modal usando 'flex' para centrado vertical y horizontal
    if (contenedorPlano && modalPlano && imgModalAmpliada) {
        contenedorPlano.addEventListener('click', () => {
            imgModalAmpliada.src = 'img/Planmaestrovendido.jpe';
            modalPlano.style.display = 'flex';
        });
    }

    // Función para cerrar modal
    const cerrarModal = () => {
        if (modalPlano) {
            modalPlano.style.display = 'none';
        }
    };

    // Cerrar al hacer clic en la 'X'
    if (botonCerrar) {
        botonCerrar.addEventListener('click', (e) => {
            e.stopPropagation();
            cerrarModal();
        });
    }

    // Cerrar al hacer clic en el fondo oscuro
    if (modalPlano) {
        modalPlano.addEventListener('click', (e) => {
            if (e.target === modalPlano) {
                cerrarModal();
            }
        });
    }
});

// ==========================================
// 2. CARRUSELES DE VIVIENDAS (Casas y Deptos)
// ==========================================
const indicesCarruseles = {
    'carruselCasa': 0,
    'carruselDepto': 0
};

function cambiarSlide(idCarrusel, direccion) {
    const contenedor = document.getElementById(idCarrusel);
    if (!contenedor) return;

    const slides = contenedor.querySelectorAll('.slide');
    if (slides.length === 0) return;

    if (!(idCarrusel in indicesCarruseles)) {
        indicesCarruseles[idCarrusel] = 0;
    }

    // Ocultar la slide actual
    slides[indicesCarruseles[idCarrusel]].classList.remove('activa');

    // Calcular siguiente índice
    indicesCarruseles[idCarrusel] += direccion;

    if (indicesCarruseles[idCarrusel] >= slides.length) {
        indicesCarruseles[idCarrusel] = 0;
    } else if (indicesCarruseles[idCarrusel] < 0) {
        indicesCarruseles[idCarrusel] = slides.length - 1;
    }

    // Mostrar nueva slide
    slides[indicesCarruseles[idCarrusel]].classList.add('activa');
}

// ==========================================
// 3. PESTAÑAS DE OPCIONES DE CRÉDITO
// ==========================================
function cambiarCredito(elementoBtn, nombreCredito) {
    // 1. Desmarcar todos los botones
    const botones = document.querySelectorAll('.pestana-btn');
    botones.forEach(btn => btn.classList.remove('activa'));
    
    // 2. Marcar botón seleccionado
    if (elementoBtn) {
        elementoBtn.classList.add('activa');
    }

    // 3. Ocultar todos los paneles
    const secciones = document.querySelectorAll('.contenido-credito');
    secciones.forEach(sec => sec.classList.remove('activo'));

    // 4. Mostrar panel elegido
    const seccionMostrar = document.getElementById('info-' + nombreCredito);
    if (seccionMostrar) {
        seccionMostrar.classList.add('activo');
    }
}

// ==========================================
// 4. REGISTRO DE CITA (Envío por WhatsApp)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const formCita = document.getElementById('formRegistroCita');

    if (formCita) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombreCompleto').value;
            const telefono = document.getElementById('telefonoCliente').value;
            const correo = document.getElementById('correoCliente').value;
            const credito = document.getElementById('tipoCredito').value;
            const vivienda = document.getElementById('tipoVivienda').value;
            const fecha = document.getElementById('fechaCita').value;
            const hora = document.getElementById('horaCita').value;
            const notas = document.getElementById('notasCliente').value;

            const numeroWhatsApp = "5216691061435";
            
            let mensaje = `*NUEVA SOLICITUD DE CITA*%0A%0A`;
            mensaje += `*Nombre:* ${nombre}%0A`;
            mensaje += `*Teléfono:* ${telefono}%0A`;
            mensaje += `*Correo:* ${correo}%0A`;
            mensaje += `*Crédito:* ${credito}%0A`;
            mensaje += `*Interés:* ${vivienda}%0A`;
            mensaje += `*Fecha solicitada:* ${fecha}%0A`;
            mensaje += `*Hora:* ${hora}%0A`;
            if (notas) mensaje += `*Notas:* ${notas}%0A`;

            const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
            window.open(url, '_blank');
        });
    }
});