enum PaymentFieldsName {
    TerminalKey = 'terminalkey',
    Frame = 'frame',
    ReccurentPayment = 'reccurentPayment',
    CustomerKey = 'customerKey',
    Language = 'language',
    Name = 'name',
    Email = 'email',
    Receipt = 'receipt',
    Amount = "amount",
    Order = 'order',
    Description = 'description',
    Phone = 'phone',
}


export interface PaymentFieldsProps extends HTMLInputElement {
    name: PaymentFieldsName
}