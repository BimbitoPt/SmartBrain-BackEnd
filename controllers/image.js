const  Clarifai =require("clarifai");



const app = new Clarifai.App({
  apiKey: "be7ea216185f4272bbaf15b9869eb7b9",
}); 

const returnClarifaiRequestOptions=(imageUrl)=>{
 const PAT = '855f5da30efa48cfb79b1c44d09fc3a1';
 const USER_ID = 'bimbito';       
 const APP_ID = 'SmartBrainApi';
 const IMAGE_URL = imageUrl;

 const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});
const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
}; 

return requestOptions

}

 
const handleApiCall = (req, res) => {
  fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => {
      // Check if the response status is OK (200)
      if (response.status === 200) {
        // Parse the response JSON and send it to the client
        return response.json();
      } else {
        // Handle non-OK status codes (e.g., 400, 401, etc.)
        throw new Error('Clarifai API returned a non-OK status code');
      }
    })
    .then(data => {
      // Send the Clarifai API response data to the client
      res.json(data);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred while calling the Clarifai API' });
    });
}
 
 


  
  



const handleImage = (req,res,db) =>{
const { id } = req.body;
db("users")
  .where("id", "=", id)
  .increment("entries", 1)
  .returning("entries")
  .then((entries) => {
    res.json(entries[0].entries);
  })
  .catch((err) => res.status(400).json("unable to get entries"));
}

module.exports ={
    handleImage,
    handleApiCall
}