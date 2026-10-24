<?php
/**
 * Hieron — quote request endpoint for the cPanel (Cenuta) hosting.
 *
 * Receives the request form as JSON, emails it to the company inbox,
 * sends the client a short confirmation in their language, and keeps a
 * backup copy in a private folder outside the public website.
 */

// ── Settings ────────────────────────────────────────────────────────────────
const RECIPIENT   = 'info@hieron.com.tr';            // where requests are delivered
const SENDER      = 'info@hieron.com.tr';            // must be an address on this domain
const SENDER_NAME = 'Hieron Website';
const ALLOWED_ORIGINS = ['https://hieron.com.tr', 'https://www.hieron.com.tr', 'http://hieron.com.tr', 'http://www.hieron.com.tr'];
const MAX_PER_HOUR = 8;                              // per visitor, against spam

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['error' => 'Method not allowed']);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) reply(403, ['error' => 'Forbidden']);

$raw = file_get_contents('php://input', false, null, 0, 200000);
$in = json_decode($raw ?: '', true);
if (!is_array($in)) reply(400, ['error' => 'Invalid request']);

// Bots fill the hidden "website" field: pretend success without sending anything.
if (!empty($in['website'])) reply(200, ['id' => 'HR-0']);

// ── Validation ──────────────────────────────────────────────────────────────
function field(array $in, string $key, int $max): string {
    $v = isset($in[$key]) && is_scalar($in[$key]) ? trim((string) $in[$key]) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}
$name    = field($in, 'name', 120);
$company = field($in, 'company', 160);
$email   = field($in, 'email', 160);
$phone   = field($in, 'phone', 40);
$country = field($in, 'country', 80);
$rooms   = field($in, 'rooms', 40);
$message = field($in, 'message', 3000);
$locale  = in_array($in['locale'] ?? '', ['en', 'fr', 'tr', 'ar', 'ru'], true) ? $in['locale'] : 'en';
$branding = !empty($in['branding']);

if (mb_strlen($name) < 2 || mb_strlen($company) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(400, ['error' => 'Please check the form and try again.']);
}
// Header safety: no line breaks in values used in email headers
$email = str_replace(["\r", "\n"], '', $email);

$items = [];
foreach (array_slice(is_array($in['items'] ?? null) ? $in['items'] : [], 0, 100) as $it) {
    if (!is_array($it)) continue;
    $qty = (int) ($it['quantity'] ?? 0);
    if ($qty < 1 || $qty > 10000000) continue;
    $items[] = [
        'name'     => field($it, 'name', 160),
        'category' => field($it, 'category', 160),
        'size'     => field($it, 'size', 120),
        'option'   => field($it, 'option', 120),
        'quantity' => $qty,
        'unit'     => in_array($it['unit'] ?? 'pcs', ['pcs', 'm', 'kg'], true) ? ($it['unit'] ?? 'pcs') : 'pcs',
    ];
}

// ── Private storage (outside public_html) ───────────────────────────────────
$dataDir = dirname($_SERVER['DOCUMENT_ROOT'] ?: dirname(__DIR__)) . '/hieron-requests';
if (!is_dir($dataDir)) @mkdir($dataDir, 0750, true);

// Simple rate limit per visitor
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = $dataDir . '/rate-' . hash('sha256', $ip) . '.json';
$now = time();
$hits = array_filter(json_decode(@file_get_contents($rateFile) ?: '[]', true) ?: [], fn($t) => $t > $now - 3600);
if (count($hits) >= MAX_PER_HOUR) reply(429, ['error' => 'Too many requests. Please try again later or email us.']);
$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)), LOCK_EX);

// Reference number HR-YYMMDD-0001 (counter per day)
$counterFile = $dataDir . '/counter-' . date('ymd') . '.txt';
$fp = @fopen($counterFile, 'c+');
$n = 1;
if ($fp) {
    flock($fp, LOCK_EX);
    $n = (int) stream_get_contents($fp) + 1;
    ftruncate($fp, 0); rewind($fp); fwrite($fp, (string) $n);
    flock($fp, LOCK_UN); fclose($fp);
}
$ref = sprintf('HR-%s-%04d', date('ymd'), $n);

