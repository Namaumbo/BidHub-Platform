import { useState } from "react"
import LoginPage from "@/pages/login/LoginPage"
import WelcomePage from "@/pages/welcome/WelcomePage"

export default function App() {
  const [activePage, setActivePage] = useState("login")
  const [username, setUsername] = useState("")

  const handleLoginSuccess = (nextUsername) => {
    setUsername(nextUsername || "")
    setActivePage("welcome")
  }

  const handleLogout = () => {
    setUsername("")
    setActivePage("login")
  }


  // minimalistic to the app, to add more soon
  return (
    <main>
      {activePage === "login" ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <WelcomePage username={username} onLogout={handleLogout} />
      )}
    </main>
  )
}
