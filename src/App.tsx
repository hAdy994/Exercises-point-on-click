import { useEffect, useState } from 'react'
import './App.css'

type Points = {
  x: number
  y: number
}

function App() {;
  const [points, setPoints] = useState<Points[]>([]);
  const [lastPoint, setLastPoint] = useState<Points[]>([]);
  

  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
    const newPoint = {
      x: e.clientX,
      y: e.clientY
    };
    setPoints([...points, newPoint]);
  }

  function handleUndo() {
    const popped = points.pop();
    if (!popped) return;
    setLastPoint([...lastPoint, popped]);
    setPoints(points);
  }

  function handleRedo() {
    const apopped = lastPoint.pop();
    if (!apopped) return;
    setPoints([...points, apopped])
    setLastPoint(lastPoint)
  }

  return (
    <div>
      <button disabled={points.length === 0} className='remove' onClick={handleUndo}>Undo</button>
      <button disabled={lastPoint.length === 0} className='redo' onClick={handleRedo}>Redo</button>
      <div className="App" onClick={handlePlaceCircle}>      
        {points.map((p, i) => (
          <div key={i} className='circle'
            style={{
              top: p.y + 'px',
              left: p.x + 'px'
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App