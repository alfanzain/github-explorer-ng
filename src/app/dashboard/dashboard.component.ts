import { Component, OnInit } from '@angular/core';

import { Repository } from '../repository';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  perPage = 5;
  page = 1;

  repositories: Repository[] = [];

  constructor(
    private repositoryService: RepositoryService,
  ) { }

  ngOnInit(): void {
    this.getRepositories();
  }

  getRepositories(): void {
    this.repositoryService.getRepositories('twitter-lda', this.perPage, this.page)
      .subscribe(
        repos => this.repositories = (repos as any).items
      );
  }
}
