import {Component, OnInit} from '@angular/core';
import {SendApiService} from "./core/services/send-api.service";
import {environment} from '../environments/environment';
import {HttpParamsOptions} from "@angular/common/http/src/params";
import {HttpHeaders} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {ConsumerRequestConversation} from "./shared/models/ConsumerRequestConversation";
import {CampaignInfo} from "./shared/models/CampaignInfo";
import {Request} from "./shared/models/Request";
import {PushNotificationData} from "./shared/models/PushNotificationData";
import {PrivateData} from "./shared/models/PrivateData";
import {SetUserProfile} from "./shared/models/SetUserProfile";
import {Event} from "./shared/models/Event";
import {PublishContentEvent} from "./shared/models/PublishContentEvent";
import {LoadingService} from "./core/services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isLoading = false;
  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {

  }

  ngOnInit() {
    this.subscription = this.loadingService.isLoadingSubscription().subscribe( isLoading => {
      this.isLoading = isLoading;
    }, error => {
      console.log('SUBSCRIPTION ERROR: ' + error);
    });
  }


}
