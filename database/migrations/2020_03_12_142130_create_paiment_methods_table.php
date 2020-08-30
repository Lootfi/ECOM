<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaimentMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paiment_methods', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('method');
            $table->unsignedBigInteger('commande_id');
            $table->timestamps();

            // $table->foreign('commande_id')->references('id')->on('commandes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paiment_methods');
    }
}
