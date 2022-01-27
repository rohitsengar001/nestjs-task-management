import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto as TDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './task.entity';
;

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    //*define the handlers
    //*url:localhost:3000/tasks/
    @Get()
    getTasks(@Query() fitlerDto: GetTasksFilterDto):Promise<TaskEntity[]> {
        return this.tasksService.getTasks(fitlerDto)
    }

    @Get(':id')
    getTaskById(@Param('id') id:string):Promise<TaskEntity>{
        return this.tasksService.getTaskById(id)
    }
   
    @Post()
    createTask(@Body() NewTask: TDto): Promise <TaskEntity> {
        console.log(NewTask);
        return this.tasksService.createTask(NewTask);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): Promise <void>{
        console.log("task to be deleted:" + id);
        return this.tasksService.deleteTask(id);
    }

    //url:c733cee6-03ba-450e-959a-b2bee6e29c4e/status
    @Patch(":id/status")
    updateTaskStatus(@Param('id') id: string,
        @Body() updateTaskStatusDto: updateTaskStatusDto
    ): Promise<TaskEntity> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status)
    }
}
