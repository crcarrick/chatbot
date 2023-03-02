import { ChatBot } from './ChatBot'
import { GPTProvider } from './GPT'

export default function App() {
  return (
    <GPTProvider>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <ChatBot />
      </div>
    </GPTProvider>
  )
}
