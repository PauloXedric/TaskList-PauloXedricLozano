import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../../services/task-list.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskModel } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  taskForm!: FormGroup;
  tasks: TaskModel[] = [];

  constructor(
    private fb: FormBuilder,
    private taskListService: TaskListService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
    });

    this.loadTasks();
  }

  loadTasks(): void {
    this.taskListService.getTasks().then(({ data }) => {
      this.tasks = data ?? [];
    });
  }

  addTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask: TaskModel = {
      ...this.taskForm.value,
      status: false,
    };

    this.taskListService.addTask(newTask).then(() => {
      this.taskForm.reset();
      this.loadTasks();
    });
  }

  toggleStatus(task: TaskModel): void {
    this.taskListService
      .updateStatus(task.id!.toString(), !task.status)
      .then(() => {
        this.loadTasks();
      });
  }
}
