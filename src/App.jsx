import { useState } from "react"
import logo from "/logo.png"
import Search from "./components/Search";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="w-full p-2 flex flex-col items-center">
      <div className="flex items-center">
        <h1 className="text-gradient text-4xl font-bold">Game Database</h1>
        <img src={logo} alt="Logo" className="w-25 h-25" />
      </div>
      <div className="w-full max-w-4xl">
        <Search 
          query={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </main>
  )
}

export default App
