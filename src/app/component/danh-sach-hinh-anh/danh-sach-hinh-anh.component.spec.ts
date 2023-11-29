import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachHinhAnhComponent } from './danh-sach-hinh-anh.component';

describe('DanhSachHinhAnhComponent', () => {
  let component: DanhSachHinhAnhComponent;
  let fixture: ComponentFixture<DanhSachHinhAnhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhSachHinhAnhComponent]
    });
    fixture = TestBed.createComponent(DanhSachHinhAnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
