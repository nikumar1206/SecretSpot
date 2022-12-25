import { Migration } from '@mikro-orm/migrations';

export class Migration20221223235257 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_email_unique";');
    this.addSql('alter table "user" rename column "email" to "username";');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_username_unique";');
    this.addSql('alter table "user" rename column "username" to "email";');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
