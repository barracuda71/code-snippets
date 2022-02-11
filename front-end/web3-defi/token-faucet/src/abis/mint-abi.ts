export const mintAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'rec', type: 'address', },
      { internalType: 'uint256', name: 'amount', type: 'uint256', },
    ],
    name: 'mint',
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];