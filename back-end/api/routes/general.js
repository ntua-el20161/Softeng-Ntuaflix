const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const multer = require('multer');
const General = require('../models/general');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})

router.get('/' ,(req, res, next) => {
    General.find()
        .select('name price _id productImage')      
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                generals: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:9876/products' + doc._id
                        }
                    }
                })
            }
            console.log(docs);
            res.status(200).json(response);
         })
        .catch(err => {

        })
})

router.get('/:generalId' ,(req, res, next) => {
    const id = req.params.generalId;
    General.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET id',
                        url: 'http://localhost:9876/products'
                    }   
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found'
                })
            }
        }) 
        .catch(err => {
            console.log(err);
            res.status(500);
        })
    res.status(200).json({
        message: "GET request from general"
    });
})

router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    const general = new General({
        _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         price: req.body.price,
         productImage: req.file.path
    })
    general
        .save()
        .then(result => {
            console.log(result);    
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    res.status(201).json({
        message: "POST request from general",
        createdGeneral: {
            name: req.params.name,
            price: req.params.price,
            _id: req.params._id,
            request: {
                type: 'POST',
                url: 'http://localhost:9876/products' + req.params._id 
            }
        }
    });
})

router.patch("/:generalId", (req, res, next) => {
    const id = req.params.generalId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    General.update({ _id: id }, {$set: { name: req.body.newName, price: req.body.newPrice} })
        .exec()
        .then(res => {
            console.log(res)
            res.status(200).json(result);
        })
        .catch(err => {
            console.log.json({ error: err});
        });
    
})

router.delete("/:generalId", (req, res, next) => {
    const id = req.params.generalId;
    General.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
module.exports = router;