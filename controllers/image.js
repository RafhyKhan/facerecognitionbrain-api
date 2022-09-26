const Clarifai = require('clarifai');

//api key and after importing Clarifai files, we are createing an app of it API
const app = new Clarifai.App({
  apiKey: '986dee1cd8c4452c8f14c66f7fdb27ce'
});
//5cce95181f2c4a1f80727fd1127e7f8a

const handleApiCall = (req, res) => {
 app.models
 	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 	.then(data => {
 		res.json(data);
 	})
 	.catch(err => res.status(400).json('unable to work with API'))
}


 const handleImage = (req, res, db) => {
	const { id } = req.body;
	//need to declare table name
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}


//much NEEDED!! everytime
module.exports = {
	handleImage
}