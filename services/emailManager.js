
var nodemailer 	= require("nodemailer");
var ejs 		= require("ejs");
var config		= require('./config');
var _this 		= this;
var transporter = nodemailer.createTransport(config.email.transport);

// =======================================================  
// SEND
// =======================================================  

exports.sendEmail = function(template, locals, toEmail, subject) {
	
	ejs.renderFile(__dirname + '/../emails/' + template, locals, function (err, data) {
		if (err) {
		    console.log(err);
		} else {
			
		    var mainOptions = {
		        from: config.email.from,
		        to: toEmail,
		        subject: subject,
		        html: data
		    };
		    
		    transporter.sendMail(mainOptions, function (err, info) {
		        if (err) {
		            console.log(err);
		        } else {
		            console.log('Message sent: ' + toEmail + ' ' + info.response);
		        }
		    });
		}
	
	});
};

// =======================================================  
// METHODS
// =======================================================  

exports.sendNewPassword = function(user, pass) {
	_this.sendEmail('change-password.html', { dest: user.username, pass: pass }, user.email, 'Reinicio de contraseña');
};

exports.sendIssue = function(receipt) {
	_this.sendEmail('issue.html', { dest: config.email.dest, date: receipt.date.toString(), event_id: receipt.event_id, order_id: receipt.order_id, customer_id: receipt.customer_id, price: receipt.price }, config.email.dest, 'Incidencia. Pedido cobrado no servido');
};

