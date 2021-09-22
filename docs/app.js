import "./app/pages.js"
import "./app/pages.js"
import "./app/pages.js"
import {
  router,
  fork,
  cancel,
  whenChanged,
  request,
  subscribe,
  publish,
} from "tiden"
import * as stdlib from "tiden/stdlib.js"
import { takeEvery } from "redux-saga/effects.js"

export default function* app() {
  const root = document.getElementById(`root`)

  yield subscribe(`error`, function* (e) {
    console.error(e)
    root.innerHTML = `<pre>An error occured:\n\n${e.message}\n\n${e.stack}</pre>`
  })

  yield subscribe(`*`, function* (data, rest) {
    const metadata = { ...rest }
    delete metadata.type
    console.log(rest.type, data, metadata)
  })

  yield fork(streams)
  yield fork(stdlib.streams)

  let task

  yield subscribe(
    `page`,
    whenChanged(function* (page) {
      const pageDefinition = router.get(page.id)
      if (task) {
        yield cancel(task)
      }
      task = yield fork(function* () {
        try {
          yield pageDefinition.saga(root)
        } catch (e) {
          yield publish(`error`, e)
        }
      })
    })
  )

  // set initial page to the current url
  const pageDefinition = router.interpret(document.location)
  if (pageDefinition) {
    yield request(`set`, `page`, pageDefinition)
  } else {
    yield publish(`error`, `The location ${document.location} was not found.`, {
      id: `404`,
    })
  }
}
import myStreams from "./app/streams.js"

export function* streams() {
  yield fork(myStreams)
}
