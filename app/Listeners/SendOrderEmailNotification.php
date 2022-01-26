<?php

namespace App\Listeners;

use App\Events\Order;
use App\Helpers\MailSender;
use App\Models\Delivery;
use App\Models\Order as ModelsOrder;
use App\Models\OrderProducts;
use App\Models\Payment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use DB;

class SendOrderEmailNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Order  $event
     * @return void
     */
    public function handle(Order $event)
    {

        $order_model = new ModelsOrder();
        $order_table = $order_model->getTable();
        
        $menu_table_orders = DB::table('menu')
        ->select('title', 'fields')
        ->where('table_name', $order_table)
        ->first();

        $fields = json_decode($menu_table_orders->fields);

        $fields_titles = [];
        foreach ($fields as $field) {
            if (isset($field->db_title))
                $fields_titles[$field->db_title] = $field->title;
            else 
                $fields_titles[$field->relationship_table_name] = $field->title;
        }

        $order_items = $event->order->toArray();
        $message = '';
        foreach ($fields_titles as $key => $field_title){

            if ($key != 'delivery' && $key != 'payment' && $key != 'users' && $key != 'orders_status' && $key != 'orders_product'){

                if ($order_items[$key] === 0)
                    $order_items[$key] = 'нет';
                elseif ($order_items[$key] === 1)
                    $order_items[$key] = 'да';
            }

            if ($key == 'delivery'){
                $order_items[$key] = $event->order->delivery->title;
            }

            if ($key == 'payment'){
                $order_items[$key] = $event->order->payment->title;
            }

            if ($key != 'users' && $key != 'orders_status' && $key != 'orders_product')
                $message .= $field_title.': '.$order_items[$key].PHP_EOL;
        }

        $message .= PHP_EOL.PHP_EOL;

        $order_products_model = new OrderProducts();
        $order_products_table = $order_products_model->getTable();
        
        $menu_table = DB::table('menu')
        ->select('title', 'fields')
        ->where('table_name', $order_products_table)
        ->first();

        $fields = json_decode($menu_table->fields);
        $fields_titles = [];
        foreach ($fields as $field) {
            if (isset($field->db_title))
                $fields_titles[$field->db_title] = $field->title;
        }
        $order_products_items = $event->order_products;
        $message .= 'Товары:'.PHP_EOL;

        foreach ($order_products_items as $order_product){

            foreach ($fields_titles as $key => $field_title){

                if ($key == 'slug'){
                    $order_product[$key] = route('product', $order_product[$key], true);
                }

                if ($key != 'image')
                    $message .= $field_title.': '.$order_product[$key].PHP_EOL;

            }

            $message .= PHP_EOL;
        }

        $sum = $order_model->get_sum([$event->order])[0]->sum;
        
        $message .= 'Сума: '.$sum;

        MailSender::send('pa@digiants.com.ua', $menu_table_orders->title, $message);

    }
}