$record = compact('ref', 'name', 'company', 'email', 'phone', 'country', 'rooms', 'branding', 'message', 'locale', 'items');
$record['date'] = date('c');
$record['ip'] = $ip;
@file_put_contents($dataDir . '/requests.jsonl', json_encode($record, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// ── Email to the company ────────────────────────────────────────────────────
function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
$units = ['pcs' => 'pcs', 'm' => 'm', 'kg' => 'kg'];

$rowsHtml = '';
$rowsText = '';
foreach ($items as $i) {
    $q = number_format($i['quantity'], 0, '.', ',') . ' ' . $units[$i['unit']];
    $rowsHtml .= '<tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>' . h($i['name']) . '</strong><br><span style="color:#777;font-size:12px">' . h($i['category']) . '</span></td>'
        . '<td style="padding:10px;border-bottom:1px solid #eee">' . h($i['size']) . '<br><span style="color:#777;font-size:12px">' . h($i['option']) . '</span></td>'
        . '<td style="padding:10px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">' . h($q) . '</td></tr>';
    $rowsText .= "• {$i['name']} ({$i['category']}) — {$i['size']}, {$i['option']} × {$q}\n";
}
if (!$items) {
    $rowsHtml = '<tr><td colspan="3" style="padding:10px;color:#777">General request (no products selected)</td></tr>';
    $rowsText = "General request (no products selected)\n";
}
$details = [
    'Reference' => $ref, 'Name' => $name, 'Company / hotel' => $company, 'Email' => $email,
    'Phone / WhatsApp' => $phone ?: '—', 'Country' => $country ?: '—', 'Rooms / volume' => $rooms ?: '—',
    'Custom branding' => $branding ? 'Yes' : 'No', 'Website language' => strtoupper($locale),
];
$detailsHtml = '';
$detailsText = '';
foreach ($details as $k => $v) {
    $detailsHtml .= '<tr><td style="padding:6px 0;color:#777;width:150px">' . h($k) . '</td><td style="padding:6px 0">' . h($v) . '</td></tr>';
    $detailsText .= str_pad($k . ':', 18) . $v . "\n";
}

$html = '<!doctype html><html><body style="margin:0;background:#f6f3ee;font-family:Arial,Helvetica,sans-serif;color:#151f2a">'
    . '<div style="max-width:640px;margin:0 auto;padding:24px"><div style="background:#0e151d;color:#d5bf94;padding:22px 26px;letter-spacing:3px;font-size:13px">HIERON · NEW QUOTE REQUEST</div>'
    . '<div style="background:#fff;padding:26px"><h2 style="margin:0 0 4px;font-weight:normal">' . h($company) . '</h2><p style="margin:0 0 18px;color:#777">' . h($ref) . ' · ' . date('d.m.Y H:i') . '</p>'
    . '<table style="width:100%;border-collapse:collapse;font-size:14px">' . $detailsHtml . '</table>'
    . '<h3 style="margin:24px 0 8px;font-weight:normal">Products</h3><table style="width:100%;border-collapse:collapse;font-size:14px">' . $rowsHtml . '</table>'
    . ($message !== '' ? '<h3 style="margin:24px 0 8px;font-weight:normal">Message</h3><p style="white-space:pre-wrap;margin:0">' . h($message) . '</p>' : '')
    . '<p style="margin:26px 0 0;font-size:12px;color:#999">Reply to this email to answer ' . h($name) . ' directly.</p></div></div></body></html>';
$text = "NEW QUOTE REQUEST — $ref\n\n$detailsText\nPRODUCTS\n$rowsText" . ($message !== '' ? "\nMESSAGE\n$message\n" : '');

function send_mail(string $to, string $subject, string $text, string $html, string $replyTo = ''): bool {
    $boundary = 'b' . bin2hex(random_bytes(12));
    $headers = [
        'From: ' . mb_encode_mimeheader(SENDER_NAME, 'UTF-8') . ' <' . SENDER . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    ];
    if ($replyTo !== '') $headers[] = 'Reply-To: ' . $replyTo;
    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($text))
        . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html))
        . "--$boundary--";
    return mail($to, mb_encode_mimeheader($subject, 'UTF-8'), $body, implode("\r\n", $headers), '-f' . SENDER);
}

$sent = send_mail(RECIPIENT, "New quote request $ref — $company", $text, $html, $email);
if (!$sent) reply(500, ['error' => 'We could not send your request. Please email ' . RECIPIENT . '.']);

// ── Confirmation to the client, in their language ──────────────────────────
$confirm = [
    'en' => ['Your Hieron quote request', "Dear %s,\n\nThank you for your request. Your reference number is %s. Our team will review your selection and reply with a tailored offer, usually within one business day.\n\nHieron Textile & Promotion"],
    'fr' => ['Votre demande de devis Hieron', "Bonjour %s,\n\nMerci pour votre demande. Votre numéro de référence est %s. Notre équipe étudiera votre sélection et vous répondra avec une offre sur mesure, généralement sous un jour ouvré.\n\nHieron Textile & Promotion"],
    'tr' => ['Hieron teklif talebiniz', "Sayın %s,\n\nTalebiniz için teşekkür ederiz. Referans numaranız %s. Ekibimiz seçiminizi inceleyip size özel teklifle, genellikle bir iş günü içinde dönüş yapacaktır.\n\nHieron Tekstil & Promosyon"],
    'ar' => ['طلب عرض السعر من هيرون', "عزيزي/عزيزتي %s،\n\nشكرًا لطلبك. رقمك المرجعي هو %s. سيراجع فريقنا اختياراتك ويرد عليك بعرض مخصّص، عادةً خلال يوم عمل واحد.\n\nهيرون للمنسوجات والترويج"],
    'ru' => ['Ваш запрос цены — Hieron', "Здравствуйте, %s!\n\nСпасибо за запрос. Ваш номер: %s. Наша команда изучит ваш выбор и пришлёт индивидуальное предложение, обычно в течение одного рабочего дня.\n\nHieron Textile & Promotion"],
];
[$subj, $body] = $confirm[$locale];
$body = sprintf($body, $name, $ref);
$dir = $locale === 'ar' ? 'rtl' : 'ltr';
$cHtml = '<!doctype html><html><body style="margin:0;background:#f6f3ee;font-family:Arial,Helvetica,sans-serif;color:#151f2a"><div style="max-width:560px;margin:0 auto;padding:24px" dir="' . $dir . '">'
    . '<div style="background:#0e151d;color:#d5bf94;padding:20px 24px;letter-spacing:4px;font-size:14px">HIERON</div>'
    . '<div style="background:#fff;padding:26px;line-height:1.7;white-space:pre-wrap">' . h($body) . '</div></div></body></html>';
@send_mail($email, $subj, $body, $cHtml, RECIPIENT);

reply(200, ['id' => $ref]);
