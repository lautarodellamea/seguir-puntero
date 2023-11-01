
import { useEffect, useState } from "react";
import "./App.css";



const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMove = (event) => {
    const { clientX, clientY } = event;
    // console.log("handleMove", clientX, clientY)
    setPosition({ x: clientX, y: clientY })

  }

  useEffect(() => {
    // console.log("effect ", { enabled })
    if (enabled) {
      window.addEventListener("pointermove", handleMove)
      // en la consola paso esto getEventListeners(window) para ver cuantas veces nos suscribimos a un evento
    }

    // cleanup
    // se ejecuta cuando se desmonta el componente
    // se ejecuta cuando cambian las dependencias tambien
    return () => {
      console.log("cleanup")
      window.removeEventListener("pointermove", handleMove)
    }


  }, [enabled])


  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled)
  
    return () => {
      document.body.classList.remove("no-cursor", !enabled)
    }
  }, [enabled])
  


  return (<><div style={{
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #fff',
    borderRadius: '50%',
    opacity: 0.8,
    pointerEvents: 'none',
    left: -25,
    top: -25,
    width: 50,
    height: 50,
    transform: `translate(${position.x}px, ${position.y}px)`
  }}></div>
    <button onClick={() => setEnabled(!enabled)}>{enabled ? "Desactivar" : "Activar"} seguir puntero</button>
  </>)
}


function App() {
  const [mounted, setMounted] = useState(true)

  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={()=> setMounted(!mounted)}>Toggle mounted FollowMouse component</button>
    </main>

  );
}

export default App;
