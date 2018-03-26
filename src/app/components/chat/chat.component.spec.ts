import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChatComponent} from './chat.component';
import {FirebaseApp} from 'angularfire2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataBaseService} from '../../services/db/dataBase';
import {StoreService} from '../../services/store/store.service';
import {StoreServiceMock} from '../../services/store/store.service.mock';
import {DataBaseServiceMock} from '../../services/db/dataBase.service.mock';

@Component({
  template: `
    <router-outlet></router-outlet>`
})
class RoutingComponent {
}

@Component({
  template: ''
})
class DummyComponent {
}

describe('component: RoutingComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: DummyComponent}
        ]),
        FormsModule,
        ReactiveFormsModule],
      declarations: [
        RoutingComponent,
        DummyComponent,
        ChatComponent],
      providers: [
        {provide: DataBaseService, useClass: DataBaseServiceMock},
        {provide: StoreService, useClass: StoreServiceMock},
        FirebaseApp]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Method "checkDate" test', async(() => {
    const dateTest = Date.now();
    const toBe = `${new Date(dateTest).getHours()}:${new Date(dateTest).getMinutes()}`;
    expect(component.checkDate(new Date(dateTest))).toBe(toBe);
  }));

  it('Method "addNewContent" test', async(() => {
    expect(component.addNewContent);
  }));

});
