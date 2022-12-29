import { Migration } from '@mikro-orm/migrations';

export class Migration20221229011315 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "place" add column "name_location" varchar(255) not null;');
    this.addSql('alter table "place" add constraint "place_name_location_unique" unique ("name_location");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "place" drop constraint "place_name_location_unique";');
    this.addSql('alter table "place" drop column "name_location";');
  }

}
