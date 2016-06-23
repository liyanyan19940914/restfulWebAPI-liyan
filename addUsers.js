var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.post('/addUsers', function (req, res,next) {

            fs.readFile(__dirname + "/" + "items.json", 'utf8', function (err, data) {
                if(err)
                    return next(err);
                data = JSON.parse(data);
                var item = {
                    "id": id++,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };
                if(isCorrectType(item)){
                    data.splice(data.length, 0, item);
                    fs.writeFile(__dirname + "/" + "items.json", JSON.stringify(data), function (err) {
                        if (err) return next(err);
                    });
                    res.json(item);
                    res.status(201).end();
                }
                else{
                    res.status(400).end();
                }
            });
});
function isCorrectType(data){
    if(typeof data.barcode==='string' && typeof data.name==='string' && typeof data.unit==='string' &&
        typeof data.price==='number'){
        return true;
    }
}
module.exports =  app;
