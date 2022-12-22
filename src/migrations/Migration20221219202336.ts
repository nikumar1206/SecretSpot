import { Migration } from '@mikro-orm/migrations';

export class Migration20221219202336 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" alter column "lat" type real using ("lat"::real);');
    this.addSql('alter table "post" alter column "lng" type real using ("lng"::real);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" alter column "lat" type int using ("lat"::int);');
    this.addSql('alter table "post" alter column "lng" type int using ("lng"::int);');
  }

}
