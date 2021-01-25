import axios from "axios";
import type { ArticleModel } from "../models/ArticleModel";
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

  ChangeData(page: number, per_page: number, top: boolean) {
    this.page = page;
    this.per_page = per_page;
    this.top = top;
  }

  async GetArticles() {
    return new Promise<ArticleModel[]>(() => {
      return [];
    });
  }
}
