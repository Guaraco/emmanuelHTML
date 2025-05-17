document.getElementById("formCedula").addEventListener("submit", function(event) {
    event.preventDefault();
    const cedula = document.getElementById("cedula").value;
    const mensaje = document.getElementById("mensaje");

    if (!/^\d{11}$/.test(cedula)) {
        mensaje.innerText = "Debe ingresar 11 dígitos numéricos.";
        mensaje.style.color = "red";
        return;
    }

    const multipliers = [1, 2];
    let suma = 0;

    for (let i = 0; i < 10; i++) {
        let producto = parseInt(cedula[i]) * multipliers[i % 2];
        if (producto > 9) producto -= 9;
        suma += producto;
    }

    let verificador = parseInt(cedula[10]);
    let resultado = (10 - (suma % 10)) % 10;

    if (verificador === resultado) {
        mensaje.innerText = "Cédula válida";
        mensaje.style.color = "green";
    } else {
        mensaje.innerText = "Cédula inválida";
        mensaje.style.color = "red";
    }
});
