<%--
  Created by IntelliJ IDEA.
  User: annik
  Date: 20.11.2022
  Time: 17.25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="scripts/main.js"></script>
    <style>
        body {
            font-family: Arial;
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
    </style>
</head>
<body>
<h1>Asiakaslista</h1>
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
    haeAsiakkaat()
</script>
</body>
</html>
