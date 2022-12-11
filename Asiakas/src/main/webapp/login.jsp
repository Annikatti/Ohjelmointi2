<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Kirjautuminen</title>
    <script src="scripts/login.js"></script>
    <style>
        body {
            font-family: Arial;
            font-size: 1rem;
        }

        form {
            width: 400px;
            margin: 100px auto 0;
            border: 1px solid black;
            border-radius: 3px;
            padding: 30px;
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

        .hidden,
         #toaster.hidden {
             display: none;
         }

        output {
            background-color: white;
            padding: 3px;
        }

        .failure {
            border: 2px solid darkred;
        }
    </style>
</head>
<body onload="prepareForm()">
    <output id="toaster" class="failure hidden"></output>

    <form id="loginForm" name="loginForm" onsubmit="hashPwd()">
        <label for="sposti">Sähköposti:
            <input id="sposti" name="sposti" type="email">
        </label>

        <label for="pwd">Salasana:
            <input id="pwd" name="pwd" type="password">
            <input id="hashedPwd" name="hashedPwd" type="hidden">
        </label>

        <button type="submit">Kirjaudu</button>
    </form>
</body>
</html>