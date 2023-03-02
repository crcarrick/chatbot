import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

import {
  Configuration,
  OpenAIApi,
  type ChatCompletionRequestMessage,
} from 'openai'

type ContextType = {
  readonly conversation: ChatCompletionRequestMessage[]
  readonly sendMessage: (
    payload: Partial<ChatCompletionRequestMessage>,
  ) => Promise<void>
}

const Context = createContext<ContextType>({
  conversation: [],
  sendMessage: () => Promise.resolve(),
})

type Action = { type: 'message'; payload: ChatCompletionRequestMessage }

type State = {
  conversation: ContextType['conversation']
}

function reducer(state: State, action: Action) {
  if (action.type === 'message') {
    return {
      ...state,
      conversation: [...state.conversation, action.payload],
    }
  }

  return state
}

type GPTProviderProps = {
  readonly children: React.ReactNode
}

const openai = new OpenAIApi(
  new Configuration({
    apiKey: __OPENAI_API_KEY__,
  }),
)

export default function GPTProvider({ children }: GPTProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    conversation: [
      {
        role: 'system',
        content:
          'You are a helpful assistant for the business Klaviyo. You should find out what customers need help with and then link them to help articles instead of answering yourself. Try to keep responses brief and polite. Ask clarifying questions.',
      },
      {
        role: 'assistant',
        content: 'Hi there! How can I assist you with Klaviyo today?',
      },
    ],
  })

  const sendMessage = useCallback<ContextType['sendMessage']>(
    async ({ role = 'user', content }) => {
      if (content) {
        dispatch({ type: 'message', payload: { role, content } })

        try {
          const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [...state.conversation, { role, content }],
          })
          const payload = response.data.choices[0].message

          if (payload) dispatch({ type: 'message', payload })
        } catch (err) {
          console.error(err)
        }
      }
    },
    [state.conversation],
  )

  const value = useMemo<ContextType>(
    () => ({
      conversation: state.conversation,
      sendMessage,
    }),
    [state.conversation, sendMessage],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useGPT() {
  return useContext(Context)
}
