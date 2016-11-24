'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Stats = require('./lib/stats')
const envs = process.env

const options = {
  seneca: {
    tag: envs.TFK_SENECA_MESH_TILSKUDD_STATS_DISPATCHER_TAG || 'tfk-seneca-mesh-tilskudd-stats-dispatcher'
  },
  mesh: {
    auto: true,
    host: envs.TILSKUDD_STATS_WEB_HOST || '127.0.0.1',
    bases: [envs.TILSKUDD_STATS_BASE_HOST || '127.0.0.1:39999'],
    listen: [
      {pin: 'role:info, info:queue, msg:add', model: 'observe'},
      {pin: 'role:info, info:queue, msg:delete', model: 'observe'}
    ]
  },
  statsOptions: {
    tag: envs.TFK_SENECA_MESH_TILSKUDD_STATS_DISPATCHER_TAG || 'tfk-seneca-mesh-tilskudd-stats-dispatcher'
  },
  isolated: {
    host: envs.TFK_SENECA_MESH_TILSKUDD_STATS_DISPATCHER_HOST || 'localhost',
    port: envs.TFK_SENECA_MESH_TILSKUDD_STATS_DISPATCHER_PORT || 8000
  }
}

const Service = Seneca(options.seneca)

if (envs.TFK_SENECA_MESH_TILSKUDD_STATS_DISPATCHER_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Stats, options.statsOptions)
