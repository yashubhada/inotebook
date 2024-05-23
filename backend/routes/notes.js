const { body, validationResult } = require('express-validator');
const getUser = require('../middelware/getuser');   // Middelware to get login user details
const Note = require('../models/Note');
const express = require('express');
const router = express.Router();

// Fecth user note : Login Required
router.get('/fetchNote'
    , getUser
    , async (req, res) => {
        try {
            const note = await Note.find({ UserId: req.decode.id })
            res.json(note);
        } catch (err) {
            console.error(err.message)
            res.status(500).send({ error: "Internal server error" })
        }
    })

// Add Note : Login Required
router.post('/addNote'
    , [
        body('title').isLength({ min: 3 }).withMessage('Please enter valid title'),
        body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
    ]
    , getUser
    , async (req, res) => {
        try {
            // validation error handling
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                // create new note
                let note = await Note.create({
                    UserId: req.decode.id,
                    title: req.body.title,
                    description: req.body.description,
                    tag: req.body.tag === "" ? "General" : req.body.tag,
                });
                note.save();
                res.json(note);
            }
        } catch (err) {
            console.error(err.message)
            res.status(500).send({ error: "Internal server error" })
        }
    })

// Update note -- PUT Request : Login require
router.put('/updateNote/:id'
    , getUser
    , async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};

            // set new note
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // check note id is present or not
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(401).send('Not Found') }

            // check user is login or not
            if (note.UserId.toString() !== req.decode.id) { return res.status(404).send('Not Allowed') }

            //Update note using Note id 
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);

        } catch (err) {
            console.error(err.message)
            res.status(500).send({ error: "Internal server error" })
        }
    })

// Delete note using DELETE : /deleteNote : Login Required
router.delete('/deleteNote/:id'
    , getUser
    , async (req, res) => {
        try {
            // check note id is present or not
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(401).send('Not Found')
            }

            // check user is login or not
            if (note.UserId.toString() !== req.decode.id) {
                return res.status(404).send('Not Allowed')
            }

            //Update note using Note id 
            note = await Note.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'Note deleted successfully', note });

        } catch (err) {
            console.error(err.message)
            res.status(500).send({ error: "Internal server error" })
        }
    })

module.exports = router