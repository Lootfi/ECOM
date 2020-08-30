<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropCityCAndAddWilayaCommuneToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('city');
            $table->dropColumn('address_line_1');
            $table->dropColumn('address_line_2');
            $table->string('wilaya')->after('phone');
            $table->string('commune')->after('wilaya');
            $table->string('address_line')->after('commune');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
