import { SiteClient } from 'datocms-client';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { title, image } = JSON.parse(request.body);

    const client = SiteClient('do-not-hard-code');

    const createdCommunity = await client.items.create({
      itemType: '967694',
      title,
      image,
    });

    return response.json(createdCommunity);
  }


}