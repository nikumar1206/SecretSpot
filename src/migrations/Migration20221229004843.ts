import { Migration } from '@mikro-orm/migrations';

export class Migration20221229004843 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "place" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "location" varchar(255) not null, "image_url" varchar(255) not null default \'\', "lat" real not null default 0, "lng" real not null default 0, constraint "place_pkey" primary key ("id"));');
    this.addSql('alter table "place" add constraint "place_name_unique" unique ("name");');

    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "password_digest" varchar(255) not null, "pfp_url" varchar(255) not null default \'https://i.imgur.com/yRDb2s7.png\', "favorite_cuisine" varchar(255) null default \'\', constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "post" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "caption" text not null, "place_id" uuid not null, "creator_id" uuid not null, constraint "post_pkey" primary key ("id"));');

    this.addSql('create table "user_friends" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "user_friends_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "post" add constraint "post_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade;');
    this.addSql('alter table "post" add constraint "post_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "user_friends" add constraint "user_friends_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_friends" add constraint "user_friends_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_place_id_foreign";');

    this.addSql('alter table "post" drop constraint "post_creator_id_foreign";');

    this.addSql('alter table "user_friends" drop constraint "user_friends_user_1_id_foreign";');

    this.addSql('alter table "user_friends" drop constraint "user_friends_user_2_id_foreign";');

    this.addSql('drop table if exists "place" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "post" cascade;');

    this.addSql('drop table if exists "user_friends" cascade;');
  }

}
