import { Migration } from '@mikro-orm/migrations';

export class Migration20230119225645 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_bookmarks" ("user_id" uuid not null, "place_id" uuid not null, constraint "user_bookmarks_pkey" primary key ("user_id", "place_id"));');

    this.addSql('alter table "user_bookmarks" add constraint "user_bookmarks_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_bookmarks" add constraint "user_bookmarks_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_bookmarks" cascade;');
  }

}
