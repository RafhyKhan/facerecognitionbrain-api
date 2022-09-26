


const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;

	//security check: user should have to fill in all forms before registering
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}

	const hash = bcrypt.hashSync(password); //Synchronous bcrypt way
	//when you have to do twoplus things at once
		db.transaction(trx => {  
			trx.insert({ 
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
			  	return trx('users')
					.returning('*')  //returns all columns
					.insert({	//inserting into database
						email: loginEmail[0].email,
						name: name,
						joined: new Date()
					})
					.then(user => {
						res.json(user[0]); 
				})

			})
			.then(trx.commit)  //for it to actually do the action coded before
			.catch(trx.rollback)  //catch err if things go bad rollback
		})
		.catch(err => res.status(400).json('unable to register'))
		//tells you an error because in database its same
	//we want to grab the user we made from server to make sure
}


module.exports = {
	handleRegister: handleRegister
}