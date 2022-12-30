import { Migration } from '@mikro-orm/migrations';

export class Migration20221230044539 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_places_to_go" ("user_id" uuid not null, "place_id" uuid not null, constraint "user_places_to_go_pkey" primary key ("user_id", "place_id"));');

    this.addSql('create table "user_recs" ("user_id" uuid not null, "place_id" uuid not null, constraint "user_recs_pkey" primary key ("user_id", "place_id"));');

    this.addSql('alter table "user_places_to_go" add constraint "user_places_to_go_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_places_to_go" add constraint "user_places_to_go_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_recs" add constraint "user_recs_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_recs" add constraint "user_recs_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_places_to_go" cascade;');

    this.addSql('drop table if exists "user_recs" cascade;');
  }

}
