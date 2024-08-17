const express=require("express");

const {protect}=require("../middleware/authMiddle");
const {accessChat,fetchChats, createGroupChat} = require("../controllers/chatControlllers");
const router= express.Router();
router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGroupChat);
// router.route('/rename').put(protect,renameGroup);
// router.route('/groupremove').put(protect,removeFromGroup);
// router.route('/groupadd').put(protect,addTOGroup);



module.exports=router; 