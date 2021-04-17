import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  baseUrl: string = 'https://conduit.productionready.io/api/'

  constructor(private http: HttpClient) {}
  
  getArticle() {
    return this.http.get(`${this.baseUrl}articles`);
  }

  getSlugArticle(slug) {
    return this.http.get(
      `${this.baseUrl}articles/${slug}`
    );
  }

  getFollowedArticle() {
    return this.http.get(
      `${this.baseUrl}articles/feed`
    );
  }

  getArticleByTag(tag: string) {
    return this.http.get(
      `${this.baseUrl}articles?tag=${tag}`
    );
  }

  getArticleByAuthor(author: string) {
    return this.http.get(
      'https://conduit.productionready.io/api/articles?author=' + author
    );
  }

  getArticleByFav(user: string) {
    return this.http.get(
      'https://conduit.productionready.io/api/articles?favorited=' + user
    );
  }

  getArticleOffset(offset:number) {
    return this.http.get(
      `${this.baseUrl}articles?offset=${offset}`
    );
  } 

  getArticleLimit(limit :number) {
    return this.http.get(
      `${this.baseUrl}articles?limit=${limit}`
    );
  } 

  getCommentArticle(slug) {
    return this.http.get(
      `${this.baseUrl}articles/${slug}/comments`
    );
  }

  addCommentArticle(slug, body: string) {
    return this.http.post(
      `${this.baseUrl}articles/${slug}/comments`,
      {
        comment: {
          body: body,
        },
      }
    );
  }

  deleteCommentArticle(slug, id) {
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}/comments/${id}`
    );
  }

  creatArticle(title: string,description: string,body: string,tagList: Array<string>) {
    return this.http.post(`${this.baseUrl}articles`, 
    {
      title: title,
      description: description,
      body: body,
      tagList: tagList,
    });
  }

  updateArticle(title: string, description: string, body: string, slug: string) {
    return this.http.put(
      `${this.baseUrl}articles/${slug}`,
      {
        article: {
          title: title,
          description: description,
          body: body,
        },
      }
    );
  }

  deleteArticle(slug) {
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}`
    );
  }

  addFavoriteArticle(slug) {
    return this.http.post(
      `https://conduit.productionready.io/api/articles/${slug}/favorite`,
      {}
    );
  }

  removeFavoriteArticle(slug) {
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}/favorite`,
      {}
    );
  }

  getTag() {
    return this.http.get(`${this.baseUrl}tags`);
  }

}
