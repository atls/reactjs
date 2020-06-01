export type LocaleChangeListener = (current: string) => void

export class LocaleStore {
  private current: string

  private supported: string[]

  private changeListeners: any[]

  public constructor(current: string, supported: string[] = []) {
    this.changeListeners = []
    this.current = current
    this.supported = supported
  }

  private _emitChange() {
    for (let i = 0; i < this.changeListeners.length; ++i) {
      this.changeListeners[i](this.current)
    }
  }

  public getCurrent() {
    return this.current
  }

  public getSupported() {
    return this.supported
  }

  public set(locale: string) {
    if (this.supported.includes(locale)) {
      this.current = locale
      this._emitChange()
    }
  }

  public addChangeListener(callback: LocaleChangeListener) {
    this.changeListeners.push(callback)
  }

  public removeChangeListener(callback: LocaleChangeListener) {
    const idx = this.changeListeners.indexOf(callback)
    if (idx >= 0) {
      this.changeListeners.splice(idx, 1)
    }
  }
}
