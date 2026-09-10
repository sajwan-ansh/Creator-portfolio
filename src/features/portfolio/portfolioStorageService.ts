import { WorkItem } from '../../types/portfolio';

const STORAGE_KEY = 'ansh_portfolio_items:v2';
const CUSTOM_PREFIX = 'custom-';

function isWorkItem(value: unknown): value is WorkItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<WorkItem>;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.category === 'string' &&
    (item.type === 'video' || item.type === 'photo') &&
    typeof item.thumbnail === 'string' &&
    typeof item.mediaUrl === 'string'
  );
}

export const portfolioStorageService = {
  loadCustomItems(): WorkItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.filter(isWorkItem).filter((item) => item.id.startsWith(CUSTOM_PREFIX));
    } catch {
      return [];
    }
  },

  saveCustomItems(items: WorkItem[]): void {
    const customItems = items.filter((item) => item.id.startsWith(CUSTOM_PREFIX));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems));
  },
};
