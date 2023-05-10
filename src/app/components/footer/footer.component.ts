import { Component } from '@angular/core';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faInstagram = faInstagram;

}
