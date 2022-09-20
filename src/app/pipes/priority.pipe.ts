import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: number, priorityList: any[]): any {
    return priorityList?.find(data => data.id == value)?.priority
  }

}
