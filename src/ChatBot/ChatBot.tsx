import { useLayoutEffect, useRef } from 'react'

import { cx } from 'class-variance-authority'

import ChatInput, { type ChatInputRef } from './ChatInput'
import ChatMessage from './ChatMessage'
import { useGPT } from '../GPT'

const container = cx([
  'flex',
  'flex-col',
  'rounded-md',
  'h-[600px]',
  'w-[375px]',
  'shadow-xl',
  'overflow-hidden',
])

const header = cx([
  'flex',
  'items-center',
  'justify-between',
  'bg-dark',
  'text-white',
  'h-10',
  'py-6',
  'px-4',
])

export default function ChatBot() {
  const inputRef = useRef<ChatInputRef>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { conversation, sendMessage } = useGPT()

  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  useLayoutEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
  })

  function handleSubmit(content: string) {
    sendMessage({ content })

    if (inputRef.current) inputRef.current.clear()
  }

  return (
    <div className={container}>
      <div className={header}>
        <p>GPT-3.5-Turbo Assistant</p>
      </div>
      <div className="flex flex-col flex-1 justify-end p-2 overflow-auto">
        <div
          className="flex flex-col min-h-max overflow-y-scroll scrollbar-hide"
          ref={scrollRef}
        >
          {conversation.map((message) => (
            <ChatMessage key={message.content} {...message} />
          ))}
        </div>
      </div>
      <ChatInput ref={inputRef} onSubmit={handleSubmit} />
    </div>
  )
}
