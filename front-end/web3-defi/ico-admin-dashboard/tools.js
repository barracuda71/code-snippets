window.toDecimals = function(numberString) {
    return numberString + '0'.repeat(18)
}

window.connectToMetamask = async function() {
    const config = window.config;

    const Web3Modal = window.Web3Modal.default;
    const providerOptions = {
    };
    const web3Modal = new Web3Modal({
        network: config.network, // change to "mainnet" if needed
        cacheProvider: true,
        providerOptions // required
    });

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const selectedAccount = accounts?.[0];
    window.web3 = web3;
    window.web3Modal = web3Modal;
    window.web3Provider = provider;

    window.getTokenContract = function () {
        const tokenContractAddress = config.tokenContractAddress;
        const tokenContract = new window.web3.eth.Contract(window.abi.token, tokenContractAddress);
        return tokenContract;
    }
    window.getCrowdsaleContract = function () {
        const crowdsaleContractAddress = config.crowdsaleContractAddress;
        const crowdsaleContract = new window.web3.eth.Contract(window.abi.crowdsale, crowdsaleContractAddress);
        return crowdsaleContract;
    }

    document.getElementById('selectedAccountText').innerText = selectedAccount;
    document.getElementById('connected').style.display = 'block';
    document.getElementById('connecting').style.display = 'none';

    window.selectedAccount = selectedAccount;
}

window.ethereum.on('accountsChanged', async function (accounts) {
    // Time to reload your interface with accounts[0]!
    await window.connectToMetamask();
})

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}