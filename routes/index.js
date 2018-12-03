var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const sendmail = require('sendmail')({silent: true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/contact", function(req, res) {
    let mailOpts, smtpTrans;

    smtpTrans = nodemailer.createTransport({
       host: 'premium63.web-hosting.com',
        port: 465,
        secure: true,
        
        
    });
    console.log("Email: " + req.body.user_email);
    mailOpts = {
        
      from: req.body.user_email,
        to: 'office@actaprepct.com',
        subject: 'New message from contact form at actaprepct.com',
        text: `${req.body.user_name} (${req.body.user_email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function(error, response) {
       console.log("error: " + error);
        if (error) {
           console.log("error: " + error);
           res.send("error: " + error);
           //res.render("contact-failure", {msg: req.body.message});
           
       } 
        else {
            
            res.render('contact-success', {msg: req.body.message});
        }
    });

});

module.exports = router;
