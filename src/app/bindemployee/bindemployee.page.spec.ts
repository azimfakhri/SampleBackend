import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BindemployeePage } from './bindemployee.page';

describe('BindemployeePage', () => {
  let component: BindemployeePage;
  let fixture: ComponentFixture<BindemployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindemployeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BindemployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
