import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {ChatComponent} from './chat.component';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {DbService} from '../services/db/db.service';
import {StoreService} from '../services/store/store.service';
import {FirebaseApp} from 'angularfire2';
import {DbServiceMock} from '../services/db/db.service.mock';
import {StoreServiceMock} from '../services/store/store.service.mock';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorage} from 'angularfire2/storage';
import 'firebase/storage';

@Component({
  template: `<router-outlet></router-outlet>`
})
class RoutingComponent {}

@Component({
  template: ''
})
class DummyComponent {}

describe('component: RoutingComponent', () => {
  let location;
  let router;
  let component: ChatComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: 'home', component: DummyComponent}
      ]), FormsModule, ReactiveFormsModule],
      declarations: [RoutingComponent, DummyComponent, ChatComponent],
      providers: [
        {provide: DbService, useClass: DbServiceMock},
        {provide: StoreService, useClass: StoreServiceMock},
        AngularFireDatabaseModule, AngularFireDatabase, FirebaseApp, AngularFireStorage]
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));

  it('should go home', async(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    router.navigate(['/home']).then(() => {
      expect(location.path()).toBe('/home');
    });
  }));

  it('Method "initChat" test', async(() => {
    const fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.navigate(['/home']).then(() => {
      expect(component.initChat);
    });
  }));

  it('Method "checkDate" test', async(() => {
    const fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    router.navigate(['/home']).then(() => {
      expect(component.checkDate);
    });
  }));

  it('Method "addNewContent" test', async(() => {
    const fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.navigate(['//home']).then(() => {
      expect(component.addNewContent);
    });
  }));

});
