import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, wrap } from 'mikro-orm';
import { ExampleItem } from '../example-item/example-item.entity';
import { CreateExampleRequestDto } from './dto/create-example-request.dto';
import { CreateExampleResponseDto } from './dto/create-example-response.dto';
import { GetExampleResponseDto } from './dto/get-example-response.dto';
import { UpdateExampleRequestDto } from './dto/update-example-request.dto';
import { UpdateExampleResponseDto } from './dto/update-example-response.dto';
import { Example } from './example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private readonly exampleRepository: EntityRepository<Example>,
  ) {}

  public async create(dto: CreateExampleRequestDto) {
    const { name } = dto;
    const example = new Example();
    example.name = name;
    const exampleItem = new ExampleItem();
    exampleItem.name = 'example';
    example.exampleItems.add(exampleItem);

    await this.exampleRepository.persistAndFlush(example);
    return new CreateExampleResponseDto(example);
  }

  public async findOne(id: string) {
    const example = await this.exampleRepository.findOne(id);
    if (!example) throw new NotFoundException();

    return new GetExampleResponseDto(example);
  }

  public async findAll() {
    const examples = await this.exampleRepository.findAll();
    return examples.map((example) => new GetExampleResponseDto(example));
  }

  public async update(id: string, dto: UpdateExampleRequestDto) {
    const example = await this.exampleRepository.findOne(id);
    const nextExample = { ...example, name: dto.name };
    wrap(example).assign(nextExample);
    await this.exampleRepository.flush();

    return new UpdateExampleResponseDto(nextExample);
  }

  public async remove(id: string) {
    const example = await this.exampleRepository.findOne(id);
    await this.exampleRepository.removeAndFlush(example);
  }
}
