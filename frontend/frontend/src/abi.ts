export const messageBoardAbi = [
  {
    type: 'function',
    name: 'getMessage',
    inputs: [{ name: 'index', type: 'uint256' }],
    outputs: [
      {
        type: 'tuple',
        components: [
          { name: 'author', type: 'address' },
          { name: 'text', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMessagesCount',
    inputs: [],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'postMessage',
    inputs: [{ name: 'text', type: 'string' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const