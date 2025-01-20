<<<<<<< HEAD
import {
    guardarEnStorage,
    recuperarServiciosDesdeStorage,
    recuperarTotalDesdeStorage} from './utils/storage.js';

import { SERVICIOS, DESCUENTOS } from './constantes.js';

let seleccionServicios = [];
let totalSinDescuento = 0; 
let totalConDescuento = 0; 
let nombreSolicitante = ""; 

// Mostrar servicios en el DOM
function mostrarServicios() {
    const contenedorServicios = document.getElementById("servicios");
    contenedorServicios.innerHTML = ""; // Limpiar contenido previo

    SERVICIOS.forEach(servicio => {
=======
// Mostrar servicios
function mostrarServicios() {
    const contenedorServicios = document.getElementById("servicios");
    console.log("Servicios disponibles:");

    servicios.forEach(servicio => {
        console.log(`Servicio: ${servicio.nombre} - Precio: $${servicio.precio}`);
>>>>>>> 8b5ed19b8c8d457afbe416e7e0e37484e86908a9
        const div = document.createElement("div");
        div.classList.add("servicio");
        div.innerHTML = `
            <label>
                ${servicio.nombre} - $${servicio.precio} 
                <input type="number" id="cantidad-${servicio.id}" class="cantidad-servicio" min="0" value="0" />
            </label>
        `;
        contenedorServicios.appendChild(div);
    });
}

<<<<<<< HEAD
// Mostrar descuentos en el DOM
function mostrarDescuentos() {
    const descuentoSelect = document.getElementById("descuento");
    DESCUENTOS.forEach(descuento => {
        const option = document.createElement("option");
        option.value = descuento.valor;
        option.textContent = descuento.nombre;
        descuentoSelect.appendChild(option);
    });
}

// Capturar descuento desde el DOM
function aplicarDescuento(total) {
    const descuentoSelect = document.getElementById("descuento");
    const descuento = parseInt(descuentoSelect.value);

    let descuentoAplicado = 0;

    if (descuento === 20) {
        descuentoAplicado = total * 0.20;
    } else if (descuento === 10) {
        descuentoAplicado = total * 0.10;
    }

    return descuentoAplicado;
=======
// Calcular total con descuento
function aplicarDescuento(total) {
    console.log("Calculando total con descuento...");
    const descuento = prompt("¿Deseas aplicar un descuento?\n1. Visa Santander (20%)\n2. Pago en efectivo (10%)\n3. Sin descuento");

    switch (descuento) {
        case "1":
            total -= total * 0.20;
            alert("¡Obtuviste descuento del 20% por pagar con Visa Santander!");
            console.log("Descuento aplicado: 20% (Visa Santander)");
            break;
        case "2":
            total -= total * 0.10;
            alert("¡Obtuviste un descuento del 10% por pagar en efectivo!");
            console.log("Descuento aplicado: 10% (Pago en efectivo)");
            break;
        case "3":
            alert("No se aplicó ningún descuento.");
            console.log("No se aplicó ningún descuento.");
            break;
        default:
            alert("Opción no válida. No se aplicará ningún descuento.");
            console.log("Opción no válida. No se aplicará ningún descuento.");
            break;
    }
    console.log(`Total con descuento : $${total}`);
    return total;
>>>>>>> 8b5ed19b8c8d457afbe416e7e0e37484e86908a9
}

// Finalizar cotización
function finalizarCotizacion() {
<<<<<<< HEAD
    const cantidadInputs = document.querySelectorAll(".cantidad-servicio");
    seleccionServicios = [];
    totalSinDescuento = 0; // Reiniciar total sin descuento
    totalConDescuento = 0; // Reiniciar total con descuento

    // Obtener el nombre del solicitante
    nombreSolicitante = document.getElementById("nombre").value;
    if (!nombreSolicitante) {
        mostrarMensaje("Por favor ingrese su nombre.", "error");
        return;
    }
=======
    console.log("Finalizando cotización...");
    const cantidadInputs = document.querySelectorAll(".cantidad-servicio");
    let seleccionServicios = [];
    let total = 0;
>>>>>>> 8b5ed19b8c8d457afbe416e7e0e37484e86908a9

    cantidadInputs.forEach(input => {
        const servicioId = input.id.replace("cantidad-", "");
        const cantidad = parseInt(input.value);

        if (cantidad > 0) {
<<<<<<< HEAD
            const servicioSeleccionado = SERVICIOS.find(servicio => servicio.id == servicioId);
            seleccionServicios.push({ ...servicioSeleccionado, cantidad });
            totalSinDescuento += servicioSeleccionado.precio * cantidad;
        }
    });

    if (seleccionServicios.length === 0) {
        mostrarMensaje("No seleccionaste ningún servicio.", "error");
        return;
    }

    // Calcular descuento
    const descuentoAplicado = aplicarDescuento(totalSinDescuento);
    totalConDescuento = totalSinDescuento - descuentoAplicado;

    // Guardar en Storage
    guardarEnStorage(seleccionServicios, totalConDescuento);
    
    // Mostrar resumen
    mostrarResumen(totalSinDescuento, totalConDescuento);
}

// Mostrar resumen de la cotización
function mostrarResumen(totalSinDescuento, totalConDescuento) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h2>Resumen de la Cotización</h2>
        <p><strong>Nombre del solicitante:</strong> ${nombreSolicitante}</p>
        <ul>
            ${seleccionServicios.map(servicio =>
        `<li>${servicio.nombre} - ${servicio.cantidad} unidad(es) - $${servicio.precio * servicio.cantidad}</li>`).join("")}
        </ul>
        <p>Total sin descuentos: <strong>$${totalSinDescuento.toFixed(2)}</strong></p>
        <p>Total a pagar (con descuento): <strong>$${totalConDescuento.toFixed(2)}</strong></p>
    `;
}

// Mostrar mensajes de error o éxito
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo; // 
    setTimeout(() => mensajeDiv.textContent = "", 3000); 
}

// Recuperar datos desde localStorage al cargar la página
function recuperarDesdeStorage() {
    seleccionServicios = recuperarServiciosDesdeStorage();
    totalConDescuento = recuperarTotalDesdeStorage();

    if (seleccionServicios.length > 0) {
        mostrarResumen(totalSinDescuento, totalConDescuento); 
    }
}

// Limpiar pantalla para una nueva cotización
function nuevaCotizacion() {
    // Limpiar los campos
    document.getElementById("nombre").value = ""; 
    const cantidadInputs = document.querySelectorAll(".cantidad-servicio");
    cantidadInputs.forEach(input => input.value = 0); 

    // Limpiar el resumen de la cotización
    document.getElementById("resultado").innerHTML = "";
}

// Inicializar eventos y cargar servicios
document.getElementById("finalizar").addEventListener("click", finalizarCotizacion);
document.getElementById("nueva-cotizacion").addEventListener("click", nuevaCotizacion);
recuperarDesdeStorage();
mostrarServicios();
mostrarDescuentos();
=======
            const servicioSeleccionado = servicios.find(servicio => servicio.id == servicioId);
            seleccionServicios.push({ ...servicioSeleccionado, cantidad });
            total += servicioSeleccionado.precio * cantidad;
            console.log(`Servicio seleccionado: ${servicioSeleccionado.nombre} - Cantidad: ${cantidad} - Precio: $${servicioSeleccionado.precio * cantidad}`);
        }
    });

    // Filtrar solo los servicios seleccionados(con cantidad mayor a cero) es decir no toma en cuenta los servicios en 0
    const serviciosSeleccionados = seleccionServicios.filter(servicio => servicio.cantidad > 0);

    if (serviciosSeleccionados.length === 0) {
        alert("No seleccionaste ningún servicio.");
        console.log("No se seleccionaron servicios.");
        return;
    }

    total = aplicarDescuento(total);

    // Mostrar resultado
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h2>Resumen de la Cotización</h2>
        <ul>
            ${serviciosSeleccionados.map(servicio => `<li>${servicio.nombre} - ${servicio.cantidad} unidad(es) - $${servicio.precio * servicio.cantidad}</li>`).join("")}
        </ul>
        <p>Total a pagar: <strong>$${total.toFixed(2)}</strong></p>
    `;
    console.log(`Total final a pagar: $${total.toFixed(2)}`);
}

// Inicializar eventos y mostrar servicios
document.getElementById("finalizar").addEventListener("click", finalizarCotizacion);
mostrarServicios();
>>>>>>> 8b5ed19b8c8d457afbe416e7e0e37484e86908a9
