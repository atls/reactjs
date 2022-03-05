import { GraphQLClient } from 'graphql-request'
import { gql }           from 'graphql-request'
import { useMemo }       from 'react'

import { useGatewayUrl } from './use-gateway-url.hook'

const uploadMutation = gql`
  mutation CreateUpload($input: CreateUploadInput!) {
    createUpload(input: $input) {
      result {
        id
        url
      }
    }
  }
`
const confirmMutation = gql`
  mutation ConfirmUpload($input: ConfirmUploadInput!) {
    confirmUpload(input: $input) {
      result {
        id
        url
      }
    }
  }
`

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
        mode: 'cors',
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

    await fetch(url, {
      method: 'POST',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    const confirmData = await client.request(confirmMutation, {
      input: { id },
    })

    return confirmData.confirmUpload
  }
}
