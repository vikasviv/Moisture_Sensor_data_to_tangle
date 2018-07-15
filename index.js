var five = require("johnny-five");
const Mam = require("./mam.client.js/lib/mam.client.js")
const IOTA = require('iota.lib.js')
var moment = require('./lib/moment.js')


//change the node url to the working one from https://node.dance

var iota = new IOTA({
  'host': 'https://wallet2.iota.town',
  'port': 443
});

// What is the IOTA lib version
console.log("IOTA Version", iota.version);

//Getting the time in seconds for the loop for arduino
let timeLoop

if( process.argv[2] == undefined)
  { 
      timeLoop = 60 
  } 
  else 
  {
    timeLoop = process.argv[2] 
  }

//const seed = undefined; 
let mamState = Mam.init(iota);
const initialRoot = Mam.getRoot(mamState);

//Select channelMode type

const channelMode = "public" // "public" "private" "restricted"
//retrictedSideKeyTrytes = channelMode === "restricted" ? "THIS9IS9A9RESTRICTED9KEY" : undefined;
// if (channelMode == "restricted")
//   {
//     retrictedSideKeyTrytes = "RestrictedSpam"
// }
// else {
//     retrictedSideKeyTrytes = "UndefinedSpam"
// }

console.log("Channel Mode", channelMode);
//mamState = Mam.changeMode(mamState, channelMode, retrictedSideKeyTrytes);

//function to initiate delay

function sleep(ms) {
    var start = new Date(), now;
    do {
        now = new Date();
    }
    while(now - start < ms);
}

let i=1

var board = new five.Board({ timeout: 36000 },
  {
    port: "COM3"
  })

  
const start = function(){
  
	let sensorData

	board.on("ready", getData)

	function getData(){
     
  	var sensor = new five.Sensor(
  	{
  		pin: 'A0',
      freq: timeLoop*10
  	});          


  	sensor.on('change', function() 
    {

      SensorData = this.value

      //moment().format('MMMM Do YYYY, h:mm:ss a');
      date = moment().format('MMMM Do YYYY, h:mm:ss a')
    
   		console.log("Reading sensor data and time:") 
      console.log("Time:", date)
      console.log("Sensor data:", "(", i, ")", SensorData)
      
      let TransferData = { date, SensorData }
   		let dataS = JSON.stringify(TransferData)        //convert that Json to String
     	let data = iota.utils.toTrytes(dataS)        //convert string to trytes
     	console.log(data)

      // Initialise Mam

      console.log("Initializing Mam, please wait while attaching Sensor data");

      // Attach Sensor Data/Payload
            
      const publish = async packet => 
      {
        let message = Mam.create(mamState, packet)
        mamState = message.state
        console.log('Root: ', message.root)
        console.log('address:', message.address)
        return Mam.attach(message.payload, message.address)
          .then(() => message);
      }

      sleep(3000)

      publish(data)
      
      console.log("Attachment complete, you can view the message chain on the tangle", `https://thetangle.org/mam/${initialRoot}`);

      console.log("-----------------------------------------------------------")
      console.log("-----------------------------------------------------------")

      sleep(15000)
      
      i++
    })

  }

}

start()