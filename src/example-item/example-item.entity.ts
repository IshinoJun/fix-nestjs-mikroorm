import {
  BigIntType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Example } from '../example/example.entity';

@Entity()
export class ExampleItem {
  @PrimaryKey({ type: BigIntType })
  id: string;

  @Property()
  name!: string;

  @ManyToOne()
  example!: Example;
}
