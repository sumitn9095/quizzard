import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../application/application.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  // public user_is_logged_in: Boolean = false;
  public user: any;
  modalRef: any;
  //user_profile_viwed_in_game: boolean = false;
  public game_round_url: string = '';
  public user_details: any = {};
  public url_is_quiz: boolean = false;

  closeResult = '';
  constructor(
    private _router: Router,
    private _ngModal: NgbModal,
    private _appService: ApplicationService
  ) {
    this._router.events.subscribe((event: Event) => {
      var currentRoute = '';
      var url_is_quiz = false;
      if (event instanceof NavigationStart) {
        currentRoute = event.url;
      }
      let ss = [];

      ss = currentRoute.split('/');

      for (let w of ss) {
        ///this.w.includes(w);
        if (w.includes('quizround') || w.includes('userscore')) {
          url_is_quiz = true;
        }
      }

      // console.log('url_is_quiz', ss, url_is_quiz);

      if (url_is_quiz == true) {
        this.user_details = this._appService.fetch_user_score_details();
        console.log('this.user_details', this.user_details);
      }
    });
  }

  @ViewChild('user_profile_modal') 'user_profile_modal': ElementRef;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.user_details = this._appService.fetch_user_score_details();
    // }, 600);
    // console.log('this.user_details', this.user_details);
    // let user = localStorage.getItem('user');
    // if (user) {
    //   // this.user_is_logged_in = true;
    //   this.user = user != null ? JSON.parse(user) : '';
    // } else {
    //   // this.user_is_logged_in = false;
    // }
  }

  user_profile(content: any) {
    this.user_details = this._appService.fetch_user_score_details();
    this._ngModal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  resume_game() {
    this._router.navigateByUrl(this.game_round_url);
  }

  sign_out() {
    this._router.navigate([`../../../auth/signout`]);
  }
  // user_profile() {
  //   // this.user_profile_viwed_in_game = true;
  //   // this._router.navigate([`../../../application/userProfile`]);
  //   // this.modalRef = this._ngModal.open(this.user_profile_modal, {
  //   //   windowClass: 'auth-status-modal',
  //   //   centered: true,
  //   //   size: 'sm',
  //   //   backdrop: 'static',
  //   // });//
  // }
}
