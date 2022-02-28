// local
	const CONTRACT_ADDRESS = "";
	const WALLET_ADDRESS = "";
	const PRIVATE_KEY = "";


const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "city",
				"type": "string"
			},
			{
				"name": "temperature",
				"type": "string"
			}
		],
		"name": "updateWeather",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "oracleAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_oracleAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "city",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "temperature",
				"type": "string"
			}
		],
		"name": "WeatherUpdate",
		"type": "event"
	}
] ;



async function updatedata(city, temperature){
    let tx_builder = contract.methods.updateWeather(city, temperature);
    let encoded_tx = tx_builder.encodeABI();
    let transactionObject = {
        gas: 200000,
        data: encoded_tx,
        from: WALLET_ADDRESS,
        to: CONTRACT_ADDRESS,
    };
    let signed = await web3.eth.accounts.signTransaction(transactionObject, PRIVATE_KEY);
    let received = await web3.eth.sendSignedTransaction(signed.rawTransaction);
	return received["transactionHash"];
}


async function gettemp(sehir){
	var sonuc;
	await $.ajax({
		url: "https://www.hurriyet.com.tr/hava-durumu/"+sehir+"/",
		dataType: 'text',
		success: function(data) {
			 var elements = $("<p>").html(data)[0].getElementsByClassName("weather-detail-hightemp")[0].innerText;
			 elements = elements.replace("°C", "")
			 sonuc = elements;
		}
   });
   return sonuc;
};


$(document).ready(function()
{
    

    setInterval(function()
    {
        load().then( async function(){
			sehir = "siirt";
			var temperature = await gettemp(sehir);
			var transactionHash = await updatedata(sehir, temperature)
			updateStatus(sehir+ " "+ temperature + " " + transactionHash);	
		})

    }, 30000);
})

