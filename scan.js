module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).end(); return; }

  try {
    const { image, mediaType } = req.body;
    const today = new Date().toISOString().split('T')[0];

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
        system: 'You are an expert receipt scanner for a home asset management app in Saudi Arabia. Receipts may be Arabic, English, or both. Arabic terms: فاتورة=invoice, ضمان=warranty, سنة=year, سنتان=2years, تاريخ=date, السعر=price, المتجر=store, موديل=model. Rules: 1. Extract all visible info. 2. Translate Arabic values to English, keep brand/store names as-is. 3. Missing field = null, never guess. 4. Assumptions go in assumptions[]. 5. Unclear things go in questions[]. 6. If warranty duration stated calculate expiry from purchase date. Today is ' + today + '. 7. Category must be one of: Devices, Furniture, AC & HVAC, Plumbing, Electrical, Ceramic & Tiles, Gypsum, Doors & Windows, Paint, Car, Other. 8. Return ONLY valid JSON no markdown: {"name":"","cat":"","brand":null,"model":null,"buy":null,"price":null,"rcpt":null,"store":null,"war":null,"ins":null,"contact":null,"notes":null,"assumptions":[],"questions":[]}',
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
            { type: 'text', text: 'Scan this receipt carefully. Pay close attention to Arabic text.' }
          ]
        }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data.error && data.error.message ? data.error.message : 'API error' });
    }

    const raw = data.content.map(function(x) { return x.text || ''; }).join('');
    const result = JSON.parse(raw.replace(/```json|```/g, '').trim());
    return res.status(200).json(result);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
