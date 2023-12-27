import * as echarts from 'echarts';
import { PieConfig } from './types';

const pieConfig: PieConfig = { data: [], width: 25, height: 125 }

export const genOption = (): echarts.EChartsOption => {
  return {
    legend: { top: 'bottom' },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [pieConfig.width, pieConfig.height],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: pieConfig.data
      }
    ],
  }
}

export const setConfig = (config: Partial<PieConfig>) => {
  Object.assign(pieConfig, config)
}

export const pieOptionController = {
  setConfig,
  genOption
}

