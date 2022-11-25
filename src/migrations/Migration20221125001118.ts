import { Migration } from '@mikro-orm/migrations';

export class Migration20221125001118 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "place" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "location" varchar(255) not null, constraint "place_pkey" primary key ("id"));');
    this.addSql('alter table "place" add constraint "place_location_unique" unique ("location");');

    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password_digest" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "place" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
