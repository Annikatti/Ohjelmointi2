<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
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