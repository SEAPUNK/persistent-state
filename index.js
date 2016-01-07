var promisify = require('bluebird').promisify
var jsonfile = require('jsonfile')
var readFile = promisify(jsonfile.readFile.bind(jsonfile))
var writeFile = promisify(jsonfile.writeFile.bind(jsonfile))

function PersistentState (file) {
  this._file = file
  this._data = {}
}

PersistentState.prototype.load = function () {
  var self = this
  return readFile(self._file).then(function (json) {
    self._data = json
  }).catch(function (err) {
    if (err.code !== 'ENOENT') throw err
    self._data = {}
  })
}

PersistentState.prototype.save = function () {
  return writeFile(this._file, this._data)
}

PersistentState.prototype.get = function (name) {
  return this._data[name]
}

PersistentState.prototype.set = function (name, value, save) {
  var retval = this._data[name]
  this._data[name] = value
  if (save) {
    retval = this.save()
  }
  return retval
}

module.exports = PersistentState
