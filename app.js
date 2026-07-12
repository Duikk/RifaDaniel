const URL = "https://script.google.com/macros/s/AKfycbx0Yzn1yfXFV8_Jt8BtigGbMH-K55irzhfk0-aWSM5wtOa8Z0oU4tifAUQDvmy5z6Gb/exec";

function cargarBoletas() {

    fetch(URL)
    .then(r => r.json())
    .then(datos => {

        let disponibles = 0;
        let reservadas = 0;
        let vendidas = 0;

        const tablero = document.getElementById("tablero");

        // Limpiar el tablero antes de volver a dibujarlo
        tablero.innerHTML = "";

        datos.forEach(b => {

            const div = document.createElement("div");

            div.classList.add("boleta");

            if (b.estado === "Disponible") {

                div.classList.add("disponible");
                div.textContent = b.boleta;
                div.onclick = () => {

    document.getElementById("tituloBoleta").textContent =
    "🎟 Boleta " + b.boleta;

    document.getElementById("modal").style.display = "flex";

    document.getElementById("comprarBtn").onclick = () => {

        const mensaje =
        "Hola, quiero comprar la boleta " +
        b.boleta +
        " de la Rifa para la recuperación de Daniel.";

        window.open(
            "https://wa.me/573007028035?text=" +
            encodeURIComponent(mensaje),
            "_blank"
        );

    };

};
                disponibles++;

            } else if (b.estado === "Reservada") {

                div.classList.add("reservada");
                div.textContent = "APARTADA";
                reservadas++;

            } else {

                div.classList.add("vendida");
                div.textContent = "VENDIDA";
                vendidas++;

            }

            tablero.appendChild(div);

        });

        document.getElementById("disponibles").textContent = "🟢 Disponibles: " + disponibles;
        document.getElementById("reservadas").textContent = "🟡 Reservadas: " + reservadas;
        document.getElementById("vendidas").textContent = "🔴 Vendidas: " + vendidas;

    })
    .catch(error => console.error("Error al cargar boletas:", error));

}

// Carga inicial
cargarBoletas();

// Actualizar automáticamente cada 10 segundos
setInterval(cargarBoletas, 10000);
document.getElementById("cancelarBtn").onclick = () => {

    document.getElementById("modal").style.display = "none";

};
