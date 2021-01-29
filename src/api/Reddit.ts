import axios from "axios";
import type { ArticleModel } from "../models/ArticleModel";
import type { DevToArticle } from "../models/DevToArticle";
import type { RedditPost } from "../models/RedditPost";
import type { ApiSource } from "./ApiSource";

export class Reddit implements ApiSource {
  public page: number;
  public per_page: number;
  public top: boolean;
  public name: string;

  constructor(page: number, per_page: number, top: boolean) {
    this.page = page;
    this.per_page = per_page;
    this.top = top;
    this.name = "/r/programming";
  }

  async GetArticles() {
    return new Promise<ArticleModel[]>(async (resolve, reject) => {
      try {
        const { data } = await axios.get<RedditPost[]>(
          `https://www.reddit.com/r/programming/new.json?&limit=${this.per_page}`
        );
        console.log(data);

        const articles: ArticleModel[] = [];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
        }
        resolve(articles);
      } catch (err) {
        console.log(err);
        return reject(undefined);
      }
    });
  }
}
