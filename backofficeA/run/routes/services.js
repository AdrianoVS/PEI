var express = require('express');
var router = express.Router();
var util = require("util");
var fs = require("fs");
var path = require('path');
var url = require('url');
var formidable = require("formidable")
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")

/* GET home page. */
router.get('/', function(req, res, next) {

    var db = req.connection;
    var data = "";
    var steps;
    var servs;
    var opts;
    db.query('SELECT * FROM STEP',function(err,rows){
        steps  = rows;
        db.query('SELECT * FROM SERVICE',function(err,rows){
            servs  = rows;
            db.query('SELECT * FROM OPCAO',function(err,rows){
                opts  = rows;
                res.render('services', { title: 'Services', dataSteps: steps, dataServs: servs, dataOpts: opts });
            });
        });
    });
});


router.post('/serv', function(req, res) {
    var db = req.connection;
    console.log(req.body.definicao);
    var definicao="", composicao="", ponto="", peso="", largurai="", larguraii="", larguraif="", larguraf="", largurafi="", larguraff="", quantidade="",
        caderno="", preparacao="", gasar="", branquear="", meiobranco="", branco="", be="", lavar="", mercerizar="",
        tinturaria="", reativos="", cubas="", pigmentos="", reativosP="", cubasP="", pigmentosP="", dispersosP="", acabamentos="", secar="",
        acabar="", largura="", calandar="", q="", f="", sanforizar="", tumbler="", embalagem="",
        enfestar="", em="", ei="", rm="", nr="", enrolar="", nren="";
    if (req.body.definicao == "1") {
        definicao = "INSERT INTO STEP (id_STEP, DESCRIPTION) VALUES (1, 'defProduto');";
        if (req.body.composicao2 == "1") {
            composicao = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (1, 'composicao', 1, null);";
        }
        if (req.body.ponto2 == "1") {
            ponto = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (2, 'ponto', 1, null);";
        }
        if (req.body.peso2 == "1") {
            peso = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (3, 'peso', 1, null);";
        }
        if (req.body.largini2 == "1") {
            largurai = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (4, 'largurai', 1, null);";

            if (parseInt(req.body.numlariniII2)>0) {
                larguraii = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (1, 'larguraii', " + req.body.numlariniII2 +", 4);";
                larguraif = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (2, 'larguraif', " + req.body.numlariniFF2 +", 4);";
            }
        }
        if (req.body.largfin2 == "1") {
            larguraf="INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (5, 'larguraf', 1, null);";

            if (parseInt(req.body.numlarfinII2)>0) {
                largurafi= "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (3, 'largurafi', " + req.body.numlarfinII2 + "?, 5);";
                larguraff= "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (4, 'larguraff', " + req.body.numlarfinFF2 +" ?, 5);";
            }
        }
        if (req.body.quantidade2 == "1") {
            quantidade="INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (8, 'quantidade', 1, null);";
        }
        if (req.body.caderno2 == "1") {
            caderno = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (9, 'caderno', 1, null);";
        }

    }

    if (req.body.preparacao == "1") {
        preparacao = "INSERT INTO STEP (id_STEP, DESCRIPTION) VALUES (2, 'preparacao');";

        if (req.body.gasar2 == "1") {
            gasar="INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (10, 'gasar', 2, null);";
        }
        if (req.body.branquear2 == "1") {
            branquear="INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (11, 'branquear', 2, null);";
            if (req.body.meiobranco2 == "1") {
                meiobranco = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (5, 'meiobranco', null, 11);";
            }
            if (req.body.branco2 == "1") {
                branco = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (6, 'branco', null, 11);";
            }
            if (req.body.be2 == "1") {
                be = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (7, 'be', null, 11);";
            }
        }
        if (req.body.lavar2 == "1") {
            lavar = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (12, 'lavar', 2, null);";
        }
        if (req.body.mercerizar2 == "1") {
            mercerizar = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (13, 'mercerizar', 2, null);";
        }
    }

    if (req.body.tinturaria == "1") {
        tinturaria = "INSERT INTO STEP (id_STEP, DESCRIPTION) VALUES (3, 'tinturaria');";
        if (req.body.reativos2 == "1") {
            reativos = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (14, 'reativos', 3, null);";
        }
        if (req.body.cubas2 == "1") {
            cubas = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (15, 'cubas', 3, null);";
        }
        if (req.body.pigmentos2 == "1") {
            pigmentos = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (16, 'pigmentos', 3, null);";
        }
        if (req.body.reativosP2 == "1") {
            reativosP = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (17, 'reativosP', 3, null);";
        }
        if (req.body.cubasP2 == "1") {
            cubasP = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (18, 'cubasP', 3, null);";
        }
        if (req.body.dispersosP2 == "1") {
            dispersosP = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (19, 'dispersosP', 3, null);";
        }
        if (req.body.pigmentosP2 == "1") {
            pigmentosP = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (20, 'pigmentosP', 3, null);";
        }
    }

    if (req.body.acabamentos == "1") {
        acabamentos="INSERT INTO STEP (id_STEP, DESCRIPTION) VALUES (4, 'acabamentos');";
        if (req.body.secar2 == "1") {
            secar = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (21, 'secar', 4, null);";
        }
        if (req.body.acabar2 == "1") {
            acabar = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (22, 'acabar', 4, null);";
        }
        if (req.body.largura2 == "1") {
            largura = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (23, 'largura', 4, null);";
        }
        if (req.body.calandar2 == "1") {
            calandar = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (24, 'calandar', 4, null);";
            if (req.body.q2== "1") {
                q = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (8, 'q', null, 24);";
            }
            if (req.body.f2== "1") {
                f = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (9, 'f', null, 24);";
            }
        }
        if (req.body.sanforizar2 == "1") {
            sanforizar = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (25, 'sanforizar', 4, null);";
        }
        if (req.body.tumbler2 == "1") {
            tumbler = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (26, 'tumbler', 4, null);";
        }

    }


    if (req.body.embalagem == "1") {
        embalagem = "INSERT INTO STEP (id_STEP, DESCRIPTION) VALUES (5, 'embalagem');";
        if (req.body.enfestar2 == "1") {
            enfestar="INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (27, 'enfestar', 5, null);";
            if (req.body.em2== "1") {
                em = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (10, 'em', null, 27);";
            }
            if (req.body.ei2== "1") {
                ei="INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (11, 'ei', null, 27);";
            }
            if (req.body.rm2== "1") {
                rm = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (12, 'rm', null, 27);";
            }
            if (req.body.nr2>0== "1") {
                nr = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (13, 'quantenf', null, 27);";
            }
        }
        if (req.body.enrolar2 == "1") {
            enrolar = "INSERT INTO SERVICE (id_SERVICE, DESCRIPTION, STEP_id_step, VALOR) VALUES (28, 'enrolar', 5, null);";
            if (req.body.nren2== "1") {
                nren = "INSERT INTO OPCAO (id_OPTION, DESCRIPTION, VALOR, SERVICE_id_SERVICE) VALUES (9, 'quantenr', null, 28);";
            }
        }
    }

    var sql = definicao+ composicao+ ponto+ peso+ largurai+ larguraii+ larguraif+ larguraf+ largurafi+ larguraff+ quantidade+ caderno+
        preparacao+ gasar+ branquear+ meiobranco+ branco+ be+ lavar+ mercerizar+ tinturaria+ reativos+ cubas+ pigmentos+ reativosP+
        cubasP+ pigmentosP+ dispersosP+ acabamentos+ secar+ acabar+ largura+ calandar+ q+f+ sanforizar+ tumbler+ embalagem+
        enfestar+ em+ ei+ rm+ nr+ enrolar+ nren;

    console.log(sql);

    db.query(sql,function (error, result, client) {
        console.log(result);
        console.log(error);
        res.redirect('/services');
    });

});


module.exports = router;
