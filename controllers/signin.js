 




//differnt format just prefernce
 const handleSignin = (req, res, db, bcrypt) => {  

 	const {email, password } = req.body

	//security check: user should have to fill in all forms before signing in
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}

	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data=> {
			//checking if the password is same as the one entered!!
			const isValid = bcrypt.compareSync(password, data[0].hash);

			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						res.json(user[0]);
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials') //wrong password
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}



//much NEEDED!! everytime
module.exports = {
	handleSignin: handleSignin
}