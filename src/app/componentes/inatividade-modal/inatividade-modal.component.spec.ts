import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InatividadeModalComponent } from './inatividade-modal.component';

describe('InatividadeModalComponent', () => {
  let component: InatividadeModalComponent;
  let fixture: ComponentFixture<InatividadeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InatividadeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InatividadeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
