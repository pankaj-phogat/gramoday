const express=require('express');
var mongoose=require('mongoose');
var Reports=require('../models/report');



const reportRouter=express.Router();
reportRouter.use(express.urlencoded({extended : false}));
//reportRouter.use(express.urlencoded({extended:false}));

reportRouter.get('/',(req,res,next) => {
    Reports.find({})
    .then((reports) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reports);
    },err => next(err))
    .catch(err => next(err));
});
reportRouter.post('/',(req,res,next) => {
    Reports.findOne({ cmdtyID : req.body.cmdtyID , marketID : req.body.marketID })
    .then((cmdty) => {
        if(cmdty==null){
            var report=new Reports(req.body);
            var convFctr=parseInt(req.body.convFctr);
            report.price=(report.price)/convFctr;
            report.priceUnit='kg';
            report.users.push(req.body.userID);
            report.save()
            .then(report => {
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success : true , reportID : report._id});
            },err => next(err));
        }
        else{
            if(cmdty.users.find( str => str===req.body.userID) ){
                var err=new Error('User has already reported');
                err.status=403;
                return next(err);
            }
            else if(cmdty.users.length == 2){
                var err=new Error('Maximun two users are allowed to '+
                'add report for a market-commodity pair');
                err.status=403;
                return next(err);
            }
            cmdty.users.push(req.body.userID);
            cmdty.timestamp=Math.floor(Date.now()/1000);
            cmdty.price=(cmdty.price+parseInt(req.body.price)/parseInt(req.body.convFctr))/2;
            cmdty.save()
            .then(cmdty => {
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success : true , reportID : cmdty._id});
            },err => next(err)); 
        }
    },err => next(err))
    .catch(err => next(err));
});

reportRouter.delete('/',(req,res,next) => {
    Reports.remove({})
    .then((resp) => {
        console.log('All reports deleted');
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
});
reportRouter.get('/:reportID',(req,res,next) => {
    Reports.findById(req.params.reportID)
    .then((report) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(report);
    },err => next(err))
    .catch(err => next(err));
})
 
module.exports=reportRouter;