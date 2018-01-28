var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.connection;
    db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 0 ORDER by Data',function (error, result, client){
       var inbox_msm = result;
        db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 1 ORDER by Data',function (error, result, client){
            var sent_msm = result;
            db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 2 ORDER by Data',function (error, result, client){
               var  trash_msm = result;
                db.query('SELECT * FROM ADMIN_MESSAGE where IS_FAVORITE=1 ORDER by Data',function (error, result, client){
                    var favorites_msm = result;
                    res.render('message', { title: 'Mensagens', inbox_msm: inbox_msm, sent_msm: sent_msm, trash_msm: trash_msm, favorites_msm: favorites_msm });
                });
            });
        });

    });
});

router.post('/:mailID', function (req, res) {
    var db = req.connection;
    db.query('SELECT tipo FROM ADMIN_MESSAGE where idMESSAGES=?',req.params.mailID,function (error, result, client) {
        tipoo=result;
        db.query('UPDATE ADMIN_MESSAGE SET tipo=2 where idMESSAGES=?',req.params.mailID,function (error, result, client){
            db.query('UPDATE ADMIN_MESSAGE SET IS_FAVORITE=0 where idMESSAGES=?',req.params.mailID,function (error, result, client){
                db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 0 ORDER by Data',function (error, result, client){
                    var inbox_msm = result;
                    db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 1 ORDER by Data',function (error, result, client){
                        var sent_msm = result;
                        db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 2 ORDER by Data',function (error, result, client){
                            var  trash_msm = result;
                            db.query('SELECT * FROM ADMIN_MESSAGE where IS_FAVORITE=1 ORDER by Data',function (error, result, client){
                                var favorites_msm = result;
                                if(tipoo[0].tipo==0){req.app.locals.inbox=req.app.locals.inbox-1;}
                                res.redirect('/messages');
                            });
                        });
                    });

                });
            });

        });
    });
});

router.post('/favorite/:mailID', function (req, res) {
    var db = req.connection;
    db.query('SELECT IS_FAVORITE FROM ADMIN_MESSAGE where idMESSAGES=?',req.params.mailID,function (error, result, client) {
        tipoo=result;
        if(tipoo[0].IS_FAVORITE==0){
            db.query('UPDATE ADMIN_MESSAGE SET IS_FAVORITE=1 where idMESSAGES=?',req.params.mailID,function (error, result, client){
                db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 0 ORDER by Data',function (error, result, client){
                    var inbox_msm = result;
                    db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 1 ORDER by Data',function (error, result, client){
                        var sent_msm = result;
                        db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 2 ORDER by Data',function (error, result, client){
                            var  trash_msm = result;
                            db.query('SELECT * FROM ADMIN_MESSAGE where IS_FAVORITE=1 ORDER by Data',function (error, result, client){
                                var favorites_msm = result;
                                res.redirect('/messages');
                            });
                        });
                    });

                });
            });
        }
        else{
            db.query('UPDATE ADMIN_MESSAGE SET IS_FAVORITE=0 where idMESSAGES=?',req.params.mailID,function (error, result, client){
                db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 0 ORDER by Data',function (error, result, client){
                    var inbox_msm = result;
                    db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 1 ORDER by Data',function (error, result, client){
                        var sent_msm = result;
                        db.query('SELECT * FROM ADMIN_MESSAGE where tipo = 2 ORDER by Data',function (error, result, client){
                            var  trash_msm = result;
                            db.query('SELECT * FROM ADMIN_MESSAGE where IS_FAVORITE=1 ORDER by Data',function (error, result, client){
                                var favorites_msm = result;
                                res.redirect('/messages');
                            });
                        });
                    });

                });
            });
        }

    });
});
module.exports = router;
