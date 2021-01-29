import type { ArticleModel } from "./ArticleModel";
import type { Order } from "./Order";

export interface SortingOption {
  name: string;
  sort(articles: ArticleModel[], order: Order);
}
