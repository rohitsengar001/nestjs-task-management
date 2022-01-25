import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
