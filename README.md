# ATTACH Moisture_Sensor_data_to_tangle
Thanks to IOTA.ECO/IOTA Sandbox for using with MaM

	1. Install Arduino IDE
	
	2. Connect Arduino Uno to Laptop through USB 
	
	3. Connect Soil Moisture Sensor to AO in Arduino
	
	4. Arduino IDE - Connect to port and select device unter Tool tab
	
	5. Arduino IDE - Run StandardFirmata from File->Examples->Firmata->StandardFirmata
	
	6. Install nodejs 
	
	7. Create a folder with master .js file
		a. Clone and npm Install iota.lib.js files from https://github.com/iotaledger/iota.lib.js#gettransfers
		b. Clone and npm install johnny-five from https://github.com/rwaldron/johnny-five
		c. Clone mam.client.js from https://github.com/iotaledger/mam.client.js
		
	8. Open nodejs cmd: Go to master file directory and run "node index.js"
	
	9. Program should start attaching sensor data to Tangle

	5. Copy paste from the console "https://thetangle.org/YourInitialRoot" to view it on Tangle
