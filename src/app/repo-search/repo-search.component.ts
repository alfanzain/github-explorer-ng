import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Repository } from '../repository';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: [ './repo-search.component.scss' ]
})
export class RepoSearchComponent implements OnInit {
  perPage = 5;
  page = 1;

  repositories: Repository[] = [];

  private searchTerms = new Subject<string>();

  constructor(private repositoryService: RepositoryService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.repositoryService.getRepositories(term, this.perPage, this.page)),
    ).subscribe(
      repos => this.repositories = (repos as any).items
    );
  }
}
