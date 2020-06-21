import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BindequipmentPage } from './bindequipment.page';

describe('BindequipmentPage', () => {
  let component: BindequipmentPage;
  let fixture: ComponentFixture<BindequipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindequipmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BindequipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
