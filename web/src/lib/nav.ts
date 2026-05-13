// 사이드바 네비 트리. 컬렉션을 모아서 [섹션 → 그룹? → 항목] 3단까지의 트리로 만든다.
import { getCollection } from 'astro:content';
import { firstHeadingAsTitle, prettyIdToTitle } from './meta';

export type NavLeaf = { label: string; href: string };
export type NavGroup = { label: string; items: NavLeaf[] };
export type NavSection = { label: string; href?: string; items?: (NavLeaf | NavGroup)[] };

const CHECKLIST_ORDER = [
  'onboarding',
  'security_checklist',
  'new_project_checklist',
  'repo_hardening',
  'ai_code_review',
  'multi_env_guide',
];

type Entry = { id: string; body?: string };

function titleOf(e: Entry): string {
  return firstHeadingAsTitle(e.body ?? '', prettyIdToTitle(e.id));
}

function orderedSort<T extends Entry>(list: T[], order: string[]): T[] {
  return list.slice().sort((a, b) => {
    const ia = order.indexOf(a.id.toLowerCase());
    const ib = order.indexOf(b.id.toLowerCase());
    if (ia === -1 && ib === -1) return a.id.localeCompare(b.id);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export async function buildNav(): Promise<NavSection[]> {
  const [checklists, required, optional, startup, library] = await Promise.all([
    getCollection('checklists'),
    getCollection('prompts-required'),
    getCollection('prompts-optional'),
    getCollection('prompts-startup'),
    getCollection('library'),
  ]);

  const sortedChecklists = orderedSort(checklists, CHECKLIST_ORDER);
  const byId = <T extends Entry>(list: T[]) =>
    list.slice().sort((a, b) => a.id.localeCompare(b.id));
  const sortedLibrary = library.slice().sort((a, b) => {
    const ta = a.data.added ? a.data.added.getTime() : -Infinity;
    const tb = b.data.added ? b.data.added.getTime() : -Infinity;
    if (ta !== tb) return tb - ta;
    return a.data.title.localeCompare(b.data.title);
  });

  return [
    { label: '홈', href: '/' },
    {
      label: '체크리스트',
      href: '/checklists/',
      items: sortedChecklists.map((e) => ({
        label: titleOf(e),
        href: `/checklists/${e.id}/`,
      })),
    },
    {
      label: '프롬프트',
      href: '/prompts/',
      items: [
        {
          label: '필수',
          items: byId(required).map((e) => ({
            label: titleOf(e),
            href: `/prompts/required/${e.id}/`,
          })),
        },
        {
          label: '선택',
          items: byId(optional).map((e) => ({
            label: titleOf(e),
            href: `/prompts/optional/${e.id}/`,
          })),
        },
        {
          label: '시작',
          items: byId(startup).map((e) => ({
            label: titleOf(e),
            href: `/prompts/startup/${e.id}/`,
          })),
        },
      ],
    },
    {
      label: '라이브러리',
      href: '/library/',
      items: sortedLibrary.map((e) => ({
        label: e.data.title,
        href: `/library/${e.id}/`,
      })),
    },
    { label: '소개', href: '/about/' },
  ];
}

export function isLeaf(x: NavLeaf | NavGroup): x is NavLeaf {
  return 'href' in x;
}
