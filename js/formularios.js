/* =====================================================================
   FORMULARIOS.JS · Sistema Atlantic City
   Lógica de los formularios de registro (clientes, quejas, juegos,
   usuarios y promociones). Sigue el mismo estilo que index.js:
   se espera a que el DOM cargue y se trabaja con listeners.
   Los datos se agregan dinámicamente a las tablas/tarjetas de cada
   página (registro en memoria, sin base de datos).
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------------
       FUNCIONES AUXILIARES (reutilizadas por todos los formularios)
       --------------------------------------------------------------- */

    // Valida un formulario con la API nativa del navegador y aplica
    // los estilos de validación de Bootstrap (.was-validated).
    const validarFormulario = (form) => {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false; // Hay campos inválidos: no se registra nada
        }
        return true;
    };

    // Cierra el modal que contiene al formulario y limpia sus campos
    // para que quede listo para un nuevo registro.
    const cerrarYLimpiar = (form) => {
        const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
        if (modal) modal.hide();
        form.reset();
        form.classList.remove('was-validated');
    };

    // Convierte una fecha "AAAA-MM-DD" (input type="date") al formato
    // "DD/MM/AAAA" usado en las tablas del sistema.
    const formatearFecha = (fechaISO) => {
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}/${mes}/${anio}`;
    };

    // Pequeña protección contra inyección de HTML en los textos
    // que escribe el usuario antes de insertarlos en la página.
    const escaparHTML = (texto) => {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    };

    /* ---------------------------------------------------------------
       1. REGISTRO DE CLIENTES (clientes.html)
       --------------------------------------------------------------- */
    const formCliente = document.getElementById('formCliente');
    if (formCliente) {
        let siguienteId = 1026; // Continúa la numeración de la tabla de ejemplo

        formCliente.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Evita que la página se recargue
            if (!validarFormulario(formCliente)) return;

            const nombre = escaparHTML(document.getElementById('clienteNombre').value.trim());
            const correo = escaparHTML(document.getElementById('clienteCorreo').value.trim());
            const estado = document.getElementById('clienteEstado').value;
            const colorEstado = (estado === 'Activo') ? 'bg-success' : 'bg-secondary';

            // Se crea la nueva fila con la misma estructura de la tabla
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>#${siguienteId++}</td>
                <td>${nombre}</td>
                <td>${correo}</td>
                <td><span class="badge ${colorEstado}">${estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-light"><i class="bi bi-pencil"></i></button>
                </td>`;
            document.querySelector('#tablaClientes tbody').appendChild(fila);

            cerrarYLimpiar(formCliente);
        });
    }

    /* ---------------------------------------------------------------
       2. REGISTRO DE QUEJAS (quejas.html)
       --------------------------------------------------------------- */
    const formQueja = document.getElementById('formQueja');
    if (formQueja) {
        let siguienteCodigo = 903; // Continúa después de #REF-902

        formQueja.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (!validarFormulario(formQueja)) return;

            const cliente = escaparHTML(document.getElementById('quejaCliente').value.trim());
            const detalle = escaparHTML(document.getElementById('quejaDetalle').value.trim());
            const fecha = formatearFecha(document.getElementById('quejaFecha').value);
            const prioridad = document.getElementById('quejaPrioridad').value;

            // Color del badge según la prioridad elegida
            const colores = { 'Alta': 'bg-danger', 'Media': 'bg-warning text-dark', 'Baja': 'bg-info text-dark' };

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>#REF-${siguienteCodigo++}</td>
                <td>${cliente}</td>
                <td>${detalle}</td>
                <td>${fecha}</td>
                <td><span class="badge ${colores[prioridad]}">${prioridad}</span></td>`;
            document.querySelector('#tablaQuejas tbody').appendChild(fila);

            cerrarYLimpiar(formQueja);
        });
    }

    /* ---------------------------------------------------------------
       3. REGISTRO DE JUEGOS / SESIONES (sesiones.html)
       --------------------------------------------------------------- */
    const formSesion = document.getElementById('formSesion');
    if (formSesion) {
        formSesion.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (!validarFormulario(formSesion)) return;

            const mesa = escaparHTML(document.getElementById('sesionMesa').value.trim());
            const juego = document.getElementById('sesionJuego').value;
            const cliente = escaparHTML(document.getElementById('sesionCliente').value.trim());
            const hora = document.getElementById('sesionHora').value;
            const estado = document.getElementById('sesionEstado').value;
            const colorEstado = (estado === 'En Juego') ? 'bg-danger' : 'bg-secondary';

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${mesa}</td>
                <td>${juego}</td>
                <td>${cliente}</td>
                <td>${hora}</td>
                <td><span class="badge ${colorEstado}">${estado}</span></td>`;
            document.querySelector('#tablaSesiones tbody').appendChild(fila);

            cerrarYLimpiar(formSesion);
        });
    }

    /* ---------------------------------------------------------------
       4. REGISTRO DE USUARIOS DEL SISTEMA (usuarios.html)
       --------------------------------------------------------------- */
    const formUsuario = document.getElementById('formUsuario');
    if (formUsuario) {
        formUsuario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (!validarFormulario(formUsuario)) return;

            const login = escaparHTML(document.getElementById('usuarioLogin').value.trim());
            const rol = document.getElementById('usuarioRol').value;

            // Color del badge según el rol (mismo criterio que la tabla original)
            const coloresRol = {
                'Super Administrador': 'border-danger text-danger',
                'Supervisor de Sala': 'border-warning text-warning',
                'Operador Técnico': 'border-info text-info',
                'Cajero': 'border-success text-success'
            };

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${login}</td>
                <td><span class="badge border ${coloresRol[rol]}">${rol}</span></td>
                <td>Recién registrado</td>`;
            document.querySelector('#tablaUsuarios tbody').appendChild(fila);

            cerrarYLimpiar(formUsuario);
        });
    }

    /* ---------------------------------------------------------------
       5. REGISTRO DE PROMOCIONES (promociones.html)
       --------------------------------------------------------------- */
    const formPromo = document.getElementById('formPromo');
    if (formPromo) {
        formPromo.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (!validarFormulario(formPromo)) return;

            const titulo = escaparHTML(document.getElementById('promoTitulo').value.trim());
            const descripcion = escaparHTML(document.getElementById('promoDescripcion').value.trim());
            const nivel = document.getElementById('promoNivel').value;
            const fecha = formatearFecha(document.getElementById('promoFecha').value);
            const estado = document.getElementById('promoEstado').value;
            const colorEstado = (estado === 'Activa') ? 'bg-success' : 'bg-secondary';

            // Las promociones se muestran como tarjetas (cards), no como tabla
            const columna = document.createElement('div');
            columna.className = 'col-12 col-lg-6';
            columna.innerHTML = `
                <div class="card bg-transparent border-secondary p-3">
                    <div class="card-body">
                        <h5 class="card-title text-success">${titulo}</h5>
                        <p class="card-text text-muted">${descripcion}</p>
                        <span class="badge ${colorEstado}">${estado}</span>
                        <span class="badge border border-secondary text-muted ms-2">Nivel mínimo: ${nivel}</span>
                        <span class="badge border border-secondary text-muted ms-2">Hasta: ${fecha}</span>
                    </div>
                </div>`;
            document.getElementById('listaPromos').appendChild(columna);

            cerrarYLimpiar(formPromo);
        });
    }
});
