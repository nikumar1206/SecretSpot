import { Migration } from '@mikro-orm/migrations';

export class Migration20221212210717 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password_digest" varchar(255) not null, "friends" jsonb not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "location" varchar(255) not null, "image_url" varchar(255) not null, "caption" varchar(255) not null, "attendies" varchar(255) not null, "creator_id" uuid not null, constraint "post_pkey" primary key ("id"));');
    this.addSql('alter table "post" add constraint "post_name_unique" unique ("name");');
    this.addSql('alter table "post" add constraint "post_location_unique" unique ("location");');

    this.addSql('alter table "post" add constraint "post_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_creator_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "post" cascade;');
  }

}
