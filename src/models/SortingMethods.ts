import type { ArticleModel } from "./ArticleModel";
import { Order } from "./Order";
import type { SortingOption } from "./SortingOption";

export class SortByDate implements SortingOption {
  name: string = "date";
  sort(articles: ArticleModel[], order: Order) {
    let evaluation = order == Order.Descending ? 1 : -1;

    return articles.sort((a, b) =>
      a.date > b.date ? evaluation : evaluation * -1
    );
  }
}

export class SortByTitle implements SortingOption {
  name: string = "title";
  sort(articles: ArticleModel[], order: Order) {
    let evaluation = order == Order.Descending ? 1 : -1;

    return articles.sort((a, b) =>
      a.title > b.title ? evaluation : evaluation * -1
    );
  }
}

export class SortByLikes implements SortingOption {
  name: string = "likes";
  sort(articles: ArticleModel[], order: Order) {
    let evaluation = order == Order.Descending ? 1 : -1;
    return articles.sort((a, b) =>
      a.likes > b.likes ? evaluation : evaluation * -1
    );
  }
}

export class SortByComments implements SortingOption {
  name: string = "comments";
  sort(articles: ArticleModel[], order: Order) {
    let evaluation = order == Order.Descending ? 1 : -1;
    return articles.sort((a, b) =>
      a.comments > b.comments ? evaluation : evaluation * -1
    );
  }
}
