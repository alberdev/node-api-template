module.exports = {
	app: {
		folder: '/nodeapp',
	    database: 'mongodb://localhost/nodeapp',
	    port: 3706,
	    mongo: {
		  autoIndex: false,
		  useNewUrlParser: true,
		  useUnifiedTopology: true
		}
	},
	crypt: {
		key: '[fZQza7j{lgYSW+TbKU5a|pe0Y]4ZEqG' // Use https://randomkeygen.com (32 characters)
	},
	token: {
		// Optional
		phrase: 'I4pleOx4OtkPEnARzrAIspY9zEsuJGr0', // Use https://randomkeygen.com
	    expiration: '24h', // '24h'
		expiration_refresh: '365 days', // '24h'
		secret_phrase: 'rwm560IGgcq1V3CWGbbpUCMa76YgvOjF', // Use https://randomkeygen.com
	},
	email: {
		// Optional
		from: '"Sample Name" sample@email.com',
		dest: 'sample@email.com',
		transport: {
			host: 'smtp.dondominio.com',
		    port: 465,
		    secure: true, // use SSL
		    auth: {
		        user: 'sample@email.com',
		        pass: 'password'
		    },
		    tls: {
			    rejectUnauthorized: false // use certificate!! this is unsecure
			}
		}
	},
	push: {
		// Optional
		cert_folder: '../certs/xxxxxx-firebase-adminsdk-2fder-1d670af319.json',
		database_url: 'https://xxxxxx.firebaseio.com'
	}
};