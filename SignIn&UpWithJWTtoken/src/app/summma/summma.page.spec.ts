import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummmaPage } from './summma.page';

describe('SummmaPage', () => {
  let component: SummmaPage;
  let fixture: ComponentFixture<SummmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummmaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
