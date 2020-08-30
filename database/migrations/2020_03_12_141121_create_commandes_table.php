<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\ForeignKeyDefinition;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('livraison_id');
            $table->unsignedBigInteger('paiment_method_id');
            $table->timestamp('date_commande');


            // $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            // $table->foreign('livraison_id')->references('id')->on('livraisons')->onDelete('cascade');
            // $table->foreign('paiment_method_id')->references('id')->on('paiment_methods')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}
