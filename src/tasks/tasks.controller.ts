import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import {CreateTaskDto as TDto} from './create-task.dto';
;

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    //define the handlers
    @Get()
    getAllTask(): Task[] {
        return this.tasksService.getAllTask();
    }

    @Get(':id')
    getTaskById(@Param('id') id:string):Task{
        return this.tasksService.getTaskById(id)
    }
    @Post()
    createTask(@Body() NewTask:TDto): Task {
        console.log(NewTask);
        return this.tasksService.createTask(NewTask);
    }

    @Delete(':id')
    deleteTask(@Param('id') id:string){
        console.log("task to be deleted:"+id);
        return this.tasksService.deleteTask(id);
    }
}
