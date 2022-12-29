import { Migration } from '@mikro-orm/migrations';

export class Migration20221229011611 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "place" drop constraint "place_name_unique";');

    this.addSql('alter table "post" add column "rating" int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "place" add constraint "place_name_unique" unique ("name");');

    this.addSql('alter table "post" drop column "rating";');
  }

}
