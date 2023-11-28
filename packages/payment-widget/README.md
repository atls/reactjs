# Применение

## С темой виджета

Для корректной работы Виджета достаточно атрибуту `settings` назначить объект с ключом `storeID`:

```tsx
import { Widget } from "@atls/react-payment-widget";
export const Form = () => <Widget settings={{ storeId: "STORE_ID" }} />;
```

Для добавления дополнительных полей используйте атрибут `additionalFields` который принимает в себя массив объектов с обязательным ключом `name`.

Атрибут `amount` принимает сумму платежа. Без заданного значения Виджет генерирует обязательное поле для ввода суммы.

```tsx
import { Widget, AdditionalFieldsType } from "@atls/react-payment-widget";
export const Form = () => (
  <Widget
    amount={10000}
    settings={{ storeId: "STORE_ID" }}
    additionalFields={[{ name: AdditionalFieldsType.Email }]}
  />
);
```

## С темой проекта

Если Вы хотите использовать кастомные поля и кнопку, то используйте предоставляемые Виджетом обёртки `InputWrapper` и `ButtonWrapper`. `InputWrapper` принимает обязательный атрибут `name`.

```tsx
import {
  Widget,
  AdditionalFieldsType,
  InputWrapper,
  ButtonWrapper,
} from "@atls/react-payment-widget";
export const Form = () => (
  <Widget
    amount={amount}
    settings={{ storeId: "1698844342541DEMO" }}
    disabled={!privacyPolicy}
  >
    <InputWrapper name={AdditionalFieldsType.Email}>
      {(props) => <Input {...props} placeholder={fieldToLabelMap.email} />}
    </InputWrapper>
    <ButtonWrapper>
      {(props) => <Button {...props}>Оплатить</Button>}
    </ButtonWrapper>
  </Widget>
);
```

> [!WARNING]
> Не используйте атрибут `additionalFields` совместно с `InputWrapper`, это приведет к исключению.
> Так же, при использовании `InputWrapper` Виджет не генерирует дополнительные поля.

## Экспортируемые компоненты

**Widget** - главный компонент Виджета.

**InputWrapper** - компонент обёртка для полей ввода.

**ButtonWrapper** - компонент обёртка для кнопки.

**AdditionalFieldsType** - интерфейс дополнительных полей.

**RequiredFieldsType** - интерфейс обязательных полей.
