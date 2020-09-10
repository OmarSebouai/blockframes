import { Component } from '@angular/core';
import { MovieFormShellComponent } from '../shell/shell.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie-notes-and-statement',
  templateUrl: './notes-and-statement.component.html',
  styleUrls: ['./notes-and-statement.component.scss']
})
export class MovieFormNotesAndStatementsComponent {

  form = this.shell.form;

  constructor(private shell: MovieFormShellComponent, private route: ActivatedRoute) { }

  get notes() {
    return this.form.promotional.get('notes');
  }

  public getPath(filePath: 'notes') {
    const { movieId } = this.route.snapshot.params;
    return `movies/${movieId}/promotional.${filePath}/`;
  }

}
