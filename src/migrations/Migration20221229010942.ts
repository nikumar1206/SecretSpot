import { Migration } from '@mikro-orm/migrations';

export class Migration20221229010942 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop column "name";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" add column "name" varchar(255) not null;');
  }

}
