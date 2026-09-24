# @atls/react-kratos

React-компоненты, hooks и providers для native self-service flows self-hosted Ory Kratos.

## Использование

Установите `@ory/kratos-client-fetch` версии `26.2.0` или совместимую с диапазоном `^26.2.0` и передайте `FrontendApi` через `SdkProvider`:

```tsx
import { Configuration }    from '@ory/kratos-client-fetch'
import { FrontendApi }      from '@ory/kratos-client-fetch'

import { FlowInputNode }    from '@atls/react-kratos'
import { FlowMessages }     from '@atls/react-kratos'
import { FlowNodeMessages } from '@atls/react-kratos'
import { FlowSubmit }       from '@atls/react-kratos'
import { LoginNativeFlow }  from '@atls/react-kratos'
import { SdkProvider }      from '@atls/react-kratos'

const frontend = new FrontendApi(new Configuration({ basePath: kratosPublicUrl }))

export const Login = () => (
  <SdkProvider value={frontend}>
    <LoginNativeFlow onSession={persistSession}>
      <FlowMessages>{renderMessages}</FlowMessages>
      <FlowInputNode name='identifier'>{renderIdentifier}</FlowInputNode>
      <FlowInputNode name='password'>{renderPassword}</FlowInputNode>
      <FlowNodeMessages name='password'>{renderMessages}</FlowNodeMessages>
      <FlowSubmit>{renderSubmit}</FlowSubmit>
    </LoginNativeFlow>
  </SdkProvider>
)
```

В браузере redirect обрабатывается через `window.location.assign`. На native-платформе передайте `onRedirect`, связанный с платформенным router или `expo-auth-session`.

`SdkProvider` обязателен. Пакет не создаёт скрытый client для `http://localhost:4433`, поэтому URL, credentials, timeout и другие transport-настройки принадлежат переданному `FrontendApi`.

## Ошибки submit

Callback `onSubmit` компонента `FlowSubmit` возвращает `Promise<void>`. Validation, restart и redirect обрабатываются flow-компонентом. Неизвестный `ResponseError`, а также `FetchError` и `RequiredError` отклоняют promise после сброса `submitting`; consumer должен использовать `await` или `catch`:

```tsx
<FlowSubmit>
  {({ onSubmit, submitting }) => (
    <Button disabled={submitting} onPress={() => onSubmit().catch(reportSubmitError)} />
  )}
</FlowSubmit>
```

## Breaking change

Пакет больше не выполняет `export * from '@ory/client'`. Импортируйте `FrontendApi`, `Configuration`, модели и типы напрямую из `@ory/kratos-client-fetch`:

```tsx
import { Configuration } from '@ory/kratos-client-fetch'
import { FrontendApi }   from '@ory/kratos-client-fetch'
import { LoginFlow }     from '@ory/kratos-client-fetch'

import { SdkProvider }   from '@atls/react-kratos'
```

Admin API и другие vendor SDK через `@atls/react-kratos` не экспортируются.

`SdkProvider` теперь обязателен: прежний localhost fallback удалён вместе с Axios transport-настройками.
