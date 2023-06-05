const dynamoose = require('dynamoose');

const plantSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
  },
  moisture: {
    type: Number,
  },
  timestamp: {
      type:String,
      required: true,
  }
});

const PlantModel = dynamoose.model('caterpillar-plant-status', plantSchema);

exports.handler = async(event) =>{
  console.log('EVENT ', event);
  let plant = JSON.parse(event.body);
  console.log('READING PLANT', plant);
  let returnPlant;
  
  try{
    returnPlant = await PlantModel.create(plant);
  }
  catch(e){
    console.error('ERROR: ', e);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(`HELLO FROM NEW PLANT, ${JSON.stringify(returnPlant)}`),
};
  return response;

}