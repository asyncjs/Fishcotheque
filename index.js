const path = require('path');
const express = require('express');
const multer  = require('multer');
const string = require('string');
const promisify = require('promisify-node');

const fs = promisify('fs');
const rimraf = promisify('rimraf');

const upload = multer({ dest: 'uploads/' });
const mediaDirName = 'media';
const creatureUpload = upload.fields([
    {
        name: 'src', maxCount: 1
    }, {
        name: 'media', maxCount: 24
    }
]);

const app = express();

function checkCreatureDirectory(subPath) {
    return fs.stat(subPath).catch((err) => {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }).then((stats) => {
        const mediaDir = path.join(subPath, mediaDirName);

        if (stats && stats.isDirectory()) {
            // Remove media
            return rimraf(mediaDir)
                .catch((err) => {}) // we don't care if this fails
                .then(() => fs.mkdir(mediaDir))
                .then(() => {isOverwritten: true});
        }

        return fs.mkdir(subPath)
            .then(() => fs.mkdir(mediaDir))
            .then(() => {isOverwritten: false});
    });
}

function moveMediaFiles(subPath, res, mediaFileDescriptor) {
    const filename = mediaFileDescriptor.filename;
    
    return fs.rename(
        path.join('uploads', filename),
        path.join(subPath, mediaDirName, mediaFileDescriptor.originalname)
    ).catch((err) => {
        console.error(`Error storing ${mediaFileDescriptor.originalname}`, err);
        res.status(500).end();
    });
}

function storeFiles(req, res, next) {
    console.log(req.body, req.files);

    const creatureId = req.body['creature-id'];
    const brainFileDescriptor = req.files.src[0];
    const mediaFileDescriptors = req.files.media;

    if(!creatureId || !brainFileDescriptor || !mediaFileDescriptors) {
        return res.send('Error: You must give your creature a name, a brain, and at least one image');
    }

    const creatureDirname = string(creatureId).slugify().s;
    const subPath = path.join(__dirname, 'creatures', creatureDirname);

    checkCreatureDirectory(subPath).then((results) => {
        fs.rename(
            path.join('uploads', brainFileDescriptor.filename),
            path.join(subPath, 'brain.js')
        ).catch((err) => {
            console.error(`Error creating brain for ${creatureId}`, err);
            res.status(500).end();
        });

        Promise.all(mediaFileDescriptors.map(moveMediaFiles.bind(null, subPath, res)))
            .then(() => next()) // Have to manually invoke next as Promise.all would pass it an array
            .catch((err) => {
                console.error('Error creating media', err);
                res.status(500).end();
            });
    }).catch((err) => {
        console.error('Error checking creature directory.', err);
        res.status(500).end();
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads.html'));
});

app.post('/upload-creature', creatureUpload, storeFiles, (req, res) => {
    res.send('<h1>Thanks!</h1><p><a href="/">Back to upload page</a></p>');
})

app.listen(4000, () => {
    console.log('listening on port http://127.0.0.1:4000');
});
