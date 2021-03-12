import { Pie } from './BaseCharts'

export default {
  extends: Pie,
  mounted () {
    this.renderChart({
      labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      datasets: [
        {
          backgroundColor: [
            '#36a2eb',
            '#4bc0c0',
            '#ff6384',
            '#ffcd56'
          ],
          data: [40, 20, 80, 10]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}