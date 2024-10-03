// Mostrar el formulario emergente al cargar la página
window.onload = function() {
    var modal = document.getElementById('user-info-form');
    modal.style.display = 'block';

    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío del formulario

        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var telefono = document.getElementById('telefono').value;
        var seccion = document.getElementById('grado').value;

        if (nombre && email && telefono && seccion) {
            alert("Datos ingresados:\nNombre: " + nombre + "\nCorreo: " + email + "\nTeléfono: " + telefono + "\nSección: " + seccion);
            modal.style.display = 'none';  // Oculta el modal si los datos son válidos
            // Guardar los datos del usuario en variables globales
            window.userInfo = { nombre, email, telefono, seccion };
        } else {
            alert("Por favor, complete todos los campos antes de continuar.");
        }
    });
};

// Funciones de cálculo de precio y total
function total() {
    var cantidadAzulitos = parseFloat(document.getElementById('cantidad-azulitos').value) || 0;
    var precioAzulitos = 1.50;  // Valor fijo para Azulitos
    var cantidadGomitas = parseFloat(document.getElementById('cantidad-gomitas').value) || 0;
    var precioGomitas = 1.50;   // Valor fijo para Gomitas

    var totalAzulitos = cantidadAzulitos * precioAzulitos;
    var totalGomitas = cantidadGomitas * precioGomitas;
    var total = (totalAzulitos + totalGomitas).toFixed(2);

    // Mostrar el total en el HTML
document.getElementById('Resultado').innerHTML = 
`<div style="text-align: center;">
    <label>Detalle del producto:</label>
    <br> Azulitos: ${cantidadAzulitos}
    <br> Gomitas: ${cantidadGomitas}
    <br> Nombre: ${window.userInfo.nombre}
    <br> Sección: ${window.userInfo.seccion}
    <br> Total: $${total}
    <br><img src='IMG/Gracias por su compra.png' width='175px' height='175px'>
</div>`;

  // Generar la captura del detalle del producto y descargarla
  html2canvas(document.getElementById('Resultado')).then(canvas => {
    canvas.toBlob(function(blob) {
        // Crear un enlace para descargar la imagen
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'detalle-compra.png'; // Nombre de la imagen
        link.click(); // Simular clic en el enlace para descargar
    });
});
    // Enviar los detalles del pedido a Formspree
    sendToFormspree(window.userInfo, total, cantidadAzulitos, cantidadGomitas);
}

// Función para enviar el pedido a Formspree
function sendToFormspree(userInfo, total, cantidadAzulitos, cantidadGomitas) {
    var formData = new FormData();
    formData.append("nombre", userInfo.nombre);
    formData.append("email", userInfo.email);
    formData.append("telefono", userInfo.telefono);
    formData.append("seccion", userInfo.seccion);
    formData.append("cantidadAzulitos", cantidadAzulitos);
    formData.append("cantidadGomitas", cantidadGomitas);
    formData.append("total", total);

    fetch("https://formspree.io/f/mdknqqoy", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            alert("Pedido enviado exitosamente!");
        } else {
            alert("Error al enviar el pedido.");
        }
    })
    .catch(error => {
        alert("Error: " + error.message);
    });
}
