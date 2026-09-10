import { useCallback, useEffect, useMemo, useState } from 'react';
import { INITIAL_WORK_ITEMS } from '../../data/initialPortfolioData';
import { WorkItem } from '../../types/portfolio';
import { portfolioStorageService } from './portfolioStorageService';

export function usePortfolio() {
  const [customItems, setCustomItems] = useState<WorkItem[]>(() =>
    portfolioStorageService.loadCustomItems(),
  );

  const items = useMemo(() => [...customItems, ...INITIAL_WORK_ITEMS], [customItems]);

  useEffect(() => {
    portfolioStorageService.saveCustomItems(customItems);
  }, [customItems]);

  const addItem = useCallback((item: WorkItem) => {
    setCustomItems((current) => [item, ...current]);
  }, []);

  const deleteItem = useCallback((id: string) => {
    setCustomItems((current) => current.filter((item) => item.id !== id));
  }, []);

  return {
    items,
    addItem,
    deleteItem,
  };
}
