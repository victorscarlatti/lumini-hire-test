var db = openDatabase("SEILA33", "1.0", "testão", 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(ID INTEGER PRIMARY KEY AUTOINCREMENT, EMAIL VARCHAR(30), SENHA VARCHAR(30), TELEFONE INTEGER);');
});

function cadastrar() {


    var valid3 = 0;
    var email = document.getElementById('inputEmail').value;
    var senha = document.getElementById('inputPassword').value;
    var telefone = document.getElementById('inputTelefone').value;

    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO USUARIO (EMAIL, SENHA, TELEFONE) VALUES(?,?,?);", [email, senha, telefone]);

        tx.executeSql('SELECT * FROM USUARIO WHERE EMAIL=?;', [email], function (tx, resultado) {


            var rows = resultado.rows;

            var mail = rows[0].EMAIL;

            if (rows[0].EMAIL == email) {

                alert('Cadastrado Com Sucesso!!!: ' + mail)

                window.location.href = "autenticacao.html";

                valid3 = 1;
            }
            if (rows[0].EMAIL != email) {

                alert  ('Tente novamente')

            }
        });

    }, null);
}

function mostrar() {

    var table = document.getElementById('tbId');

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USUARIO;', [], function (tx, resultado) {

            var rows = resultado.rows;
            var tr = '';
            for (var i = 0; i < rows.length; i++) {
                tr += '<tr style=" text-align: center; color:mediumaquamarine;  background-color:black; padding:10px; border-style: solid; border-color: mediumaquamarine;">';
                tr += '<td style=" text-align: center; color:mediumaquamarine; padding:10px; border-style: solid; border-color: mediumaquamarine;">' + rows[i].ID + '</td>';
                tr += '<td style=" text-align: center; color:mediumaquamarine; padding:10px; border-style: solid; border-color: mediumaquamarine;">' + rows[i].EMAIL + '</td>';
                tr += '<td style=" text-align: center; color:mediumaquamarine; padding:10px; border-style: solid; border-color: mediumaquamarine;">' + rows[i].SENHA + '</td>';
                tr += '<td style=" text-align: center; color:mediumaquamarine; padding:10px; border-style: solid; border-color: mediumaquamarine;">' + rows[i].TELEFONE + '</td>';
                tr += '</tr>';
            }
            table.innerHTML = tr;
        });
    }, null);
}

function autenticar() {


    var valid = 0;
    var email = document.getElementById('inputEmail').value;
    var senha = document.getElementById('inputPassword').value;

    db.transaction(function (tx) {
        tx.executeSql('SELECT EMAIL, SENHA FROM USUARIO WHERE EMAIL=? AND SENHA =?;', [email, senha], function (tx, resultado) {

            var rows = resultado.rows;

            for (var i = 0; i < rows.length; i++) {

                var mail = rows[i].EMAIL;

                if (rows[i].EMAIL == email && rows[i].SENHA == senha) {
                    alert('seja bem vindo: ' + mail)

                    window.location.href = "opcoes.html";

                    valid = 1;
                }
                if (valid == 0) {
                    window.location.href = "autenticacao.html";
                    alert(' Autenticação Negada')
                }
            }
            if (valid == 0) {
                alert('Autenticação Negada')
                window.location.href = "autenticacao.html";
            }

            if (rows[i].EMAIL == email && rows[i].SENHA == senha) {
                alert('seja bem vindo: ' + mail)

                window.location.href = "opcoes.html";

                valid = 1;
            }
        });

    }, null);
}

function excluir() {

    var email = document.getElementById('inputEmail').value;

    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM USUARIO WHERE EMAIL =?;', [email], function (tx, resultado) {

        });
    }, null);
}

function alterar() {

    var valid2 = 0;

    var id = document.getElementById('inputId').value;
    var email = document.getElementById('inputEmail').value;
    var senha = document.getElementById('inputPassword').value;
    var telefone = document.getElementById('inputTelefone').value;


    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USUARIO WHERE ID =?;', [id], function (tx, resultado) {
            var rows = resultado.rows;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].ID == id) {
                    alert('aceito: ')

                    tx.executeSql("UPDATE USUARIO SET EMAIL = ?, SENHA = ?, TELEFONE = ? WHERE ID=? ;", [email, senha, telefone, id]);

                    window.location.href = "alterar.html";

                    valid2 = 1;
                } else {
                    alert('Autenticação Negada')
                    window.location.href = "alterar.html";
                    valid2 = 0;
                }
            }
            if (valid2 == 0) {
                alert('Autenticação Negada')
                window.location.href = "alterar.html";
                valid2 = 0;
            }
        });
    }, null);
}