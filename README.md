# Project Overview

This project is a simple Web3 dApp composed of:

- A Solidity smart contract (**MessageBoard**)
- Automated tests using **Foundry**
- A React frontend that connects to a wallet and interacts with the contract
- A Docker setup that runs the entire system (Anvil + deploy + frontend) with a single command

The goal of the project is to demonstrate how a frontend, wallet, and smart contract interact in a minimal but realistic dApp architecture.

---


## Project Structure

- **src/** — Solidity smart contracts
- **test/** — Foundry tests
- **script/** — Deploy script
- **frontend/frontend/** — React application
- **docker-compose.yml** — Runs the frontend

## Running the project
The Frontend can be started by:
````bash
docker compose up --build
````

this will:
- Start the React application on http://localhost:5173

The smart contract environment (Anvil, Foundry, and deploy process) is intended to be run locally from the host machine.
Docker is used solely to simplify running the React application in a reproducible environment.

To run the full dApp:
Start Anvil locally:
```bash
anvil
```

Deploy the contract:
```bash
forge script script/Deploy.s.sol \
  --rpc-url http://127.0.0.1:8545 \
  --private-key <ANVIL_PRIVATE_KEY> \
  --broadcast
```
## Technical Decisions
- Foundry was chosen for smart contract development and testing due to its speed and simplicity.
- Anvil provides a deterministic local Ethereum environment for development.
- wagmi + viem were used to handle wallet connection and contract interaction in React.
- Docker is used only for the frontend to ensure a reproducible environment while keeping the blockchain tooling local.
- The project structure separates smart contract logic from the UI to reflect what i belive to be a realistic dApp architecture.

## Running Tests

Smart contract tests can be executed with:

```bash
forge test
```






