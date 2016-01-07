# persistent-state

Super simple persistent states with JSON files.


```javascript
import PersistentState from 'persistent-state'

const stateFile = '/path/to/file.json'

async function prepareState () {
  const state = new PersistentState(stateFile)
  await state.load()
  state.get('abc') // undefined
  state.set('abc', 123) // 123
  state.get('abc') // 123
  await state.save()
})

async function getABC () {
  const state = new PersistentState(stateFile)
  await state.load()
  return state.get('abc')
}

prepareState().then(() => {
  return getABC()
}).then((abc) => {
  console.log(abc) // 123
})

```

`PersistentState(path)`

Creates a persistent state instance.

* `path` - Path to the state JSON file.

`PersistentState.load()`

Loads the persistent state from file. Returns a promise.

`PersistentState.get(name)`

Gets a field's value.

`PersistentState.set(name, value, save = false)`

Sets a field's value. If `save` is truthy, then this function returns a promise returned from `.save()`.

`PersistentState.save()`

Saves the persistent state to file.
