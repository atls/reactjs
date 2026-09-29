# @atls/react-kratos

React components, hooks, and providers for native self-service flows backed by self-hosted Ory Kratos.

## Usage

Install `@ory/kratos-client-fetch` version `26.2.0` or a compatible `^26.2.0` release and provide its `FrontendApi` through `SdkProvider`:

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

In a browser, redirects use `window.location.assign`. On native platforms, provide an `onRedirect` callback backed by the platform router or `expo-auth-session`.

`SdkProvider` is required. The package does not create an implicit client for `http://localhost:4433`; the supplied `FrontendApi` owns its URL, credentials, timeout, and other transport settings.

## Submit errors

The `FlowSubmit` component exposes an `onSubmit` callback that returns `Promise<void>`. The flow component handles validation, restart, and redirect outcomes. Unknown `ResponseError` instances, together with `FetchError` and `RequiredError`, reject the promise after `submitting` is reset; consumers should use `await` or `catch`:

```tsx
<FlowSubmit>
  {({ onSubmit, submitting }) => (
    <Button disabled={submitting} onPress={() => onSubmit().catch(reportSubmitError)} />
  )}
</FlowSubmit>
```

## Breaking change

The package no longer uses `export * from '@ory/client'`. Import `FrontendApi`, `Configuration`, models, and types directly from `@ory/kratos-client-fetch`:

```tsx
import { Configuration } from '@ory/kratos-client-fetch'
import { FrontendApi }   from '@ory/kratos-client-fetch'
import { LoginFlow }     from '@ory/kratos-client-fetch'

import { SdkProvider }   from '@atls/react-kratos'
```

Admin APIs and other vendor SDK surfaces are not exported from `@atls/react-kratos`.

`SdkProvider` is now required: the previous localhost fallback and Axios transport settings have been removed.
