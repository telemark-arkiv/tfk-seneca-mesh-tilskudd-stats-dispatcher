'use strict'

const device = require('device')

module.exports = function (args, callback) {
  const Seneca = this
  const data = args.data

  Seneca.act({role: 'counter', cmd: 'add', key: 'tilskudd/queue'})

  Seneca.act({role: 'counter', cmd: 'add', key: 'tilskudd/antallTilskudd'})

  if (data.skjemaUtfyllingStart && data.skjemaUtfyllingStop) {
    const skjemaUtfyllingTime = parseInt(data.skjemaUtfyllingStop, 10) - parseInt(data.skjemaUtfyllingStart, 10)
    Seneca.act({role: 'counter', cmd: 'add', key: 'tilskudd/skjemaUtfyllingTime', value: skjemaUtfyllingTime})
  }

  if (data.userAgent) {
    const thisDevice = device(data.userAgent)
    const thisDeviceKey = `tilskudd/${thisDevice.type}`
    Seneca.act({role: 'counter', cmd: 'add', key: thisDeviceKey})
  }

  return callback(null, {success: true, msg: 'Stats submitted'})
}
