import { forwardRef, useImperativeHandle, useRef } from 'react'

export type ChatInputRef = {
  readonly clear: () => void
  readonly focus: () => void
}

type ChatInputProps = {
  readonly onSubmit: (content: string) => void
}

export default forwardRef(function ChatInput(
  { onSubmit }: ChatInputProps,
  ref: React.ForwardedRef<ChatInputRef>,
) {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    clear() {
      if (inputRef.current) inputRef.current.value = ''
    },
    focus() {
      if (inputRef.current) inputRef.current.focus()
    },
  }))

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (event.target instanceof HTMLFormElement) {
      const message = event.target.elements.namedItem('message')

      if (message instanceof HTMLInputElement) {
        onSubmit(message.value)
      }
    }
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        className="flex flex-1 rounded p-2 m-4 border-1"
        type="text"
        name="message"
        placeholder="Message..."
        ref={inputRef}
      />
    </form>
  )
})
