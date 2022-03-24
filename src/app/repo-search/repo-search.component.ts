import { Component, OnInit, Input } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Repository } from '../repository';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './repo-detail-modal.component.html'
})
export class NgbdModalContent {
  @Input() repo: any;

  constructor(public activeModal: NgbActiveModal) {}
}

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

  constructor(private repositoryService: RepositoryService, private modalService: NgbModal) {}

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

  open(repo: Repository) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.repo = repo;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
