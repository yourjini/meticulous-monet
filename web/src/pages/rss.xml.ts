import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { firstHeadingAsTitle, firstParagraphAsSummary, prettyIdToTitle } from '../lib/meta';

export async function GET(context: APIContext) {
  const news = await getCollection('news');
  return rss({
    title: 'meticulous-monet · 보안뉴스',
    description: 'Claude Code 를 안전하게 쓰기 위한 체크리스트와 보안뉴스',
    site: context.site ?? 'https://meticulous-monet.vercel.app',
    items: news
      .slice()
      .sort((a, b) => (a.id < b.id ? 1 : -1))
      .map((entry) => {
        const dateMatch = entry.id.match(/(\d{4})-(\d{2})-(\d{2})/);
        const pubDate = dateMatch ? new Date(`${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}T00:00:00Z`) : new Date();
        return {
          title: firstHeadingAsTitle(entry.body, prettyIdToTitle(entry.id)),
          description: firstParagraphAsSummary(entry.body) ?? '',
          pubDate,
          link: `/news/${entry.id}/`,
        };
      }),
  });
}
