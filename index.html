export default async function handler(req, res) {
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
        system: `You are an expert receipt scanner for a home asset management app in Saudi Arabia. Receipts may be Arabic, English, or both. Arabic: فاتورة=invoice, ضمان=warranty, سنة=year, سنتان=2years, تاريخ=date, السعر=price, المتجر=store. Rules: 1. Extract all visible info. 2. Translate Arabic to English, keep brand names. 3. Missing=null. 4. Assumptions in assumptions[]. 5. Unclear in questions[]. 6. Calculate warranty expiry if duration stated. Today=${today}. 7. Category: Devices,Furniture,AC & HVAC,Plumbing,Electrical,Ceramic & Tiles,Gypsum,Doors & Windows,Paint,Car,Other. 8. Return ONLY JSON: {"name":"","cat":"","brand":null,"model":null,"buy":null,"price":null,"rcpt":null,"store":null,"war":null,"ins":null,"contact":null,"notes":null,"assumptions":[],"questions":[]}`,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
          { type: 'text', text: 'Scan this receipt. Pay attention to Arabic text.' }
        ]}]
      })
    });

    const data = await response.json();
    if (!response.ok) { res.status(500).json({ error: data.error?.message || 'API error' }); return; }

    const raw = data.content.map(x => x.text || '').join('');
    const result = JSON.parse(raw.replace(/```json|```/g, '').trim());
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
