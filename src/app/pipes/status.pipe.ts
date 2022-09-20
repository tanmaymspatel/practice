import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, statusList: any[]): string | undefined {
    return statusList?.find(data => data.id == value)?.status
  }

}
