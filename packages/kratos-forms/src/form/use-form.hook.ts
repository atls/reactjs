import { useContext } from 'react'
import { FormStore }  from './form.store'
import { Context }    from './form.context'

export const useForm = (): FormStore => {
  const store: FormStore = useContext(Context)

  return store
}
