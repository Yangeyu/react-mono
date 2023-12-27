export const useResizeCallback = () => {
  let callback: ResizeObserverCallback = () => void 0

  /** ResizeObserver callback */
  const onResize: ResizeObserverCallback = (entries, observer) => {
    callback?.(entries, observer)
  }

  const registerCB = (cb: ResizeObserverCallback) => {
    callback = cb
  }
  return {
    onResize,
    registerCB
  }
}

