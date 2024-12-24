// Mostrar servicios
function mostrarServicios() {
    const contenedorServicios = document.getElementById("servicios");
    console.log("Servicios disponibles:");

    servicios.forEach(servicio => {
        console.log(`Servicio: ${servicio.nombre} - Precio: $${servicio.precio}`);
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
}

// Finalizar cotización
function finalizarCotizacion() {
    console.log("Finalizando cotización...");
    const cantidadInputs = document.querySelectorAll(".cantidad-servicio");
    let seleccionServicios = [];
    let total = 0;

    cantidadInputs.forEach(input => {
        const servicioId = input.id.replace("cantidad-", "");
        const cantidad = parseInt(input.value);

        if (cantidad > 0) {
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