import { Migration } from '@mikro-orm/migrations';

export class Migration20221230043304 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_places_been" ("user_id" uuid not null, "place_id" uuid not null, constraint "user_places_been_pkey" primary key ("user_id", "place_id"));');

    this.addSql('alter table "user_places_been" add constraint "user_places_been_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_places_been" add constraint "user_places_been_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_places_been" cascade;');
  }

}
