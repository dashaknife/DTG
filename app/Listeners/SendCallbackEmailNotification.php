<?php

namespace App\Listeners;

use App\Events\Callback;
use App\Helpers\MailSender;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use DB;

class SendCallbackEmailNotification
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
     * @param  Callback  $event
     * @return void
     */
    public function handle(Callback $event)
    {
        $table = $event->callback->getTable();

        $menu_table = DB::table('menu')
        ->select('title', 'fields')
        ->where('table_name', $table)
        ->first();

        $fields = json_decode($menu_table->fields);

        $fields_titles = [];
        foreach ($fields as $field) {
            $fields_titles[$field->db_title] = $field->title;
        }
        
        $callback_items = $event->callback->toArray();
        $message = '';

        foreach ($fields_titles as $key => $field_title){
            $message .= $field_title.': '.$callback_items[$key].PHP_EOL;
        }

        MailSender::send('pa@digiants.com.ua', $menu_table->title, $message);

    }
}
