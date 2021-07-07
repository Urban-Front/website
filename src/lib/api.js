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

export async function getMetaData(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'meta',
    include: 3
  })
  return entries.items[0]
}

export async function getHomeData(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'homePage',
    include: 3
  })
  return entries.items[0]
}

export async function getVoicesPage(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'voicesPage',
    include: 3
  })
  return entries.items[0]
}

export async function getArticles(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'article',
    include: 3
  })
  return entries.items
}

export async function getArticleBySlug(preview, slug) {
  const entries = await getClient(preview).getEntries({
    content_type: 'article',
    limit: 1,
    'fields.slug[in]': slug.slug
  })
  return entries.items[0]
}

export async function getServicesData(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'servicesPage',
    include: 3
  })
  return entries.items[0]
}

export async function getTeamData(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'teamPage',
    include: 3
  })
  return entries.items[0]
}
