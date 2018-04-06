import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {

  arrFollowUrls = [
    'https://enrollmentresources.com/wp-content/uploads/2014/09/facebook.png',
    'https://gemapps.ru/wp-content/uploads/2017/06/icon-21.png',
    'https://www.androidheadlines.com/wp-content/uploads/2017/05/Google-Play-Store-New-App-Icon.png',
    'https://www.oxbridgeacademy.edu.za/wp-content/uploads/2015/04/App-store-icon.png',
  ];

  arrContacts = [
    {
      imgUrl: 'http://www.myiconfinder.com/uploads/iconsets/256-256-12918a9f351955eb3242ce0e52198993.png',
      text: '+38-(048)-765-123'
    },
    {
      imgUrl: 'http://icons.iconarchive.com/icons/cornmanthe3rd/squareplex/512/Communication-email-icon.png',
      text: 'mychatapp@gmail.com'
    },
    {
      imgUrl: 'https://www.thepalaceofautism.org/wp-content/uploads/2017/08/map-marker-xxl.png',
      text: 'Odessa-Kiev'
    }
  ];

}
