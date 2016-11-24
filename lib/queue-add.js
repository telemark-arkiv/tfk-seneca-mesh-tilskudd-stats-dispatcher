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

  if (data.formal && data.formal.formal) {
    if (/folkehelse/.test(data.formal.formal)) {
      Seneca.act({role: 'counter', cmd: 'add', key: 'tilskudd/antallFolkehelse'})
    } else {
      Seneca.act({role: 'counter', cmd: 'add', key: 'tilskudd/antallKulturIdrett'})
    }
  }

  if (data.artform && data.artform.artform) {
    const artformKey = `tilskudd/${data.artform.artform}`
    Seneca.act({role: 'counter', cmd: 'add', key: artformKey})
  }

  if (data.finanser && data.finanser.soknadsSum) {
    const sum = parseInt(data.finanser.soknadsSum, 10)
    Seneca.act({role: 'counter', cmd: 'add', key: 'tilskudd/totalSoknadsSum', value: sum})
  }

  return callback(null, {success: true, msg: 'Stats submitted'})
}
