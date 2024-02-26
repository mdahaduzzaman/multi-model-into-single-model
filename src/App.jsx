import { useState } from 'react'
import './App.css'
import CollapsibleTable from './components/CollapsibleTable'
import EnhancedTable from './components/EnhancedTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CollapsibleTable />
     <EnhancedTable />
    </>
  )
}

export default App
