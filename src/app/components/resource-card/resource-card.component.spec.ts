import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCardComponent } from './resource-card.component';
import { ComponentRef } from '@angular/core';

describe('ResourceCardComponent', () => {
  let component: ResourceCardComponent;
  let componentRef: ComponentRef<ResourceCardComponent>;
  let fixture: ComponentFixture<ResourceCardComponent>;
  const resource = {
    name: 'Anakin',
    mass: '120',
    gender: 'male',
    skin_color: 'fair',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('resource', resource);

    componentRef.setInput('properties', Object.keys(resource));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat card title', async () => {
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector('mat-card-title');
    expect(el.textContent).toContain(resource.name);
  });

  it('should render all properties', async () => {
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelectorAll('.item');
    expect(el).toHaveSize(Object.keys(resource).length);
  });
});
