import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto as TDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ConfigService } from '@nestjs/config';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private configService: ConfigService,
  ) {
    console.log(configService.get('TEST_VALUE'));
  }

  //*define the handlers
  //*url:localhost:3000/tasks/
  @Get()
  getTasks(
    @Query() fitlerDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getTasks(fitlerDto, user);
  }

  @Get(':id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() NewTask: TDto,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    console.log(NewTask);
    return this.tasksService.createTask(NewTask, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    console.log('task to be deleted:' + id);
    return this.tasksService.deleteTask(id, user);
  }

  //url:c733cee6-03ba-450e-959a-b2bee6e29c4e/status
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
