import {FC} from 'react'
import {PaymentSettingsProps} from './payment-settings.interfaces'

export const PaymentSettings: FC<PaymentSettingsProps> = (props) => {
    const {
        storeId,
        language = 'ru',
        isNewWindow = false,
        generateReceipt = false,
    } = props

    return (
        <>
            <input type='hidden' name='terminalkey' value={storeId} />
            <input type='hidden' name='frame' value={isNewWindow.toString()} />
            <input type='hidden' name='language' value={language} />
            { generateReceipt && <input type='hidden' name='receipt' value='' /> }
        </>
    )
}