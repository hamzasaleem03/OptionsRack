import { useRef , useState } from 'react'
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'

Chart.register(annotationPlugin)

const data = {
  labels: [
    17000, 17020, 17040, 17060, 17080, 17100, 17120, 17140, 17160, 17180, 17200,
    17220, 17240, 17260, 17280, 17300, 17320, 17340, 17360, 17380, 17400, 17420,
    17440, 17460, 17480, 17500, 17520, 17540, 17560, 17580, 17600, 17620, 17640,
    17660, 17680, 17700, 17720, 17740, 17760, 17780, 17800, 17820, 17840, 17860,
    17880, 17900, 17920, 17940, 17960, 17980, 18000, 18020, 18040, 18060, 18080,
    18100, 18120, 18140, 18160, 18180, 18200, 18220, 18240, 18260, 18280, 18300,
    18320, 18340, 18360, 18380, 18400, 18420, 18440, 18460, 18480, 18500, 18520,
    18540, 18560, 18580, 18600, 18620, 18640, 18660, 18680, 18700, 18720, 18740,
    18760, 18780, 18800, 18820, 18840, 18860, 18880, 18900, 18920, 18940, 18960,
    18980, 19000,
  ],
  datasets: [
    {
      label: 'Expiry',
      fill: {
        above: 'rgba(125, 211, 252, 0.1)',
        below: 'rgba(161, 161, 170, 0.1) ',
        target: { value: 65 },
      },
      lineTension: 0,
      backgroundColor: 'rgba(56, 189, 248, 1)',
      borderColor: 'rgba(56, 189, 248, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(56, 189, 248, 1)',
      pointBackgroundColor: '#7dd3fc',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(56, 189, 248, 1)',
      pointHoverBorderColor: 'rgba(56, 189, 248, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075,
        -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075,
        -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075,
        -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075,
        -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075, -1075,
        -1075, -75, 925, 1925, 2925, 3925, 3925, 3925, 3925, 3925, 3925, 2925,
        1925, 925, -75, -1075, -2075, -3075, -4075, -5075, -6075, -6075, -6075,
        -6075, -6075, -6075, -6075, -6075, -6075, -6075, -6075, -6075, -6075,
        -6075, -6075, -6075, -6075, -6075, -6075, -6075, -6075, -6075, -6075,
        -6075, -6075, -6075, -6075, -6075, -6075, -6075, -6075,
      ],
    },
    {
      label: 'Selected date',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(14, 116, 144, 0.4)',
      borderColor: 'rgba(14, 116, 144, 0.4)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(14, 116, 144, 1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 0.2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(14, 116, 144, 1)',
      pointHoverBorderColor: 'rgba(14, 116, 144, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        -1042, -1038, -1035, -1030, -1025, -1019, -1013, -1005, -997, -988,
        -977, -965, -952, -938, -922, -905, -885, -865, -842, -817, -791, -762,
        -731, -699, -664, -628, -589, -549, -507, -463, -418, -372, -325, -277,
        -228, -180, -132, -85, -38, 6, 49, 89, 127, 161, 192, 218, 240, 256,
        267, 272, 271, 263, 248, 225, 196, 158, 113, 60, 0, -68, -144, -228,
        -319, -417, -521, -632, -750, -872, -1000, -1133, -1270, -1410, -1554,
        -1700, -1848, -1998, -2149, -2300, -2452, -2602, -2752, -2901, -3048,
        -3192, -3334, -3473, -3608, -3741, -3869, -3994, -4114, -4230, -4342,
        -4450, -4553, -4651, -4745, -4835, -4920, -5000, -5077,
      ],
    }
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: 'index',
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawTicks: true,
      },

      // min: 17300,
      // max: 18700,
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function (val, index) {
          // Hide the label of every 2nd dataset
          return index % 5 === 0 ? this.getLabelForValue(val) : ''
        },
      },
    },

    y: {
      grid: {
        display: false,
      },
    },
  },

  plugins: {
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x",
          // scaleID: "x",
          value: ((18000-17000)/(19000-17000))*100,
          // value:'18000',
          // end:'19000',
          
          borderColor: "#45ff0d",
          label: {
            display: true,
            content:"Future: 18500",
            backgroundColor: 'rgb(133 215 255/0.4)',
            color: 'black',
            position: 'end'

          },
        }
      ]

    },
    legend: { display: false },
  },
  
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Payoff() {
  let chartDiv=useRef(null)
  return (
    <div className="flex w-full items-center space-x-4 bg-white p-6 pb-10 border rounded-xl shadow-lg  hover:shadow-xl ease-in-out transform duration-300" ref={chartDiv}>
      <div className='w-full'>
        <div className="shrink-0 w-full">
          <h2>Payoff</h2>
          <Line data={data} options={options} width={630} height={300} responsive/>
        </div>
      </div>
    </div>
  )
}
