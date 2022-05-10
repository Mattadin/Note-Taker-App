const express = require('express');

const addNoteRouter = require('./addNotes');
const deleteNoteRouter = require('./deleteNotes');
const diagnosticsRouter = require('./diagnostics');

const app = express.Router();

app.use('/addNotes', addNoteRouter);
app.use('/deleteNotes', deleteNoteRouter);
app.use('/diagnostics', diagnosticsRouter);

module.exports = app;