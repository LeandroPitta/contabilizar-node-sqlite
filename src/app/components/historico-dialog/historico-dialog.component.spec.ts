import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDialogComponent } from './historico-dialog.component';

describe('HistoricoDialogComponent', () => {
  let component: HistoricoDialogComponent;
  let fixture: ComponentFixture<HistoricoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoDialogComponent]
    });
    fixture = TestBed.createComponent(HistoricoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
