import { Migration } from '@mikro-orm/migrations';

export class Migration20230106011756 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_followers" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "user_followers_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('create table "user_following" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "user_following_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "user_followers" add constraint "user_followers_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_followers" add constraint "user_followers_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_following" add constraint "user_following_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_following" add constraint "user_following_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "user_friends" cascade;');

    this.addSql('alter table "post" alter column "rating" type double precision using ("rating"::double precision);');
  }

  async down(): Promise<void> {
    this.addSql('create table "user_friends" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "user_friends_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "user_friends" add constraint "user_friends_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_friends" add constraint "user_friends_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "user_followers" cascade;');

    this.addSql('drop table if exists "user_following" cascade;');

    this.addSql('alter table "post" alter column "rating" type int using ("rating"::int);');
  }

}
