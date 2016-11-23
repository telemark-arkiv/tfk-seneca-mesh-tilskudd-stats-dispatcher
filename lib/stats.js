'use strict'

const queueAdd = require('./queue-add')
const queueDelete = require('./queue-delete')

module.exports = function (options) {
  const seneca = this

  seneca.add('role:info, info:queue, msg:add', queueAdd)

  seneca.add('role:info, info:queue, msg:delete', queueDelete)

  return options.tag || 'tfk-seneca-mesh-tilskudd-stats-dispatcher'
}
