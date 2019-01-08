import { Component, OnInit, NgModule } from '@angular/core';
import { TaskInformation } from '../../Modules/task-information';
import { SharedService } from 'src/app/Services/shared.service';
import {FormsModule, NgForm} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule],
  providers: [ActivatedRoute]
})
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  public updateResult: any;
  public TaskID: number;
  public Task1: string;
  public ParentId: number;
  public StartDate: string;
  public EndDate: string;
  public Priority: number;

  public IsformValid = true;
  public IsUpdatedSuccessFully = false;


  constructor(private _service: SharedService, private route: ActivatedRoute) {

    const id = this.route.snapshot.paramMap.get('taskid');
    this._service.GetTask(parseInt(id)).subscribe(data => {
    this.TaskID = data.TaskID;
    this.Task1 = data.TaskDesciption;
    this.Priority = data.Priority;
   this.StartDate = data.StartDate;
    this.EndDate = data.EndDate;
    this.ParentId = data.ParentId; });
   }

  ngOnInit() {
  }

  UpdateTask(): void {
  const Taskdetails: TaskInformation = {TaskID: this.TaskID,
  ParentId: this.ParentId,
  TaskDesciption: this.Task1,
  StartDate: this.StartDate,
  EndDate: this.EndDate,
  Priority: this.Priority,
  IsTaskCompleted: false};

if (Taskdetails.TaskDesciption == undefined || Taskdetails.ParentId == undefined || Taskdetails.StartDate == undefined || Taskdetails.EndDate == undefined) {
  this.IsformValid = false;
} else {
  this.IsformValid = true;
this._service.UpdateTask(Taskdetails.TaskID, Taskdetails).subscribe(data => this.updateResult = data);
this.IsUpdatedSuccessFully = true;

}

}
}
