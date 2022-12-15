import { Migration } from '@mikro-orm/migrations';

export class Migration20221215212623 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password_digest" varchar(255) not null, "friends" jsonb not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "location" varchar(255) not null, "image_url" varchar(255) not null default \'\', "caption" varchar(255) not null, "creator_id" uuid not null, constraint "post_pkey" primary key ("id"));');

    this.addSql('create table "post_attendies" ("post_id" uuid not null, "user_id" uuid not null, constraint "post_attendies_pkey" primary key ("post_id", "user_id"));');

    this.addSql('alter table "post" add constraint "post_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "post_attendies" add constraint "post_attendies_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "post_attendies" add constraint "post_attendies_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_creator_id_foreign";');

    this.addSql('alter table "post_attendies" drop constraint "post_attendies_user_id_foreign";');

    this.addSql('alter table "post_attendies" drop constraint "post_attendies_post_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "post" cascade;');

    this.addSql('drop table if exists "post_attendies" cascade;');
  }

}
