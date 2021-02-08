import axios from "axios";
import type { ArticleModel } from "../models/ArticleModel";
import type { DevToArticle } from "../models/DevToArticle";
import type { ApiSource } from "./ApiSource";

export class DevTo implements ApiSource {
  public page: number;
  public per_page: number;
  public top: boolean;
  public name: string;

  constructor(page: number, per_page: number, top: boolean) {
    this.page = page;
    this.per_page = per_page;
    this.top = top;
    this.name = "Dev.to";
  }
  SetFetchConf(page: number, per_page: number) {
    this.page = page;
    this.per_page = per_page;
  }

  async GetArticles() {
    return new Promise<ArticleModel[]>(async (resolve, reject) => {
      const { data } = await axios.get<DevToArticle[]>(
        `${env.DEV_TO_API_URL}/articles?page=${this.page}&per_page=${this.per_page}`
      );
      const articles: ArticleModel[] = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        articles.push({
          id: element.id.toString(),
          author: element.user.name,
          authorUrl: `https://dev.to/${element.user.username}`,
          avatar: element.user.profile_image,
          url: element.url,
          comments: element.comments_count,
          date: new Date(element.published_at),
          desc: element.description,
          likes: element.public_reactions_count,
          tags: element.tag_list,
          title: element.title,
        } as ArticleModel);
      }
      resolve(articles);
    });
  }
}
