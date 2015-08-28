<?php
$url = "http://localhost:8888/parse";
$content = '{
    "title": "ZXCzcxzvx",
    "sections": [
        {
            "id": 11,
            "type": "content",
            "text": "<b>Some content by ajinder</b>",
            "alignment": "left"
        },
        {
            "id": 21,
            "type": "image",
            "url": "http://res.cloudinary.com/realarpit/image/upload/v1440420623/quf8pgbjsj1hojwhomkk.jpg",
            "alt": "primer juego ordenador",
            "banner": false,
            "parallax": false,
            "width": 500,
            "height": 622
        },
        {
            "id": 33,
            "type": "content",
            "text": "Some more content"
        }
    ]
}';

// $content = json_decode($content);


$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER,
        array("Content-type: application/json"));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

$json_response = curl_exec($curl);

// $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
// if ( $status != 201 ) {
//     die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
// }


curl_close($curl);
echo $json_response;
// echo "<pre>";print_r($json_response);die("</pre>");
	
// $response = json_decode($json_response, true);