import { Migration } from '@mikro-orm/migrations';

export class Migration20230312002303 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "place" alter column "image_url" type text using ("image_url"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "place" alter column "image_url" type varchar(255) using ("image_url"::varchar(255));');
  }

}
