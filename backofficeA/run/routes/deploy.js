var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var fs = require('fs')
var formidable = require("formidable")

router.get('/', function(req, res, next) {

    res.render("importar")
});

router.post('/',function(req,res,next){
    var form= new formidable.IncomingForm();
    var status=""
    var querysql = ""
    var i = 0
    var db2 = req.connection;

        db2.query('SELECT count(*) as tamanho from administrator', function(err8, rows) {
             i = rows[0].tamanho
        })

    var db = req.connection;
            form.parse(req,function(err,fields,files){
                if(files.ficheiro!=undefined){
                    var contents
                    try{
                        contents = fs.readFileSync(files.ficheiro.path,"utf8")
                    }
                    catch(err){
                        res.render("importar",{status:"Ocorreu um erro na leitura do ficheiro. Por favor tente novamente"})
                        return
                    }
                    if(contents!=undefined){
                        var separadoPorTipo = contents.split(";")
                        for(var tipo in separadoPorTipo){
                            var lista = separadoPorTipo[tipo]

                            if(lista.indexOf("Company") !== -1){
                                lista = lista.substring(lista.indexOf('[')).split("},")
                                lista = '{"list":'+lista+'}'
                                lista = JSON.parse(lista).list
                                for(elem in lista){
                                    querysql += "INSERT INTO `DEPLOY` (`NAME`, `ID`, `EMAIL`, `PHONE`, `ADRESS`, `WEBPAGE_LINK`, `URL_ICON`, `FACEBOOK_LINK`, `TWITTER_LINK`) VALUES('"+ lista[elem].name +"',1,'"+ lista[elem].email + "','" + lista[elem].phone + "','" + lista[elem].adress + "','" + lista[elem].webpage_link + "','" + lista[elem].url_icon + "','" + lista[elem].facebook_link + "','" + lista[elem].twitter_link + "');"
                                }
                            }

                            else {
                                lista = lista.substring(lista.indexOf('[')).split('-')
                                lista = '{"list":'+lista+'}'
                                lista = JSON.parse(lista).list

                                for(elem in lista){
                                    i++
                                    querysql += "INSERT INTO `administrator` (`id_ADMINISTRATOR`, `EMAIL`, `PASSWORD`, `DEPLOY`, `IS_LOGGED`) VALUES("+ i +",'"+ lista[elem].email + "','" + lista[elem].password + "',1,0);"
                                }
                            }
                        }
                        console.log(querysql)
                        db.query(querysql, function(err3, result, clint) {
                            if (err3) {
                                console.log("Erro ao fazer Deploy:\r\n" + err3 + "\r\n\r\n");
                                status = " Ocorreu um erro: " + err3
                                res.render('importar', {title: 'Deploy', status: status});
                            }

                        })
                        status = "Deploy feito com sucesso."
                        console.log("Deploy efectuado com sucesso")
                        res.cookie('deploy', 1)
                        res.redirect("/")
                    }
                    else{
                        res.render("importar",{status:"Ocorreu um erro na leitura do ficheiro. Por favor tente novamente"})
                        return
                    }
                }
                else{
                    res.render("importar",{status:"Não foi submetido nenhum ficheiro"})
                    return
                }


            })

    })

module.exports = router;