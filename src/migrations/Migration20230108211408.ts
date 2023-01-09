import { Migration } from '@mikro-orm/migrations';

export class Migration20230108211408 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_feed" ("user_id" uuid not null, "post_id" uuid not null, constraint "user_feed_pkey" primary key ("user_id", "post_id"));');

    this.addSql('alter table "user_feed" add constraint "user_feed_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_feed" add constraint "user_feed_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');

    this.addSql('create index "place_id_index" on "place" ("id");');

    this.addSql('create index "user_id_index" on "user" ("id");');

    this.addSql('create index "post_id_index" on "post" ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_feed" cascade;');

    this.addSql('drop index "place_id_index";');

    this.addSql('drop index "user_id_index";');

    this.addSql('drop index "post_id_index";');
  }

}
