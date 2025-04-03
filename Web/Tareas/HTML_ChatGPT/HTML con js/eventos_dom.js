// 1. Posición del mouse
document.addEventListener("mousemove", function(event) {
    const pos = document.getElementById("mousePosition");
    pos.textContent = `Posición del mouse: X=${event.clientX}, Y=${event.clientY}`;
});

// 2. Nombre completo
document.getElementById("form1").addEventListener("submit", function(e) {
    e.preventDefault();
    const fname = document.getElementById("form-fname").value;
    const lname = document.getElementById("form-lname").value;
    const fullName = document.createElement("p");
    fullName.textContent = `Nombre completo: ${fname} ${lname}`;
    document.getElementById("form1").appendChild(fullName);
});

// 3. Insertar fila
document.getElementById("btn-insert-r").addEventListener("click", function() {
    const table = document.getElementById("sampleTable");
    const newRow = table.insertRow();
    const cols = table.rows[0].cells.length;
    for (let i = 0; i < cols; i++) {
        const cell = newRow.insertCell();
        cell.textContent = `New row column ${i + 1}`;
    }
});

// 3. Insertar columna
document.getElementById("btn-insert-c").addEventListener("click", function() {
    const table = document.getElementById("sampleTable");
    for (let row of table.rows) {
        const newCell = row.insertCell();
        newCell.textContent = `New col`;
    }
});

// 4. Modificar tabla
document.getElementById("btn-change").addEventListener("click", function() {
    const row = parseInt(document.getElementById("rowIndex").value) - 1;
    const col = parseInt(document.getElementById("colIndex").value) - 1;
    const val = document.getElementById("newValue").value;
    const table = document.getElementById("myTable");
    if (table.rows[row] && table.rows[row].cells[col]) {
        table.rows[row].cells[col].textContent = val;
    } else {
        alert("Índice inválido");
    }
});

// 5. Agregar color aleatorio
document.getElementById("btn-add-color").addEventListener("click", function() {
    const select = document.getElementById("colorSelect");
    const option = document.createElement("option");
    const r = () => Math.floor(Math.random() * 256);
    option.textContent = `rgb(${r()}, ${r()}, ${r()})`;
    select.appendChild(option);
});

// 5. Quitar último color
document.getElementById("btn-rmv-color").addEventListener("click", function() {
    const select = document.getElementById("colorSelect");
    if (select.options.length > 0) select.remove(select.options.length - 1);
});

// 6. Cambiar imagen con tamaño aleatorio al pasar el mouse
document.getElementById("imagenGato").addEventListener("mouseenter", function() { 
    const width = Math.floor(Math.random() * 301) + 300;
    const height = Math.floor(Math.random() * 301) + 300;
    this.src = `http://placecats.com/${width}/${height}`;
    const sizeDisplay = document.getElementById("imagenSize");
    if (sizeDisplay) {
        sizeDisplay.textContent = `Tamaño actual: ${width} x ${height}`;
    }
});