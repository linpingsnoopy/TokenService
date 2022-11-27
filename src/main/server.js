var express = require('express');
var router = express();
var crypto = require('crypto');
var base64url = require('base64url');

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

function randomStringAsBase64Url(size) {
    return base64url(crypto.randomBytes(size));
}

const AccountDao = require('./AccountDao');
const dao = new AccountDao();

router.get('/accounts', function (req, res) {
    var result = dao.list();
    console.log( result);
    return res.status(200).send(result);
})

router.post('/tokenize', function (req, res) {
    console.log(req.body);
    if (!validateCards(req.body)) return res.status(400).send("Invalid request body");
    req.body.forEach(function(account) {
        var result = dao.getById(account);
        if (result === null) {
            var newRecord = {"account": account, "token": randomStringAsBase64Url(24)};
            dao.putAccount(newRecord);
        }
    })

    var response = dao.getTokensByAccounts(req.body);
    res.status(200).send(response);
});

router.post('/detokenize', function (req, res) {
    if (!validateTokens(req.body)) return res.status(400).send("Invalid request body");
    var response = dao.getAccountsByTokens(req.body);
    res.status(200).send(response);
});

function validateCards(body) {
    if (body.length === 0) return false;
    const regExpLiteral = /\d{4}[-]\d{4}[-]\d{4}[-]\d{4}/g;
    for (let i=0; i< body.length; i++) {
        if (body[i].length != 19 || body[i].match(regExpLiteral) === null) {
            return false;
        }
    }
    return true;
}

function validateTokens(body) {
    if (body.length === 0) return false;
    for (let i=0; i< body.length; i++) {
        if (body[i].length != 32) {
            return false;
        }
    }
    return true;
}

var server = router.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example router listening at http://%s:%s", host, port)
});

module.exports = router;