function formListeners() {
    const form = document.getElementById('uusi-asiakas');
    form.addEventListener('submit', (e) => e.preventDefault());

    const etunimi = document.getElementById('etunimi');
    etunimi.valid = false;
    etunimi.addEventListener('input', () => tarkistaNimi(etunimi));

    const sukunimi = document.getElementById('sukunimi');
    sukunimi.valid = false;
    sukunimi.addEventListener('input', () => tarkistaNimi(sukunimi));

    const puhelin = document.getElementById('puhelin');
    puhelin.valid = false;
    puhelin.addEventListener('input', () => tarkistaPuhelin(puhelin));

    const sposti = document.getElementById('sposti');
    sposti.valid = false;
    sposti.addEventListener('input', () => tarkistaSposti(sposti));
}

//Funktio XSS-hyökkäysten estämiseksi (Cross-site scripting)
function siivoa(teksti){
    teksti=teksti.replace(/</g, "");//&lt;
    teksti=teksti.replace(/>/g, "");//&gt;
    teksti=teksti.replace(/'/g, "''");//&apos;
    return teksti;
}

function tarkistaNimi(element) {
    element.value = siivoa(element.value);
    if (element.value.length > 0) {
        validInput(element);
        return;
    }

    invalidInput(element);
}

function tarkistaPuhelin(element) {
    element.value = siivoa(element.value);
    if (element.value.length === 7) {
        validInput(element);
        return;
    }

    invalidInput(element);
}

function tarkistaSposti(element) {
    element.value = siivoa(element.value);
    const emailRegexp = new RegExp('(?:[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\n' +
        '\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\n' +
        '\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:\n' +
        '(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');

    if (emailRegexp.test(element.value)) {
        validInput(element);
        return;
    }

    invalidInput(element);
}

function validInput(input) {
    input.valid = true;
    input.classList.remove('failure');
    input.classList.add('success');

    const error = document.getElementById(`${input.id}-error`);
    error.classList.add('hidden');
}

function invalidInput(input) {
    input.valid = false;
    input.classList.add('failure');

    const error = document.getElementById(`${input.id}-error`);
    error.classList.remove('hidden');
}

//funktio tietojen hakemista varten. Kutsutaan backin GET metodia
function haeAsiakkaat() {
    let url = "Asiakkaat";
    let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    fetch(url, requestOptions)
        .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
        .then(response => printItems(response))
        .catch(errorText => errorToast('Asiakkaan listan päivitys epäonnistui'));
}

//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
function printItems(respObjList){
    //console.log(respObjList);
    let htmlStr="";
    for(let item of respObjList){//yksi kokoelmalooppeista
        htmlStr+="<tr id='rivi_"+item.id+"'>";
        htmlStr+="<td>"+item.etunimi+"</td>";
        htmlStr+="<td>"+item.sukunimi+"</td>";
        htmlStr+="<td>"+item.puhelin+"</td>";
        htmlStr+="<td>"+item.sposti+"</td>";
        htmlStr+="</tr>";
    }
    document.getElementById("tbody").innerHTML = htmlStr;
}

function successToast(succeessText) {
    const toaster = document.getElementById('toaster');
    toaster.innerHTML = succeessText;
    toaster.classList.remove('hidden');
    toaster.classList.add('success');
    clearToaster();
}

function errorToast(errorText) {
    const toaster = document.getElementById('toaster');
    toaster.innerHTML = errorText;
    toaster.classList.remove('hidden');
    toaster.classList.add('failure');
    clearToaster();
}

function clearToaster() {
    const toaster = document.getElementById('toaster');
    setTimeout(() => {
        toaster.innerHTML="";
        toaster.classList.add('hidden');
        toaster.classList.remove('failure', 'success');
    }, 3000);
}
}