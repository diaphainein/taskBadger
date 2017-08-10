// load dependencies
var express = require("express");
var route = express.Router();
var db = require("../models")

route.get("/", function(req,res){
	res.render("index");
});

route.get("/signin-register", function(req,res){
	res.render("signinregister");
});

route.get("tasklist", function(req,res){
	db.user.findAll({}).then(function(task){
		res.render("tasklist", {task});
	})
});