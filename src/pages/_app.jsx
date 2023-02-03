import 'focus-visible'
import '@/styles/tailwind.css'
import { OpChainContextProvider } from '@/context/opChain-context'

export default function App({ Component, pageProps }) {
  return (
    <OpChainContextProvider>
      <Component {...pageProps} />
    </OpChainContextProvider>
  )
}
