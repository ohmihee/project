// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import './test.css'
import {useStore} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import WebLayout from '../components/layout/WebLayout'
import { wrapper } from '../store/configureStore'
import { SagaStore } from '../store/configureStore'


function MyApp({ Component, pageProps }: AppProps) {
  const store:SagaStore = useStore()

  
  return (
      <PersistGate persistor={store.__persistor}>
        <WebLayout>
          <Component {...pageProps} />
        </WebLayout>
      </PersistGate>
    
  )

}

export default wrapper.withRedux(MyApp)