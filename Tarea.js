// Mostrar el formulario emergente al cargar la página
window.onload = function() {
    var modal = document.getElementById('user-info-form');
    modal.style.display = 'block';

    document.getElementById('continue-btn').addEventListener('click', function() {
        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var telefono = document.getElementById('telefono').value;
        var seccion = document.getElementById('Grado').value;

        if (nombre && email && telefono && seccion) {
            alert("Datos ingresados:\nNombre: " + nombre + "\nCorreo: " + email + "\nTeléfono: " + telefono + "\nSección: " + seccion);
            modal.style.display = 'none';  // Oculta el modal si los datos son válidos
        } else {
            alert("Por favor, complete todos los campos antes de continuar.");
        }
    });
};

// Funciones de cálculo de precio y total
function total() {
    var nombre = document.getElementById('nombre').value;
    var seccion = document.getElementById('Grado').value;

    var cantidadAzulitos = parseFloat(document.getElementById('cantidad-azulitos').value) || 0;
    var precioAzulitos = 1.50;  // Valor fijo para Azulitos
    var cantidadGomitas = parseFloat(document.getElementById('cantidad-gomitas').value) || 0;
    var precioGomitas = 1.50;   // Valor fijo para Gomitas

    var totalAzulitos = cantidadAzulitos * precioAzulitos;
    var totalGomitas = cantidadGomitas * precioGomitas;
    var total = (totalAzulitos + totalGomitas).toFixed(2);

    // Crear el contenido para mostrar
    document.getElementById('Resultado').innerHTML = 
        "<img src='IMG/Gracias por su compra.png' width='175px' height='175px'>" + 
        "<br><label id='r'> Detalle del producto:" + 
        "<br> Azulitos: " + cantidadAzulitos + 
        "<br> Gomitas: " + cantidadGomitas + 
        "<br> Nombre: " + nombre + 
        "<br> Sección: " + seccion + 
        "<br> Total: $" + total + "</label>";

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
}
