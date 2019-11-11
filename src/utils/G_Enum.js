const moment = require('moment');

const G_Date = {
  initial: moment('2000-01-01'),
  final: moment(),
  tomorrow: moment().add(1, 'd')
}

export { G_Date }