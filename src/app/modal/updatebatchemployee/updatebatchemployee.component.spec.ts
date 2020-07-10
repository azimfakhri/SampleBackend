import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatebatchemployeeComponent } from './updatebatchemployee.component';

describe('UpdatebatchemployeeComponent', () => {
  let component: UpdatebatchemployeeComponent;
  let fixture: ComponentFixture<UpdatebatchemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatebatchemployeeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatebatchemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
