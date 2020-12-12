import { Component } from '@angular/core';
import {
  MatCarousel,
  MatCarouselComponent,
} from '@ngbmodule/material-carousel';
import { Url } from 'url';

export interface Slide {
  img: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  slides: Slide[] = [
    {
      img:
        'https://blog.vejaobra.com.br/wp-content/uploads/2019/11/AdobeStock_263908017.jpeg',
    },
    {
      img:
        'https://s3-sa-east-1.amazonaws.com/triider-blog-files/wp-content/uploads/2019/03/31192010/282171-construcao-de-casa-tudo-o-que-voce-deve-saber-sobre-o-assunto.jpg',
    },
  ];
}
