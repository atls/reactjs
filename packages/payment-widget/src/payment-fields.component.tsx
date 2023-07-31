import {usePayment} from './payment-widget.hook'
import {
    AdditionalFieldsProps,
    FieldsProps,
    RequiredFieldsNames,
    RequiredFieldsProps
} from './payment-fields.interfaces'

const requiredFields: RequiredFieldsProps[] = [
    {
        name: RequiredFieldsNames.Amount,
        placeholder: 'Сумма заказа',
        required: true,
    }
]

export const PaymentFields = ({ additionalFields }: { additionalFields?: AdditionalFieldsProps[] }) => {
    const allFields: FieldsProps[] = additionalFields ?
        [...requiredFields, ...additionalFields]
        :
        requiredFields
    const {fields, pay} = usePayment(allFields);

    return (
        <>
            {fields}
            <button onClick={pay}>Оплатить</button>
        </>
    )
}