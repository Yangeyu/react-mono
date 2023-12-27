import * as echarts from 'echarts';
import { useEffect, useRef } from "react"
import { pieOptionController } from './useGenOptions';
import { PieCharData } from './types';

type Props = {
  data: PieCharData[]
}

let myChart: echarts.ECharts

/** ResizeObserver callback */
const onResize: ResizeObserverCallback = (entries, _observer) => {
  if (entries.length <= 0) return
  const target = entries[0]
  const width = Math.floor(target.contentRect.width / 10)
  const height = Math.floor(target.contentRect.height / 3)
  pieOptionController.setConfig({ width, height })
  console.log({ width, height });

  myChart.setOption(pieOptionController.genOption())
  myChart.resize({
    width: target.contentRect.width,
    height: target.contentRect.height
  })
}

export default function PieChart({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    myChart = echarts.init(chartRef.current)
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(chartRef.current!)
    myChart.on('restore', () => {
      myChart.setOption(pieOptionController.genOption())
    })

    return () => {
      myChart.dispose()
      resizeObserver.unobserve(chartRef.current!)
    }
  }, [])

  useEffect(() => {
    pieOptionController.setConfig({ data })
    myChart.setOption(pieOptionController.genOption())
  }, [data])

  return (
    <div
      ref={chartRef} id="chart-main"
      style={{
        width: '500px', height: '500px', overflow: 'scroll',
        resize: 'both', border: '1px solid black'
      }}>
    </div>
  )
}


