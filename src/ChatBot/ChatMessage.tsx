import {
  cva,
  type VariantProps as InferVariantProps,
} from 'class-variance-authority'
import linkify from 'linkify-urls'

const container = cva(['flex m-2'], {
  variants: {
    role: {
      assistant: ['justify-start'],
      user: ['justify-end'],
    },
  },
})
const message = cva(
  'flex flex-col p-2 max-w-[75%] rounded whitespace-pre-wrap break-words gap-2',
  {
    variants: {
      role: {
        assistant: ['bg-gray'],
        user: ['bg-dark', 'text-white'],
      },
    },
  },
)

type InferredProps = Required<InferVariantProps<typeof message>>

type ChatMessageProps = {
  readonly content: string
  readonly role: InferredProps['role'] | 'system'
}

export default function ChatMessage({ content, role }: ChatMessageProps) {
  if (role === 'system') return null

  return (
    <div className={container({ role })}>
      <div
        className={message({ role })}
        dangerouslySetInnerHTML={{
          __html: linkify(content, {
            attributes: {
              class:
                'text-link hover:decoration-link hover:underline hover:underline-offset-2',
            },
          }),
        }}
      />
    </div>
  )
}
