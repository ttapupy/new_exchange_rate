import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "./components/page";

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    </div>
  )
}

export default App
