import { GraphQLClient } from 'graphql-request'
import { gql }           from 'graphql-request'
import { useMemo }       from 'react'

import { useGatewayUrl } from './use-gateway-url.hook'

const uploadMutation = gql`
  mutation CreateUpload($input: CreateUploadInput!) {
    createUpload(input: $input) {
      id
      url
    }
  }
`
const confirmMutation = gql`
  mutation ConfirmUpload($input: ConfirmUploadInput!) {
    confirmUpload(input: $input) {
      id
      url
    }
  }
`

const upload = async (url: string, file: File) => {
  try {
    await fetch(url, {
      method: 'POST',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })
    // eslint-disable-next-line no-empty
  } catch {}
}

export interface UseUploadProps {
  bucket: string
  endpoint?: string
}

export const useUpload = ({ bucket, endpoint: defaultEndpoint }: UseUploadProps) => {
  const endpoint = useGatewayUrl(defaultEndpoint)

  // eslint-disable-next-line consistent-return
  const client = useMemo(() => {
    if (endpoint)
      return new GraphQLClient(endpoint, {
        credentials: 'include',
      })
  }, [endpoint]) as GraphQLClient

  return async (file: File) => {
    const data = await client.request(uploadMutation, {
      input: {
        bucket,
        name: file.name,
        size: file.size,
      },
    })

    const { id, url } = data.createUpload

    await upload(url, file)

    const confirmData = await client.request(confirmMutation, {
      input: { id },
    })

    return confirmData.confirmUpload
  }
}
