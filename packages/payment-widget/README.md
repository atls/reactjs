# @atls/tinkoff-payment-widget

[//]: # "VERSIONS"

## [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=%40atls-ui-parts%2Fbutton&message=0.0.12&labelColor=097CEB&color=0B6DCC">](https://www.npmjs.com/package/@atls-ui-parts/button/v/0.0.12) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=%40atls-ui-parts%2Fcondition&message=0.0.4&labelColor=097CEB&color=0B6DCC">](https://www.npmjs.com/package/@atls-ui-parts/condition/v/0.0.4) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=%40atls-ui-parts%2Fhidden-input&message=0.0.6&labelColor=097CEB&color=0B6DCC">](https://www.npmjs.com/package/@atls-ui-parts/hidden-input/v/0.0.6) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=%40atls-ui-parts%2Finput&message=0.0.13&labelColor=097CEB&color=0B6DCC">](https://www.npmjs.com/package/@atls-ui-parts/input/v/0.0.13) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=%40atls-ui-parts%2Flayout&message=0.0.7&labelColor=097CEB&color=0B6DCC">](https://www.npmjs.com/package/@atls-ui-parts/layout/v/0.0.7) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=%40atls-ui-parts%2Ftext&message=0.0.11&labelColor=097CEB&color=0B6DCC">](https://www.npmjs.com/package/@atls-ui-parts/layout/v/0.0.7) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=react-intl&message=6.4.4&labelColor=ECEEF5&color=D7DCEB">](https://www.npmjs.com/package/react-intl/v/6.4.4) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=react-laag&message=2.0.5&labelColor=ECEEF5&color=D7DCEB">](https://www.npmjs.com/package/react-laag) [<img src="https://img.shields.io/static/v1?style=for-the-badge&label=styled-tools&message=1.7.2&labelColor=ECEEF5&color=D7DCEB">](https://www.npmjs.com/package/styled-tools)

**@atls/tinkoff-payment-widget** предназначен для интеграции в проекты формы, позволяющей проводить оплаты с помощью терминала "Тинькофф Касса". Реализован при помощи `styled-components` и `@emotion`.

## Использование со стандартной темой

Для корректной работы **@atls/tinkoff-payment-widget** достаточно для компонента `Widget` назначить атрибуту `settings` объект с ключом `storeID`:

```tsx
import { Widget } from "@atls/tinkoff-payment-widget";
export const Form = () => <Widget settings={{ storeId: "STORE_ID" }} />;
```

Основные атрибуты для компонента `Widget`:

- **`settings`** - обязательный атрибут, принимает объект с настройками для терминала.
- **`amount`** - опциональный атрибут, принимает сумму платежа.Без заданного значения `Widget` генерирует обязательное поле для ввода суммы.
- **`additionalFields`** - опциональный атрибут для добавления дополнительных полей, принимает массив объектов с обязательным ключом `name`.
- **`receipt`** - опциональный атрибут, принимает объект с настройками для генерации чека.
- **`styles`** - опциональный атрибут, принимает объект с настройками для генерации чека.
- **`disabled`** - опциональный атрибут для управлением активным состоянием кнопки, принимает булево значение.

## Использование с кастомной темой

**@atls/tinkoff-payment-widget** предусматривает возможность использования стилизованных полей ввода и кнопки из Вашего проекта. Для этого предоставляются компоненты обёртки `InputWrapper` и `ButtonWrapper`.

`InputWrapper` принимает обязательный атрибут `name`.

```tsx
import { AdditionalFieldsType } from "@atls/tinkoff-payment-widget";
import { ButtonWrapper } from "@atls/tinkoff-payment-widget";
import { InputWrapper } from "@atls/tinkoff-payment-widget";
import { Widget } from "@atls/tinkoff-payment-widget";
export const Form = () => (
  <Widget amount={5000} settings={{ storeId: "1698844342541DEMO" }}>
    <InputWrapper name={AdditionalFieldsType.Email}>
      {(props) => <Input {...props} />}
    </InputWrapper>
    <ButtonWrapper>
      {(props) => <Button {...props}>Оплатить</Button>}
    </ButtonWrapper>
  </Widget>
);
```

> [!WARNING]  
> Не используйте атрибут `additionalFields` совместно с `InputWrapper`, это приведет к исключению.
>
> Так же, при использовании `InputWrapper` Виджет не генерирует дополнительные поля.

## Экспортируемые компоненты

[**Widget**]() - главный компонент Виджета.

[**InputWrapper**]() - компонент обёртка для полей ввода.

[**ButtonWrapper**]() - компонент обёртка для кнопки.

[**AdditionalFieldsType**]() - интерфейс дополнительных полей.

[**RequiredFieldsType**]() - интерфейс обязательных полей.
