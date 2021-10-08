const changedFiles = new Set()
const cbs = []

export const isLocal =
  [`192.`, `0.0.0.0`, `localhost`, `.local`].find((p) =>
    document.location.origin.includes(p)
  ) || localStorage.forceLocal

export function start(url) {
  try {
    if (isLocal) {
      const source = new EventSource(url)
      source.onmessage = (message) => {
        console.log(message.data)
        const { path, exists } = JSON.parse(message.data)
        console.log(path, exists)

        if (!exists) {
          // we can't handle deletions in this project. Reload everything.
          document.location.reload()
        }

        changedFiles.add(path)
      }

      setInterval(announce, 10)
    }

    /*eslint no-inner-declarations: "off"*/
    function announce() {
      const ours = [...changedFiles]
      changedFiles.clear()

      ours.forEach((path) => {
        let any = false
        cbs.forEach((cb) => {
          if (cb) {
            any = any || cb(path)
            if (any) {
              console.debug(
                `=== reloaded: ${path.split(`/`).pop().split(`.`).shift()} ===`
              )
            }
          }
        })
        if (!any) {
          document.location.reload()
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}

export default function hmr(cb) {
  cbs.push(cb)

  return () => {
    cbs.forEach((ocb, i) => {
      if (ocb === cb) {
        cbs[i] = null
      }
    })
  }
}
