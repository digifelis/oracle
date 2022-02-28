/* fonksiyonlar */
async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
		//const accounts = await ethereum.send('eth_requestAccounts');
        window.ethereum.enable();
    }
}

async function loadContract() {
    return await new window.web3.eth.Contract(abi, CONTRACT_ADDRESS);
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    updateStatus('Ready!');

}

function updateStatus(status) {
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = status;
    console.log(status);
}

/* fonksiyonlar bitti */