
//Agregar datos de formularios a tabla
const form = document.getElementById("taskForm");

//Funcion que crea un objeto cuando el evento escucha un envio del formulario.
form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("Se ha enviado un formulario")
    let transferFormData = new FormData(form);
    let transactionObj = convertFormDataToTransactionObj(transferFormData);
    saveTransactionObj(transactionObj);
    insertRowTransitionTable(transactionObj);
    form.reset();
  });

  //Convierte el formData en un objeto para luego poder guardarlo de una forma mas optima
  function convertFormDataToTransactionObj(transferFormData) {
    let transactionUserName = transferFormData.get("transactionUserName");
    let transactionEmail = transferFormData.get("transactionEmail");
    let transactionTel = transferFormData.get("transactionTel");
    let transactionEvent = transferFormData.get("transactionEvent");
    let transactionDescription = transferFormData.get("transactionDescription");
    return {
        "transactionUserName": transactionUserName ,
        "transactionEmail": transactionEmail ,
        "transactionTel": transactionTel ,
        "transactionEvent": transactionEvent ,
        "transactionDescription": transactionDescription
    }
}

//Inserta una fila y unas celdas al formulario especifico.
function insertRowTransitionTable(transactionObj) {
    let transferTableRef = document.getElementById("transferTable");
    let newTransferRowTable = transferTableRef.insertRow(-1); //add a row to the final of table
    let newTypeCellRef = newTransferRowTable.insertCell(0); //Declara la variable and Add a celll in the row that was created
    newTypeCellRef.textContent = transactionObj["transactionUserName"];

    newTypeCellRef = newTransferRowTable.insertCell(1);
    newTypeCellRef.textContent = transactionObj["transactionEmail"];

    newTypeCellRef = newTransferRowTable.insertCell(2);
    newTypeCellRef.textContent = transactionObj["transactionTel"];

    newTypeCellRef = newTransferRowTable.insertCell(3);
    newTypeCellRef.textContent = transactionObj["transactionEvent"];

    newTypeCellRef = newTransferRowTable.insertCell(4);
    newTypeCellRef.textContent = transactionObj["transactionDescription"];
    
};

//Cargar items del localStorage aal formulario, tambien podria hacerlo con forEach.
document.addEventListener("DOMContentLoaded", function(event){
    let transactionObjArr = JSON.parse(localStorage.getItem("transferFormData"));
    for (i=0;i<transactionObjArr.length;i++) { 
        insertRowTransitionTable(transactionObjArr[i])
     }
})
/*//2º forma de hacerlo con forEach que es como la hace Damian, dejar por si mas adelante la usa
document.addEventListener("DOMContentLoaded", function(event){
    let transactionObjArr = JSON.parse(localStorage.getItem("transferFormData"));
    transactionObjArr.forEach( 
        function(arrayElement) {
            insertRowTransitionTable(arrayElement)
        }
    );
*/

//Guardar formulario en localstorage
function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transferFormData")) || [];
    myTransactionArray.push(transactionObj);
    //Convierto mi array a json
    let myTransactionArrayJSON = JSON.stringify(myTransactionArray);
    //guardo mi array de transaccion en formato json en el local storage
    localStorage.setItem("transferFormData", myTransactionArrayJSON);
}




//Mostrar y ocultar menu:
let switchDisplay = document.getElementById('switchDisplay');

switchDisplay.onclick = function() {
    let div = document.getElementById('taskForm');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
};

