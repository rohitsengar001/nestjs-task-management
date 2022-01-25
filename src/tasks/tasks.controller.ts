import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto as TDto } from './dto/create-task.dto';
;

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    //define the handlers
    //url:localhost:3000/tasks/
    @Get()
    getAllTask(): Task[] {
        return this.tasksService.getAllTask();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }
    @Post()
    createTask(@Body() NewTask: TDto): Task {
        console.log(NewTask);
        return this.tasksService.createTask(NewTask);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        console.log("task to be deleted:" + id);
        return this.tasksService.deleteTask(id);
    }

    //url:c733cee6-03ba-450e-959a-b2bee6e29c4e/status
    @Patch(":id/status")
    updateTaskStatus(@Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id,status)
    }
}
