import { useState } from 'react'
import { Button } from '../@/components/ui/button'
import { RoomCard } from './components/RoomCard'
import { toast } from "sonner"


function App() {
  return (
    <>
      <RoomCard />
      <Button onClick={() => toast('x')}>Alert</Button>
    </>
  )
}

export default App
