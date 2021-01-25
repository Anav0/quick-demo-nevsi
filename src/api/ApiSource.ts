import type { AxiosInstance } from "axios";
import type { ArticleModel } from "../models/ArticleModel";

export interface ApiSource {
  name: string;
  GetArticles(): Promise<ArticleModel[]>;
}
