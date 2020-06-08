import { EventEmitter } from 'events'

export class ModalsStore extends EventEmitter {
  private readonly modals = new Map()

  public getContext(id: string) {
    return this.modals.get(id)
  }

  public open(id: string, context?: any) {
    this.modals.set(id, context || true)
    this.emit(id, context || true)
  }

  public close(id: string) {
    this.modals.set(id, null)
    this.emit(id, null)
  }
}
