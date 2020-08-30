<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLivraisonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('livraisons', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('status');
            $table->unsignedBigInteger('commande_id');
            $table->unsignedBigInteger('adr_id');
            $table->timestamp('date_livraison')->nullable();

            // $table->foreign('adr_id')->references('id')->on('addresses')->onDelete('cascade');
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
        Schema::dropIfExists('livraisons');
    }
}
