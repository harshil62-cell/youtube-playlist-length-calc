const express=require('express');
const {calculatePlaylistLength}=require('../controllers/calculateController');
const router=express.Router();

router.get('/playlistInfo',calculatePlaylistLength);

module.exports=router;