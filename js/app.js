
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
    let transactionId = getNewTransactionId();
    return {
        "transactionUserName": transactionUserName ,
        "transactionEmail": transactionEmail ,
        "transactionTel": transactionTel ,
        "transactionEvent": transactionEvent ,
        "transactionDescription": transactionDescription,
        "transactionId": transactionId
    };
};

//Inserta una fila y unas celdas al formulario especifico.
function insertRowTransitionTable(transactionObj) {
    let transferTableRef = document.getElementById("transferTable");
    let newTransferRowTable = transferTableRef.insertRow(-1); //add a row to the final of table
    newTransferRowTable.setAttribute("data-transaction-Id", transactionObj["transactionId"]);
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

    let newDeleteCell =  newTypeCellRef = newTransferRowTable.insertCell(5);
    let deleteButon = document.createElement("button");  
    deleteButon.textContent = "x";
    deleteButon.classList.add("buttonDeleteCustom");
    newDeleteCell.appendChild(deleteButon);
    deleteCell(deleteButon);
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

 //funcion que nos devuelve un ID unico
 function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId" || "-1");
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
    return newTransactionId;
}

//function para eliminar fila en tabla.
 function deleteCell(deleteButon){ //pondriamos el boton aqui
  deleteButon.addEventListener("click", (event) => {
      let confirmacion = confirm("¿Seguro que quieres eliminar la fila?")
      let transactionRow = event.target.parentNode.parentNode;
      let transactionId = transactionRow.getAttribute("data-transaction-id");
      if (confirmacion === true) {
          console.log("Se ha eliminado la fila con el ID: " + transactionRow.getAttribute("data-transaction-id"));
          transactionRow.remove();
          deleteTransacObj(transactionId);
      }
  });
}

//le paso como parametro el transactionId de la transaccion que quiero eliminar
  function deleteTransacObj(transactionId) {
      //Obtengo las transacciones de mi base de datos.
      let transactionObjArr = JSON.parse(localStorage.getItem("transferFormData"));
      //Busco la posicion de la transaccion que quiero eliminar
      let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId);
      //Elimino el elemento de esa posicion
      transactionObjArr.splice(transactionIndexInArray, 1);
       //Convierto mi array a json nuevamente
    let myTransactionArrayJSON = JSON.stringify(transactionIndexInArray);
    //Guardo mi array de transaccion en formato json en el local storage
    localStorage.setItem("transferFormData", myTransactionArrayJSON);
  }

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

