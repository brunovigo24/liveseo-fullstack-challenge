import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      // Validação adicional para evitar a criação de tarefas sem título
      if (!createTaskDto.title || createTaskDto.title.trim() === '') {
        throw new BadRequestException('Title is required and cannot be empty');
      }

      const task = this.taskRepository.create({
        title: createTaskDto.title.trim(),
        description: createTaskDto.description?.trim() || null,
      });

      return await this.taskRepository.save(task);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create task. Please check your input and try again.');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve tasks. Please try again later.');
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to retrieve task. Please check the ID and try again.');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      // Verifica se a tarefa existe
      await this.findOne(id);

      // Valida o título se for fornecido
      if (updateTaskDto.title !== undefined) {
        if (!updateTaskDto.title || updateTaskDto.title.trim() === '') {
          throw new BadRequestException('Title cannot be empty');
        }
        updateTaskDto.title = updateTaskDto.title.trim();
      }

      if (updateTaskDto.description !== undefined && updateTaskDto.description) {
        updateTaskDto.description = updateTaskDto.description.trim();
      }

      await this.taskRepository.update(id, updateTaskDto);
      
      // Retorna a tarefa atualizada
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to update task. Please check your input and try again.');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      // Verifica se a tarefa existe primeiro
      await this.findOne(id);

      const result = await this.taskRepository.delete(id);
      
      return result.affected > 0;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete task. Please check the ID and try again.');
    }
  }
}