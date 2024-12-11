import { Component } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PurposeComponent } from '../../components/purpose/purpose.component';
import { GettingStartedComponent } from '../../components/getting-started/getting-started.component';
import { AnalyticsComponent } from '../../components/analytics/analytics.component';
import { ManageProjectsComponent } from '../../components/manage-projects/manage-projects.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    TopBarComponent,
    HeroComponent,
    PurposeComponent,
    GettingStartedComponent,
    AnalyticsComponent,
    ManageProjectsComponent,
    TestimonialsComponent,
    PricingComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
