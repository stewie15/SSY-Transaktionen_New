const express = require('express');
const router = express.Router();
const Request = require('request');

router.post('/start_transaction', startTransaction);

function startTransaction(req, transactionResp) {
    /* { carNr: 7,
         renter: "Frida Flink",
         amount: 190
       }
     */
    Request.post({
        url: 'http://127.0.0.1:3000/cars/prepare',
        json: {
            carNr: req.body.carNr,
            renter: req.body.renter
        }
    }, carResponse);

    function carResponse(err, carResp, body) {
        if (carResp.statusCode != 200) {
            transactionResp.status(409).json('/cars nicht bereit für prepare');
            return;
        }

        Request.post({
            url: 'http://127.0.0.1:3000/invoices/prepare',
            json: {
                invoiceNr: req.body.carNr,
                person: req.body.renter,
                amount: req.body.amount
            }
        }, invoiceResponse);
    }

    function invoiceResponse(err, invoiceResp, body) {
        if (invoiceResp.statusCode != 200) {
            // Cars muss wieder freigegeben werden
            Request.post({
                url: 'http://127.0.0.1:3000/cars/cancel',
                json: true
            });
            // wir warten die Antwort von /cars nicht ab, sondern senden gleich Fehler an Client retour
            transactionResp.status(409).json('/invoices nicht bereit für prepare');
            return;
        }

        // ansonsten sind beide bereit -> commit; wir warten Antworten nicht ab.
        Request.post({
            url: 'http://127.0.0.1:3000/cars/commit',
            json: true
        });
        Request.post({
            url: 'http://127.0.0.1:3000/invoices/commit',
            json: true
        });

        transactionResp.status(200).json('Transaktion erfolgreich beendet.');
    }

}



module.exports = router;