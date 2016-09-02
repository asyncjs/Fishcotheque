var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var creatureUpload = upload.fields([
    { 
        name: 'src', maxCount: 1 
    }, { 
        name: 'images', maxCount: 24 
    }
]);

var app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/uploads.html');
});

app.post('/upload-creature', creatureUpload, (req, res, next) => {
    console.log(req.body, req.files);
    res.send('<h1>Thanks!</h1><p><a href="/">Back to upload page</a></p>');
})

app.listen(4000, () => {
    console.log('listening on port http://127.0.0.1:4000');
});
