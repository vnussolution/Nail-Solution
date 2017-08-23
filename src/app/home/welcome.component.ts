import { Component } from '@angular/core';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome page';
    public textLogo: string = 'Island - Salon & Nail Spa';
}
