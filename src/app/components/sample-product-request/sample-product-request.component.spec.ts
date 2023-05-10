import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleProductRequestComponent } from './sample-product-request.component';

describe('SampleProductRequestComponent', () => {
  let component: SampleProductRequestComponent;
  let fixture: ComponentFixture<SampleProductRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleProductRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleProductRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
