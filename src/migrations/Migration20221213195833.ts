import { Migration } from '@mikro-orm/migrations';

export class Migration20221213195833 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" alter column "image_url" type varchar(255) using ("image_url"::varchar(255));');
    this.addSql('alter table "post" alter column "image_url" set default \'\';');
    this.addSql('alter table "post" drop constraint "post_name_unique";');
    this.addSql('alter table "post" drop constraint "post_location_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" alter column "image_url" drop default;');
    this.addSql('alter table "post" alter column "image_url" type varchar(255) using ("image_url"::varchar(255));');
    this.addSql('alter table "post" add constraint "post_name_unique" unique ("name");');
    this.addSql('alter table "post" add constraint "post_location_unique" unique ("location");');
  }

}
