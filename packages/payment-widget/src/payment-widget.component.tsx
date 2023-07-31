import {PaymentWidgetProps} from './payment-widget.interfaces'
import {PaymentSettings} from './payment-settings.component'
import {PaymentFields} from './payment-fields.component'

export const PaymentWidget = ({settings, additionalFields}: PaymentWidgetProps) => {
    return (
        <form>
            <PaymentSettings storeId={settings.storeId} />
            <PaymentFields additionalFields={additionalFields} />
        </form>
    )
}