import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectResolver implements Resolve<any>{

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Project id was not a number: ${id}`;
      console.error(message);
      return of({ product: null, error: message });
    }

    return this.projectService.get(+id)
      .pipe(
        map(project => ({ project: project.data })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ project: null, error: message });
        })
      );
  }
}
