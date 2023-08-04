import { Dispatch }       from 'react'
import { SetStateAction } from 'react'

export const handleChange = (
  name: string,
  value: string,
  setState: Dispatch<SetStateAction<any>>
) => {
  setState((prevState) => ({ ...prevState, [name]: value }))
}
