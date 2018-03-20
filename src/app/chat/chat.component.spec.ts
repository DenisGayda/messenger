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

@Component({
  template: `<router-outlet></router-outlet>`
})
class RoutingComponent {
}

@Component({
  template: ''
})
class DummyComponent {
}

describe('component: RoutingComponent', () => {
  let location, router;
  let component: ChatComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: 'home', component: DummyComponent}
      ])],
      declarations: [RoutingComponent, DummyComponent, ChatComponent],
      providers: [
        {provide: DbService, useClass: DbServiceMock},
        {provide: StoreService, useClass: StoreServiceMock},
        AngularFireDatabaseModule, AngularFireDatabase, FirebaseApp]
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
    // spyOn(this.route, 'paramMap').and.returnValue(Observable.of(0));
    // spyOn(DbServiceMock, 'selectDB').and.returnValues([]);

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
      expect(ChatComponent.checkDate);
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
