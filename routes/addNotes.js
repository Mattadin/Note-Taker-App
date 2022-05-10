const addNoteRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

addNoteRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

addNoteRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to submit feedback`);
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        
        res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});

module.exports = addNoteRouter;