// only in chrome / opera
interface Navigator {
  deviceMemory?: 0.25 | 0.5 | 1 | 2 | 4 | 8
  connection?: any
  mozConnection?: any
  webkitConnection?: any
}

declare namespace React {
  interface HTMLAttributes {
    css?: any
  }
}
