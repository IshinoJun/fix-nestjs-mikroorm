import {
  BigIntType,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ExampleItem } from '../example-item/example-item.entity';

@Entity()
export class Example {
  @PrimaryKey({ type: BigIntType })
  id: string;

  @Property()
  name!: string;

  @OneToMany({
    entity: () => ExampleItem,
    mappedBy: 'example',
    cascade: [Cascade.REMOVE],
  })
  exampleItems = new Collection<ExampleItem>(this);
}
