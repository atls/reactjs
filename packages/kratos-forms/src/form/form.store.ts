import { KratosFormField } from './form.interfaces'

export class FormStore {
  private fields: KratosFormField[]

  private values: Map<string, string | any>

  constructor(fields: KratosFormField[], values: Map<string, string | any>) {
    this.fields = fields
    this.values = values
  }

  static create(fields: KratosFormField[] = []) {
    const values: Map<string, string | any> = new Map()

    fields.forEach(({ value = '', ...field }) => {
      values.set(field.name, value)
    })

    return new FormStore(fields, values)
  }

  getField(name): KratosFormField | undefined {
    const field = this.fields.find((fld) => fld.name === name)

    if (!field) {
      // eslint-disable-next-line
      console.log(`Field ${name} not found`)
    }

    return field
  }

  getFields(name): KratosFormField[] {
    return this.fields.filter((field) => field.name === name)
  }

  getValue(name): string | any {
    return this.values.get(name)
  }
}
