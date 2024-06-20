function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return day + '/' + month +'/' + year;
}

const fechaActual = new Date();
const dateAct = document.getElementById('dateAct');


/* poner fecha en html */
dateAct.innerText = formatDate(fechaActual);



