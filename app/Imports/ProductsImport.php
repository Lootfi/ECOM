<?php

namespace App\Imports;

use App\Product;
use Maatwebsite\Excel\Concerns\ToArray;
use Maatwebsite\Excel\Concerns\ToModel;

class ProductsImport implements ToArray
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function array(array $row)
    {
        return $row;
    }
}
