import './App.css'
import { Button } from './components/ui/button'
import PieChart from './components/echarts/pie-chart'
import { useEffect, useState } from 'react'
import { PieCharData } from './components/echarts/pie-chart/types'

const asyncData = [
  { value: 40, name: 'rose 1' },
  { value: 38, name: 'rose 2' },
  { value: 32, name: 'rose 3' },
  { value: 30, name: 'rose 4' },
  { value: 28, name: 'rose 5' },
  { value: 26, name: 'rose 6' },
  { value: 22, name: 'rose 7' },
  { value: 18, name: 'rose 8' }
]

function App() {
  const [pieData, setPieData] = useState<PieCharData[]>([])
  useEffect(() => {
    setTimeout(() => {
      setPieData(asyncData)
    })

    setTimeout(() => {
      const res = asyncData.map(item => Object.assign({}, item, { value: item.value * Math.random()}))
      // const res = asyncData.slice(-3)
      
      setPieData(res)
    }, 1000)
  }, [])

  return (
    <>
      <div>
        <Button>Click me</Button>
        <PieChart data={pieData} ></PieChart>
      </div>
    </>
  )
}

export default App
