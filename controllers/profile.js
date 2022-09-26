


 const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	//from all users in database table users, get users with id column elemnt equal to id variable
	db.select('*').from('users').where(  
			{
				id: id
			}
		).then(user => {
			if(user.length) {
				res.json(user[0])  //want array of user so user[0]
			} else {
				res.status(400).json('Not Found')
			}	

		})
		.catch(err => res.status(400).json('error getting user'))

}


//much NEEDED!! everytime
module.exports = {
	handleProfileGet
}