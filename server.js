const express = require('express');
const app = express();
const path = require('path');

const parser = require('body-parser');

const cors = require('cors');

const axios = require('axios');



console.log(path.join())
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.post(['/post/data'], function(req, res){
    let original_url = req.body.url || '';
    if (original_url) {
        // create original request
        let bodyData = {...req.body.data};
        let headers = {...req.body.body_headers};
        // make original http request
        axios({
            method: 'post',
            url: original_url,
            data: bodyData,
            headers
        })
        .then(function(response){
            res.status(200).send(response.data);
        })
        .catch(function(error) {
            if (error) {
                  res.status(400).send(error.response);
            }
           // res.status(500).send(error);
        })
    }
    else {
        res.status(400).send({message: "url in data not provided"});
    }
});


app.use(['/'], express.static(path.join(__dirname + '/client/dist/FWvisualize')));
app.listen(4200, function(){
    console.log('server started on 4200');
})