# Real Big Admin Portal

### System requirements
- OS: Windows 10, Mac 11, Linux (Ubuntu 18.04)
- [NodeJS 16.13.1](https://nodejs.org/en/download/)
- Browser: latest Google Chrome, Mozilla Firefox, Brave, Edge (All that [MetaMask](https://metamask.io/download.html) supports).
- [MetaMask](https://metamask.io/download.html) browser extension.

### How to install
1. Install http-server and open the admin portal on your localhost.
    <ul>
        <li>(Once only). Have Node.js installed in your system.</li>
        <li>(Once only). In CMD as an administrator, run the command 
            <code>npm install http-server -g</code>
        </li>
        <li>(First time and every time the computer restarts). Navigate to the specific path of admin portal folder in CMD and run the command <code>http-server</code></li>
        <li>(First time and every time the computer restarts).Go to your browser and type <code>localhost:8080</code>. Your Application should run there.</li>
    </ul>
> **Important:** Keep CMD open as long as you need to use Admin Portal.

2. Have MetaMask extension installed in your browser. 
If your admin MATICereum public/private key pair was created outside Metamask, import your private key to MetaMask.
Have your admin account selected in MetaMask.

3. Add Polygon Network to MetaMask https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/

4. Manually add RealB token to Metamask: Click Assets tab, then Import Tokens. Fill out the form:
   - Token Contract Address: (from config.js file)
   - Token Symbol: RealB
   - Token Decimal: 18

    Click the Add Custom Token button.

5. Four conditions required to run transaction on the admin:
   - Be on the admin wallet address on MetaMask
   - Be on the right main (Polygon) network on the MetaMask
   - Must have available Matic balance
   - Must run http-server and CMD running


### Admin portal pages

##### Dashboard
http://localhost:8080/index.html

Main menu through which you can navigate between pages.
From any page click Home to return to Dashboard.

##### View Transactions
http://localhost:8080/view-transactions.html

Contains 2 external links to your pre-configured (in config.js file) blockchain explorer:
- Token explorer
- Crowdsale explorer
They contain always up-to-date information about all the transactions that occur with the corresponding smart contracts.
For example:
- Txn Hash	
- MMATICod
- Block 
- Age
You can click Txn Hash to see more details about specific transaction, such as:
- Tokens Transferred (From account, To account, and value in RealB tokens)
- Timestamp

##### Assign Tokens
http://localhost:8080/assign-tokens.html

Intented for a Private investment round.

> **Important:**
> - Make sure that the Selected account you see is the actual admin account. If not, open MetaMask and select the actual admin account there.
> - Make sure that the admin account has enough MATIC to pay for gas.
> - Make sure the Private round is on (Go to [Switch between Private and Public rounds page](http://localhost:8080/private-public.html) and see **Status: Private**).

Fill out 
- Buyer address (public MATICereum key of a private investor)
- Token quantity (number of RealB tokens that the private investor should receive)

Click Confirm button. Wait for MetaMask popup to appear. Cofirm the transaction inside the MetaMask popup window.

Wait for a Success message. (Can take a while (like 30 seconds) because it's waiting for the transaction to be confirmed on the blockchain).

##### Pause and Unpause User Transfers
http://localhost:8080/pause-unpause.html

Intented for allowing resell of RealB tokens on secondary markets after the initial investment rounds.

> **Important:**
> - Make sure that the Selected account you see is the actual admin account. If not, open MetaMask and select the actual admin account there.
> - Make sure that the admin account has enough MATIC to pay for gas.
> - Make sure the Private round is on (Go to [Switch between Private and Public rounds page](http://localhost:8080/private-public.html) and see **Status: Private**).

Paused status means nobody (except admin) can transfer their RealB tokens to other addresses.

You can see the current Status and switch it to the opposite if needed.
After clicking the button, wait for MetaMask popup to appear. Cofirm the transaction inside the MetaMask popup window.

Wait for a Success message. (Can take a while (like 30 seconds) because it's waiting for the transaction to be confirmed on the blockchain).

##### Switch between Private and Public rounds
http://localhost:8080/private-public.html

Private investors do payments beyond the blockchain and you send them tokens, while public investors can buy tokens with MATIC on their own if the public investment round is ON.
A private investor pays us via fiat, or crypto and we give them their token via admin. But the public buys it directly via MATICer from our site without any admin interaction.

> **Important:**
> - Make sure that the Selected account you see is the actual admin account. If not, open MetaMask and select the actual admin account there.
> - Make sure that the admin account has enough MATIC to pay for gas.

You can see the current Status and switch it to the opposite if needed.
After clicking the button, wait for MetaMask popup to appear. Cofirm the transaction inside the MetaMask popup window.

Wait for a Success message. (Can take a while (like 30 seconds) because it's waiting for the transaction to be confirmed on the blockchain).

##### Public Crowdsale Rate
http://localhost:8080/public-rate.html

Public Crowdsale Rate means the number of RealB tokens a public investor will receive if they send 1 MATIC to the Crowdsale contract.

> **Important:**
> - Make sure that the Selected account you see is the actual admin account. If not, open MetaMask and select the actual admin account there.
> - Make sure that the admin account has enough MATIC to pay for gas.

Current Crowdsale Rate is displayed.
If you want to change it, enter your New Crowdsale Rate and click the Change rate button.

After clicking the button, wait for MetaMask popup to appear. Cofirm the transaction inside the MetaMask popup window.

Wait for a Success message. (Can take a while (like 30 seconds) because it's waiting for the transaction to be confirmed on the blockchain).

##### Total token sold and left
http://localhost:8080/sold-and-left.html

Total token left = Total token cap - Total token sold

##### Internal Mint
http://localhost:8080/internal-mint.html

Except fo initial 50% tokens, the rest have lock-down period and vesting as covered below:
- **36%** reserved for use by admin
First **12 month** has **20%** vesting followed by **20%** vesting **every 6 month**
- **4%** Long term foundation budget
Available at **4 year** anniversary
- **10%** Emergency and reserve fund
Available at **2 year** anniversary

Initially, these tokens are not minted. Admin gets the right to mint them after the corresponding lock-down periods expire.
The minted tokens will go to the admin's account and nobody else's. The admin can distribute these tokens to others manually via MetaMask.

> **Important:**
> - Make sure that the Selected account you see is the actual admin account. If not, open MetaMask and select the actual admin account there.
> - Make sure that the admin account has enough MATIC to pay for gas.
> - Make sure the Private round is on (Go to [Switch between Private and Public rounds page](http://localhost:8080/private-public.html) and see **Status: Private**).

For each fund, you can see
- Used (already minted)
- Left (correspoding fund cap minus used)
- Maturity date (date when the lock-down period expires)

After the Maturity date, you can click Mint fund button.

After clicking the button, wait for MetaMask popup to appear. Cofirm the transaction inside the MetaMask popup window.

Wait for a Success message. (Can take a while (like 30 seconds) because it's waiting for the transaction to be confirmed on the blockchain).

##### Change Admin (dangerous)
http://localhost:8080/change-admin.html

Admin is the owner of the Crowdsale contract at all times.
Admin is the owner of the Token contract during Private round. During Public round, the owner of the Token contract is the Crowdsale contract.

This page is intended to set the admin after the deployment.
Also, changing admin can help if the original admin private key was compromized.

> **Important:**
> - Make sure that the Selected account you see is the actual admin account. If not, open MetaMask and select the actual admin account there.
> - Make sure that the admin account has enough MATIC to pay for gas.
> - Make sure that you have access to the new admin private key.

You can see the current Crowdsale owner and the current Token owner.

If you want to change the admin, enter the new admin public key into the New Admin field and click the Change admin button.

After clicking the button, wait for MetaMask popup to appear. Cofirm the transaction inside the MetaMask popup window.

Wait for a Success message. (Can take a while (like 30 seconds) because it's waiting for the transaction to be confirmed on the blockchain).

##### Change Wallet (dangerous)
http://localhost:8080/change-wallet.html

Wallet is only used by crowdsale. It's not related to the token itself. 
When a public investor send MATIC to the crowdsale contract address, the crowdsale contract redirects MATIC to the wallet address, mints RealB tokens, and sends RealB to the public investor.

This page is intended to set the wallet after the deployment.
Also, changing wallet can help if the original wallet private key was compromized.

> **Important:**
> - Make sure that the Selected account you see is the actual admin account. If not, open MetaMask and select the actual admin account there.
> - Make sure that the admin account has enough MATIC to pay for gas.
> - Make sure that you have access to the new admin private key.

You can see the current Crowdsale wallet.

If you want to change the wallet, enter the new wallet public key into the New Wallet field and click the Change wallet button.

After clicking the button, wait for MetaMask popup to appear. Cofirm the transaction inside the MetaMask popup window.

Wait for a Success message. (Can take a while (like 30 seconds) because it's waiting for the transaction to be confirmed on the blockchain).

### General workflow

The developers deploy 2 smart contracts ([Token](https://github.com/sanbir/ERC-20/blob/master/contracts/RealBToken.sol) and [Crowdsale](https://github.com/sanbir/ERC-20/blob/master/contracts/RealBCrowdsale.sol)) to the MATICereum mainnet. 
Those who deploy contracts become their owners.
The developers transfer ownership via [Change admin page](http://localhost:8080/change-admin.html) to the real admin.

Initially, Token contract is paused and the Private investment round is turned on.
During the Private investment round, the admin collects money from private investors and manually assigns RealB token to them on the [Assign Tokens page](http://localhost:8080/assign-tokens.html).

If during the Private investment round all the RealB token intended for sale have been sold, there will be no need to interact with the Crowdsale contract at all.

Otherwise, the admin [switches from Private to Public round](http://localhost:8080/private-public.html).

When Public round is on, the owner of the Token contract is the Crowdsale contract.
This limits certain functionality such as:
- Pause and Unpause User Transfers
- Assign Tokens
- Internal Mint

If you need any of the above, please switch back to Private. 
You can switch between Public and Private rounds as many times as you like. It will only take some regular MATIC transaction fees for gas.

During the Public investment round, public investors send MATIC to the Crowdsale contract and get RealB tokens in return according to the Public Crowdsale Rate.
This happens automatically without need for any actions from the admin.
MATIC is automatically forwarded to the Wallet account, which was specified during deployment (0x4b0b9af7dB924Da96e0600b38DFd14C5D503263a).

When the admin decides that investment rounds are done and regular transfers and reselling is allowed, the admin [switches to Private](http://localhost:8080/private-public.html) (if not already) and then [unpauses](http://localhost:8080/pause-unpause.html) the Token contract.

After the status becomes Unpaused, all RealB holder can trade and transfer their RealB token (e.g. to and from exchanges).

When maturity dates are reached for [Internal Mint](http://localhost:8080/internal-mint.html), the admin can mint those tokens.
Tokens from Internal Mint go to the admin account. Admin can distribute those tokens among team members, foundation, etc. by using Metamask.

### Security
It's important to understand that the most valuable things are the admin's private key and the wallet's private key.
These two keys must be kept secure.
Wallet private key is not needed for RealB token's operation at any time, so it can be held offline. (For example, on a hardware wallet like Trezor or Ledger, or even handwritten on paper).

Admin portal should be run on the admin's local machine. Since it doesn't have any backend, it doesn't need any authentication of its own.
The only authentication is performed by MetaMask.

It's crucial to keep the mnenonic phrase given to you by MetaMask in a secure place. Basically, the mnenonic phrase is the same as private keys. Private keys can be calculated from a mnenonic (many keys from one).

The password you've assigned while signing up for MetaMask should also be protected since it gives access to all the private keys as well. Password doesn't contain information about private keys, but it encrypts them.

Always click the Lock button under My Accounts in the top right corner in MetaMask after you've finished working with the Admin portal.

To log back in, please use the MetaMask password.

Use only trusted devices for interactions with the admin portal and MetaMask.

### Emergency management
In case of the admin private key having been compromized, [Change Admin](http://localhost:8080/change-admin.html) as soon as posssible.

In case of the contracts having been hacked:
1. [Switch to the Private round](http://localhost:8080/private-public.html)

2. [Pause User Transfers](http://localhost:8080/pause-unpause.html)
After that, no one will be able to transfer tokens (trade outside exchanges, withdraw from exchanges).

3. Contact exchanges and ask them to suspend trading of RealB.

4. After a new contract is developed, in addition to testing the contract on the test network and deploying on the main network, the admin configuration file needs to be updated too. Also, update all backup folders.

Developers will now have time to develop a new contract with the required bug fixes and then migrate the token balances from any block in the past (for example, the one preceeding the hack).
After the migration is done, everything can be turned back on.
