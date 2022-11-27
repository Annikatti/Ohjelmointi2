<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Asiakas</title>
    <script src="scripts/main.js"></script>
    <style>
        body {
            font-family: Arial;
            font-size: 1rem;
        }

        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        thead {
            border-bottom: solid 1px black;
            background-color: goldenrod;
            font-weight: bold;
        }

        td {
            padding: 10px;
        }

        #toaster {
            position: fixed;
            display: inline-flex;
            flex-wrap: wrap;
            max-width: 400px;
            margin: 0 auto;
            padding: 32px;
            font-size: 1.5rem;
            top: 15px;
            left: 0;
            right: 0;
        }

        output {
            background-color: white;
            padding: 3px;
        }

        .success {
            border: 2px solid darkgreen;
        }

        .failure {
            border: 2px solid darkred;
        }

        .hidden,
        #toaster.hidden {
            display: none;
        }

        label {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            max-width: 400px;
        }

        label input {
            font-size: 1.1rem;
        }

        label output {
            margin-top: 5px;
        }
    </style>
</head>
<body>

<output id="toaster" class="hidden"></output>

<form id="uusi-asiakas" onsubmit="lisaaAsiakas()">
    <h2>Uuden asiakkaan lisäys</h2>

    <label for="etunimi">Etunimi:
        <input id="etunimi" name="etunimi" type="text">
        <output id="etunimi-error" class="failure hidden">Etunimi täytyy antaa</output>
    </label>

    <label for="sukunimi">Sukunimi:
        <input id="sukunimi" name="sukunimi" type="text">
        <output id="sukunimi-error" class="failure hidden">Sukunmi täytyy antaa</output>
    </label>

    <label for="puhelin">Puhelinnumero:
        <input id="puhelin" name="puhelin" type="tel">
        <output id="puhelin-error" class="failure hidden">Puhelinnumeron tulee olla muodossa 1234567</output>
    </label>

    <label for="sposti">Sähköpostiosoite:
        <input id="sposti" name="sposti" type="email">
        <output id="sposti-error" class="failure hidden">Tarkista sähköposti</output>
    </label>

    <button type="submit">Lisää uusi asiakas</button>
</form>

<h2>Asiakaslista</h2>
<table>
    <thead>
    <tr>
        <td>Etunimi</td>
        <td>Sukunimi</td>
        <td>Puhelinnumero</td>
        <td>Sähköpostiosoite</td>
    </tr>
    </thead>
    <tbody id="tbody"></tbody>
</table>

<script>
    formListeners();
    haeAsiakkaat();
</script>
</body>
</html>