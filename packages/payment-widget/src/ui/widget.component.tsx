import * as messagesRu from "../locales/ru.json";
import * as messagesEn from "../locales/en.json";

import React from "react";
import { Children } from "react";
import { FC } from "react";
import { IntlProvider } from "react-intl";
import { isValidElement } from "react";

import { LanguagesType } from "../enums";
import { WidgetProps } from "../interfaces";
import { Form } from "./form.component";
import { ThemeProvider } from "./theme/src";

const messages = {
  [LanguagesType.RUSSIAN]: messagesRu,
  [LanguagesType.ENGLISH]: messagesEn,
};

export const Widget: FC<WidgetProps> = ({
  amount,
  settings,
  receipt,
  additionalFields,
  styles,
  children,
}) => {
  const locale = settings.language ?? LanguagesType.RUSSIAN;
  const childrenArray = Children.toArray(children);
  const customFields = childrenArray.filter((child) =>
    isValidElement(child) // @ts-ignore
      ? child.type.name === "InputWrapper" &&
        typeof child.props.children === "function"
      : false
  );
  const customButton = childrenArray.find((child) =>
    isValidElement(child) // @ts-ignore
      ? child.type.name === "ButtonWrapper" &&
        typeof child.props.children === "function"
      : false
  );
  // @ts-ignore
  const isGenerateReceipt =
    !!receipt && !customFields.find((field) => field.props.name === "email");

  return (
    <ThemeProvider useCustomTheme={!!customFields.length}>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale={LanguagesType.RUSSIAN}
      >
        <Form
          amount={amount}
          settings={settings}
          receipt={receipt}
          styles={styles}
          additionalFields={customFields.length ? [] : additionalFields}
          useCustomButton={!!customButton}
          isGenerateReceipt={isGenerateReceipt}
        >
          {customFields}
          {customButton}
        </Form>
      </IntlProvider>
    </ThemeProvider>
  );
};
