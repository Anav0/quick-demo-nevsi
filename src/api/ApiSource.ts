import type { AxiosInstance } from "axios";
import type { ArticleModel } from "../models/ArticleModel";

export interface ApiSource {
  name: string;
  GetArticles(): Promise<ArticleModel[]>;
  SetFetchConf(page: number, per_page: number);
}
