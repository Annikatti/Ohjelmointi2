function formListeners() {
    const form = document.getElementById('uusi-asiakas');
    form.addEventListener('submit', (e) => e.preventDefault());

    addInputListener('etunimi', false, tarkistaNimi);
    addInputListener('sukunimi', false, tarkistaNimi);
    addInputListener('puhelin', false, tarkistaPuhelin);
    addInputListener('sposti', false, tarkistaSposti);
}

function addInputListener(id, isValid, validator) {
    const input = document.getElementById(id);
    input.valid = isValid;
    input.addEventListener('input', () => validator(input));
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

    try {
        const error = document.getElementById(`${input.id}-error`);
        error.classList.add('hidden');
    } catch (error) {}
}

function invalidInput(input) {
    input.valid = false;
    input.classList.add('failure');

    try {
        const error = document.getElementById(`${input.id}-error`);
        error.classList.remove('hidden');
    } catch (error) {}
}

//funktio tietojen hakemista varten. Kutsutaan backin GET metodia
function haeAsiakkaat() {
    let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    fetch("Asiakkaat", requestOptions)
        .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
        .then(response => printItems(response))
        .catch(errorText => errorToast('Asiakkaan listan päivitys epäonnistui'));
}

//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
function printItems(respObjList){
    const lista = document.getElementById("tbody");
    lista.innerHTML = "";

    for(let item of respObjList){//yksi kokoelmalooppeista
        lista.innerHTML +="<tr id='rivi_"+item.id+"'>" +
            "<td><input id='" + item.id + "_etunimi' name='etunimi' type='text' value='" + item.etunimi + "'></td>" +
            "<td><input id='" + item.id + "_sukunimi' name='sukunimi' type='text' value='"+ item.sukunimi + "'></td>" +
            "<td><input id='" + item.id + "_puhelin' name='puhelin' type='tel' value='" + item.puhelin + "'></td>" +
            "<td><input id='" + item.id + "_sposti' name='sposti' type='email' value='" + item.sposti + "'></td>" +
            "<td class='hidden'><input id='" + item.id + "_id' name='id' type='number' value='" + item.id + "'></td>" +
            "<td><button onclick='poistaAsiakas(" + item.id + ")'>Poista asiakas</button></td>" +
            "<td><button onclick='paivitaAsiakastiedot(" + item.id + ")'>Päivitä asiakastiedot</button></td>" +
            "</tr>";

        window.requestAnimationFrame(() => {
            addInputListener(`${item.id}_etunimi`, true, tarkistaNimi);
            addInputListener(`${item.id}_sukunimi`, true, tarkistaNimi);
            addInputListener(`${item.id}_puhelin`, true, tarkistaPuhelin);
            addInputListener(`${item.id}_sposti`, true, tarkistaSposti);
        });
    }
}

function lisaaAsiakas() {
    const form = document.getElementById('uusi-asiakas');
    const asiakas = tarkistaLomake(form);

    if (!asiakas) {
        errorToast('Tarkista lomakkeen tiedot!');
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: asiakas
    };

    fetch("Asiakkaat", requestOptions)
        .then(response => response.json())
        .then(responseJSON => {
            if (responseJSON.success) {
                resetForm(form);
                successToast('Asiakas lisätty onnistuneesti');
                haeAsiakkaat();
            } else {
                errorToast('Asiakkaan lisääminen epäonnistui');
            }
        })
}

function paivitaAsiakastiedot(id) {
    const lomake = document.createElement("form");
    lomake.appendChild(document.getElementById(`${id}_etunimi`));
    lomake.appendChild(document.getElementById(`${id}_sukunimi`));
    lomake.appendChild(document.getElementById(`${id}_puhelin`));
    lomake.appendChild(document.getElementById(`${id}_sposti`));
    lomake.appendChild(document.getElementById(`${id}_id`));
    const asiakas = tarkistaLomake(lomake);

    if (!asiakas) {
        errorToast('Tarkista päivitettävän asiakkaan tiedot!');
        haeAsiakkaat();
        return;
    }

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: asiakas
    };

    fetch("Asiakkaat", requestOptions)
        .then(response => response.json())
        .then(responseJSON => {
            if (responseJSON.success) {
                successToast('Asiakastiedot päivitetty onnistuneesti');
                haeAsiakkaat();
            } else {
                errorToast('Asiakastietojen päivittäminen epäonnistui');
            }
        })
}

function tarkistaLomake(form) {
    const formData = new FormData(form);
    const jsonData = formdataToJSON(formData);

    if (!isValidForm(form)) {
        return false;
    }

    return jsonData;
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

function isValidForm(form) {
    let isValid = true;
    for (input of form.getElementsByTagName('input')) {
        if (input.valid === false) {
            isValid = false;
            invalidInput(input);
        };
    }

    return isValid;
}

function resetForm(form) {
    form.reset();

    for (input of form.getElementsByTagName('input')) {
        input.classList.remove('success', 'failure');
        input.valid = false;
    }
}

function poistaAsiakas(id) {
    const url = `Asiakkaat?id=${id}`;
    const requestOptions = {method: "DELETE"};

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(responseJSON => {
            if (responseJSON.success) {
                successToast('Asiakas poistettu onnistuneesti');
                haeAsiakkaat();
            } else {
                errorToast('Asiakkaan poistaminen epäonnistui');
            }
        })
}

function formdataToJSON(formData) {
    return JSON.stringify(Object.fromEntries(formData.entries()));
}