require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.post('/email', (req, res) => {

    let senderName = req.body.sender;
    let senderEmail = req.body.email;
    let senderMessage = req.body.message;
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
        
    var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Portfolio Message',
    html: `<h1>PORTFOLIO MESSAGE</h1>
           <hr>
           <h3>From: ${senderName}</h3>
           <h3>Email: ${senderEmail}</h3>
           <h3>Message:</h3>
           <p>${senderMessage}</p>
           <hr>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
});


// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
