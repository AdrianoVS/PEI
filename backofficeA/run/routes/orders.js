var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.connection;
    db.query("SELECT COUNT(idMESSAGES) AS mg FROM ADMIN_MESSAGE WHERE Tipo=0 and IS_READ=1", function (error, result, client) {
        req.app.locals.inbox = result[0].mg;
        db.query("SELECT COUNT(ID_ORDER) AS ord FROM ORDEM WHERE STATUS=0", function (error, result, client) {
            req.app.locals.missedOrders = result[0].ord;
            db.query("SELECT COUNT(ID_TASK) AS tamanho FROM Task WHERE STATE=0", function (error, result, client) {
                req.app.locals.missedMenu = result[0].tamanho;
                if(req.app.locals.admin.IS_LOGGED==1){
                    db.query("SELECT * from ORDEM WHERE STATUS=0", function (error, result, client){
                        ordersListMiss = result;
                        db.query("SELECT * from ORDEM WHERE STATUS!=0", function (error, result, client) {
                            other = result;
                            res.render('orders', {title: 'Encomendas', ordersMiss: ordersListMiss, otherOrders: other});
                        });
                    });
                }
                else {res.redirect('/')}
            });
        });
    });
});

router.post("/:userID", function(req, res, next){
    var db = req.connection;
    db.query("SELECT * from ORDEM WHERE STATUS=0 and Client_NIF=?",req.params.userID, function (error, result, client){
        ordersListMiss = result;
        db.query("SELECT * from ORDEM WHERE STATUS!=0 and Client_NIF=?", function (error, result, client) {
            other = result;
            res.render('orders', {title: 'Encomendas', ordersMiss: ordersListMiss, otherOrders: other});
        });
    });
});

module.exports = router;
