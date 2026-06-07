export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({error:'Method not allowed'}); return; }

  try {
    const { image, mediaType } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1000,
        system: `You are an expert receipt scanner for a home and car asset management app in Saudi Arabia.
Receipts may be in Arabic, English, or both.
Arabic terms: فاتورة=invoice, ضمان=warranty, سنة=year, سنتان=2 years, تاريخ=date, السعر/المبلغ=price, المتجر=store, موديل=model, رقم تسلسلي=serial.
RULES:
1. Extract ALL visible info carefully.
2. Translate Arabic values to English. Keep brand/store names as-is.
3. If a field is not on the receipt set it to null — never guess silently.
4. If you assume something explain it in assumptions[].
5. If something is unclear put it in questions[].
6. If warranty duration is stated (e.g. ضمان سنتان = 2 years) calculate expiry from purchase date. Today is ${new Date().toISOString().split('T')[0]}.
7. Category: Devices, Furniture, AC & HVAC, Plumbing, Electrical, Ceramic & Tiles, Gypsum, Doors & Windows, Paint, Car, Other.
8. Return ONLY valid JSON no markdown no explanation:
{"name":"","cat":"","brand":null,"model":null,"buy":null,"price":null,"rcpt":null,"store":null,"war":null,"ins":null,"contact":null,"notes":null,"assumptions":[],"questions":[]}`,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
            { type: 'text', text: 'Scan this receipt carefully. Pay close attention to Arabic text.' }
          ]
        }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: err.error?.message || 'API error' });
    }

    const data = await response.json();
    const raw = data.content.map(x => x.text || '').join('');
    const result = JSON.parse(raw.replace(/```json|```/g, '').trim());
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
