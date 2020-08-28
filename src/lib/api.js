import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
})

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com',
})

const getClient = preview => (preview ? previewClient : client)

// Instead of 'data' we'd have what our content name is here
export async function getData(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'data',
    include: 3
  })
  return entries.items[0]
}
