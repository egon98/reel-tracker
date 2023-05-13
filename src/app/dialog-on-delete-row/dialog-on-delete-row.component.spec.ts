import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOnDeleteRowComponent } from './dialog-on-delete-row.component';

describe('DialogOnDeleteRowComponent', () => {
  let component: DialogOnDeleteRowComponent;
  let fixture: ComponentFixture<DialogOnDeleteRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOnDeleteRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOnDeleteRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
