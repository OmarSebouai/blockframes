import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MovieTunnelComponent } from '../movie-tunnel.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'catalog-tunnel-technical-info',
    templateUrl: './technical-info.component.html',
    styleUrls: ['./technical-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TunnelTechnicalInfoComponent {
    form = this.tunnel.form;

    constructor(private tunnel: MovieTunnelComponent, private title: Title) {
        this.title.setTitle('Technial information - Title information - Archipel Content')
    }

    get movieSalesInfo() {
        return this.form.get('salesInfo');
    }

    get movieVersionInfo() {
        return this.form.get('versionInfo').get('languages');
    }

    get movieOriginalLanguages() {
        return this.form.get('main').get('originalLanguages');
    }
}