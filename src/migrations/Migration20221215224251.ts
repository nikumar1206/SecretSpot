import { Migration } from '@mikro-orm/migrations';

export class Migration20221215224251 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_friends" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "user_friends_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "user_friends" add constraint "user_friends_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_friends" add constraint "user_friends_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user" drop column "friends";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_friends" cascade;');

    this.addSql('alter table "user" add column "friends" jsonb not null;');
  }

}
