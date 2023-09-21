import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticoXlsxComponent } from './analitico-xlsx.component';

describe('AnaliticoXlsxComponent', () => {
  let component: AnaliticoXlsxComponent;
  let fixture: ComponentFixture<AnaliticoXlsxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnaliticoXlsxComponent]
    });
    fixture = TestBed.createComponent(AnaliticoXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
