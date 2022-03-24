import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private githubUrl = 'https://api.github.com/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getRepositories(term: string, perPage: number, page: number) {
    return this.http.get(this.githubUrl + 'search/repositories',
      {
          params: new HttpParams()
            .set('q', term)
            .set('per_page', perPage)
            .set('page', page)
      })
  }
}
