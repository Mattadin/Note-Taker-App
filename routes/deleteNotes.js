const deleteNoteRouter = require('express').Router();
const noteDatabase = require('./db/db.json');
const uuid = require('../helpers/uuid');

deleteNoteRouter.delete('/', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    console.log("Parameters of request are:", req.params);
    console.log(uuid);

    let noteDeleted = parseInt(req.params.id);
    console.log(noteDeleted);

    for (let i = 0; i < noteDatabase.length; i++) {
        if (noteDeleted === noteDatabase[i].id) {
            noteDatabase.splice(i, 1);
            console.log("Note successfully deleted");
            res.json(noteDatabase);
        }
    }
})

module.exports = deleteNoteRouter;