<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;

trait WhatsAppTrait
{
    protected function send($phone, $message)
    {
        Http::withHeaders([
            'Authorization' => env('FONNTE_KEY'),
        ])->asMultipart()
            ->post('https://api.fonnte.com/send', [
                'target'      => $phone,
                'message'     => $message,
                'delay'       => 2,
                'countryCode' => '62',
            ]);
    }
}
