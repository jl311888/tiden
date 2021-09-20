const registry = []

export function generate(location) {
  const it = registry.find((it) => it.id === location.id)

  if (it) {
    return it.generate(location)
  }
}

export function interpret(url) {
  // this allows passing a string, document.location, or a URL object
  url = new URL(url, document.location.origin)

  let biggestMatch = -1
  let location
  let page
  for (const it of registry) {
    const l = it.interpret(url)
    const length = !l ? -1 : l[0] ? l[0].length : url.pathname.length
    if (length > biggestMatch) {
      page = it
      location = l
    }
  }
  if (location) {
    const groups = location.groups || {}
    const ret = { id: page.id }
    for (const key of Object.keys(groups)) {
      ret[key] = decodeURIComponent(groups[key])
    }
    return ret
  }

  return null
}

export function register(args) {
  let { interpret, id, generate, saga } = args

  if (!interpret || typeof interpret !== `function`) {
    throw new Error(`Invalid type for argument interpret`)
  }
  if (!id || typeof id !== `string`) {
    throw new Error(`Invalid type for argument id`)
  }
  if (!generate || typeof generate !== `function`) {
    throw new Error(`Invalid type for argument generate`)
  }
  if (!saga || typeof saga !== `function`) {
    throw new Error(`Invalid type for argument page`)
  }
  registry.push(args)
}

export function get(pageId) {
  return registry.find((it) => it.id === pageId)
}
