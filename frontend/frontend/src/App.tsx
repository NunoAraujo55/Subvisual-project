import { useMemo, useState } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useReadContract,
} from 'wagmi'
import { messageBoardAbi } from './abi'
import './App.css'

const contractAddress =
  import.meta.env.VITE_MESSAGEBOARD_CONTRACT_ADDRESS as `0x${string}`

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

function App() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { writeContract } = useWriteContract()
  const readyConnector = connectors.find((connector) => connector.ready)

  const [message, setMessage] = useState('')
  const remainingChars = 280 - message.length

  const canPost = useMemo(() => {
    return isConnected && message.trim().length > 0 && message.length <= 280
  }, [isConnected, message])

  const { data: count } = useReadContract({
    address: contractAddress,
    abi: messageBoardAbi,
    functionName: 'getMessagesCount',
  })

  function handlePost() {
    if (!canPost) return

    writeContract({
      address: contractAddress,
      abi: messageBoardAbi,
      functionName: 'postMessage',
      args: [message],
    })

    setMessage('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">MessageBoard</p>
          <h1>On-Chain Message Board</h1>
        </div>
        <div className="wallet">
          {isConnected && (
            <span className="wallet-address">
              {shortenAddress(address!)}
            </span>
          )}
          <button
            className="button"
            onClick={() =>
              isConnected
                ? disconnect()
                : readyConnector && connect({ connector: readyConnector })
            }
            disabled={!isConnected && !readyConnector}
          >
            {isConnected
              ? 'Disconnect'
              : readyConnector
                ? 'Connect Wallet'
                : 'No Wallet Found'}
          </button>
        </div>
      </header>

      <main className="content">
        <section className="composer card">
          <label htmlFor="message" className="label">
            Post a message
          </label>
          <textarea
            id="message"
            className="textarea"
            placeholder="Write something short and permanent..."
            maxLength={280}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <div className="composer-footer">
            <span className="counter">{remainingChars} characters left</span>
            <button
              className="button primary"
              onClick={handlePost}
              disabled={!canPost}
            >
              Post Message
            </button>
          </div>
          {!isConnected && (
            <p className="helper">
              Connect your wallet to start posting.
            </p>
          )}
        </section>

        <section className="messages">
          <h2>Latest messages</h2>
          <div className="message-list">
            {count &&
              Array.from({ length: Number(count) }).map((_, i) => (
                <MessageItem key={i} index={i} />
              ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function MessageItem({ index }: { index: number }) {
  const contractAddress =
    import.meta.env.VITE_MESSAGEBOARD_CONTRACT_ADDRESS as `0x${string}`

  const { data } = useReadContract({
    address: contractAddress,
    abi: messageBoardAbi,
    functionName: 'getMessage',
    args: [BigInt(index)],
  })

  if (!data) return null

  const { author, text, timestamp } = data as {
    author: `0x${string}`
    text: string
    timestamp: bigint
  }

  return (
    <article className="message-card card">
      <p className="message-text">{text}</p>
      <div className="message-meta">
        <span>{shortenAddress(author)}</span>
        <span>
          {new Date(Number(timestamp) * 1000).toLocaleString()}
        </span>
      </div>
    </article>
  )
}

export default App
