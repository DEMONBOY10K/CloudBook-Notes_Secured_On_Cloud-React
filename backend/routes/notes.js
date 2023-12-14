const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route 1: Get all the Notes using GET "api/notes/fetch-all-note" LOGIN REQUIRED
router.get('/fetch-all-note', fetchuser , async (req,res)=>{
    try {
        const note= await Note.find({user : req.user.id});
        res.json([note]);
    } catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error : Something Went Wromg!!")
    }   
})


//Route 2: Add Note using POST "api/notes/add-note" LOGIN REQUIRED
router.post('/add-note', fetchuser , [
    body('title','Enter a valid Title').isLength({min:3}),
    body('description','Description must have atleast 5 characters').isLength({min:5})
],async (req,res)=>{
    try {
        const {title,description, tag} = req.body;
        console.log(req.body);
        
        //If there are Errors , then returns BadRequest & Errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.error(error.message)
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, 
            description,
            tag, 
            user : req.user.id
        });
        const savedNote = await note.save()
        res.json([savedNote]);
        
    } catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error : Something Went Wromg!!")
    }
        
})

//Route 3: Update Existing Note using PUT "api/notes/update-note" LOGIN REQUIRED
router.put('/update-note/:id', fetchuser, async (req,res)=>{
    try {
        const {title,description,tag}  = req.body;

        //create newNote obj
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //Find the node that needs to be updated
        let note  = await Note.findById(req.params.id);
        if(!note) {return res.status(404).send("Note not Found")};

        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Unauthoried Access Denied")
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error : Something Went Wromg!!")
    }
})

//Route 4: Deleting Existing Note using DELETE "api/notes/delete-note" LOGIN REQUIRED
router.delete('/delete-note/:id', fetchuser, async (req,res)=>{
    try{
        //Find the node that needs to be Deleted
        let note  = await Note.findById(req.params.id);
        if(!note) {return res.status(404).send("Note not Found")};

        //Check user authorization
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Unauthoried Access Denied")
        }


        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note is Deleted Successfully", note:note});
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error : Something Went Wromg!!")
    }
})

module.exports = router