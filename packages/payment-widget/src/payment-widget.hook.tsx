import {useState, useRef, useEffect} from 'react'
import {fieldsNames, FieldsProps} from './payment-fields.interfaces'


const TINKOFF_SCRIPT_URL = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'

export const usePayment = (fields: FieldsProps[]) => {
    const initialFormState: Record<fieldsNames, string> = fields.reduce((acc, field) => {
        return { ...acc, [field.name]: '' }
    }, {} as Record<fieldsNames, string>)

    const [formFields, setFormFields] =
        useState<Record<fieldsNames, string>>(initialFormState)
    const payRef = useRef<Function | null>(null)


    useEffect(() => {
        const script = document.createElement('script')
        script.src = TINKOFF_SCRIPT_URL
        script.async = true
        document.body.appendChild(script)

        script.onload =  () => {
            payRef.current = (window as any).pay as Function;
        }

        script.onerror = () => {
            console.error('Failed to load Tinkoff Cashier script.')
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const pay = () => {
        try{
            if(payRef.current) {
                payRef.current(formFields)
            }
        }catch (e) {
            console.error(e)
        }
    }

    const handleChange = (name: string, value: string) => {
        setFormFields(prevFields => ({ ...prevFields, [name]: value }))
    }

    const inputElements = fields.map((field, index) => {
        return <input
            key={index}
            type={field.type ?? 'text'}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required ?? false}
            value={formFields[field.name]}
            onChange={e => handleChange(e.target.name, e.target.value)}
        />
    })

    return { fields: inputElements, pay }
}