import { useState, useEffect } from 'react'
import {PaymentFieldsProps} from './payment-fields.interfaces'


const baseUrl = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'

export const usePayment = (fields: PaymentFieldsProps[], src = baseUrl) => {
    const initialFieldsState = fields.reduce((acc, field) => {
        return { ...acc, [field.name]: '' }
    }, {})

    const [fieldsForm, setFieldsForm] = useState(initialFieldsState)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        document.body.appendChild(script)

        script.onerror = () => {
            console.error('Failed to load Tinkoff Cashier script.')
        };

        return () => {
            document.body.removeChild(script)
        };
    }, [])

    const handleChange = (name: string, value: string) => {
        setFieldsForm((prevFields) => ({ ...prevFields, [name]: value }))
    }

    const paymentFields = fields.map((field) => (
        <input
            key={field.name}
            name={field.name}
            value={fieldsForm[field.name]}
            onChange={event => handleChange(event.target.name, event.target.value)}
            {...field}
        />
    ))

    const pay = () => {
        // There has to be a logic to the payment
    }

    return {paymentFields, pay}
}
