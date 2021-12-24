import { Migration } from '@mikro-orm/migrations';

export class Migration20211224102826 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "example" ("id" bigserial primary key, "name" varchar(255) not null);');

    this.addSql('create table "example_item" ("id" bigserial primary key, "name" varchar(255) not null, "example_id" bigint not null);');

    this.addSql('alter table "example_item" add constraint "example_item_example_id_foreign" foreign key ("example_id") references "example" ("id") on update cascade;');
  }

}
