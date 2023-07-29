import {PaymentFieldsProps} from './payment-fields.interfaces'
import {usePayment} from './payment-widget.hook'

export const PaymentWidget = (fields: PaymentFieldsProps[]) => {
    const {paymentFields, pay} = usePayment(fields)

    return (
        <form onSubmit={pay}>
            {paymentFields}
        </form>
    )
}
