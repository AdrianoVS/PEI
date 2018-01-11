var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var user = require("../models/user")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lr', { title: 'Signup'});
  
});

router.post('/',function(req,res,next) {
  var form= new formidable.IncomingForm();
  var status=""
  
  form.parse(req,function(err,fields,files){

      console.log(JSON.stringify(fields))
      var db = req.connection;
      //verificar se já existe algum utilizador com o username inserido no formulário
      db.query('SELECT * FROM CLIENT WHERE NIF ='+ fields.nif ,function(err2,docs){
        if(!err2){
          if(docs.length === 0){
            if(fields.password!=fields.cpassword){
              status="Erro na confirmação de password"
              res.render('lr',{ title: 'Signup' , status: status  });
            }
            else{
                db.query('INSERT INTO CLIENT(NAME,NIF,EMAIL,PHONE,STREET,DOOR_NUMBER,CITY,COUNTRY,ZIP_CODE,PASS,IS_BLOCKED) VALUES('
                + fields.fname + ' ' + fields.lname + ','
                + fields.nif + ','
                + fields.email + ','
                + fields.phone + ','
                + fields.street + ','
                + fields.door_number + ','
                + fields.city + ','
                + fields.country + ','
                + fields.zip_code + ','
                + fields.password + ','
                + fields.is_blocked + ')', function(err3, doc){
                    if(!err3){
                      status="Registo Efetuado com sucesso."
                      res.redirect("/order")
                    }
                    else{
                      console.log("Erro ao efetuar o registo:\r\n" + err3 +"\r\n\r\n");
                      status=" Ocorreu um erro: "+err3
                      res.render('lr',{ title: 'Signup' , status: status  });
                    }
                res.render('lr',{ title: 'Signup' , status: status  });
              })
            }
          }
          else{
            res.render('lr',{title: 'Signup', status: 'Já existe um utilizador com esse nif'})
          }
        }
        else{
          console.log("Erro a adicionar utilizador: " + err2)
          res.render('lr',{title: 'Signup', status: 'Ocorreu um erro, por favor tente novamente'})
        }
      })

  })

})

module.exports = router;
