import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import { UserService } from '../../../core/services/user.service';
import * as UI from '../../../shared/actions/ui.actions';
@Component({

  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DialogDeleteComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public arrayOfImages: Array<string>;
  public imagesCollection: any;
  public totalImages: number;
  public pageSizeOptions: any;
  public imagesPerPage: number;
  public currentPage: number;
  public id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private store: Store<fromRoot.State>,
              private spinnerService: Ng4LoadingSpinnerService) {

    this.arrayOfImages = [];
    this.id = data.id;
    this.totalImages = data.totalImages;
    this.currentPage = 1;
    this.pageSizeOptions = [3, 5, 7];
    this.imagesPerPage = 3;
  }

  ngOnInit() {

    this.onLoadDeleteComponent();

  }

  onLoadDeleteComponent() {

    this.userService.getImagesViaPaginator(this.imagesPerPage, this.currentPage , this.id)
    .subscribe(response => {
      this.imagesCollection = response.message.Images;
      this.StopLoading();
  });
  }

  // Selected(customerid: string, customername: string) {
  //   /* The selected function, keep and remove the users that has been selected, for knowing which customers to delete ,
  //   after the user click the delete button */
  //   const customer = this.arrayOfImages.findIndex(element => {
  //     return element === customerid;
  //   });

  //   if (customer !== -1) {
  //     const index = this.arrayOfImages.indexOf(customerid);
  //     this.arrayOfImages.splice(index, 1);
  //   } else {
  //     this.arrayOfImages.push(customerid);
  //   }
  //   if (this.arrayOfImages.length > 1) {
  //     this.cannotdelete = false;
  //     this.deletemsg = ' Are you sure you want to delete ' + this.customersToDelete.length + ' customers?';
  //   }
  //   if (this.arrayOfImages.length === 1) {
  //     this.customerService.GetSpecificUser(this.customersToDelete[0]).subscribe(result => {
  //       customername = result.CustomerInfo.customername;
  //     });

  //     setTimeout(() => {
  //       this.cannotdelete = false;
  //       this.deletemsg = ' Are you sure you want to delete  ' + customername + ' ';
  //     }, 300);
  //   }
  //   if (this.arrayOfImages.length === 0) {
  //     this.cannotdelete = true;
  //     this.deletemsg = 'You cannot delete 0 customers';
  //   }

  // }

  onChangePage(pageData: PageEvent) {

    this.currentPage = pageData.pageIndex + 1;
    this.imagesPerPage = pageData.pageSize;
    this.userService.getImagesViaPaginator(this.imagesPerPage, this.currentPage , this.id)
    .subscribe(response => {
        this.imagesCollection.Images = response.message.Images;
    });
  }
  Loading() {
    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
  StopLoading() {

    this.spinnerService.hide();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

  }

}
