export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    const { image, mediaType } = await req.json();
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
        system: `You are an expert receipt scanner for a home and car asset management app in Saudi Arabia. Receipts may be in Arabic, English, or both. Arabic terms: فاتورة=invoice, ضمان=warranty, سنة=year, سنتان=2 years, تاريخ=date, السعر=price, المتجر=store, موديل=model, رقم تسلسلي=serial. RULES: 1. Extract ALL visible info. 2. Translate Arabic values to English, keep brand/store names as-is. 3. Missing field = null, never guess. 4. Assumptions go in assumptions[]. 5. Unclear things go in questions[]. 6. If warranty duration stated calculate expiry from purchase date. Today is ${today}. 7. Category must be one of: Devices, Furniture, AC & HVAC, Plumbing, Electrical, Ceramic & Tiles, Gypsum, Doors & Windows, Paint, Car, Other. 8. Return ONLY valid JSON, no markdown: {"name":"","cat":"","brand":null,"model":null,"buy":null,"price":null,"rcpt":null,"store":null,"war":null,"ins":null,"contact":null,"notes":null,"assumptions":[],"questions":[]}`,
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
      return new Response(JSON.stringify({ error: err.error?.message || 'API error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const data = await response.json();
    const raw = data.content.map(x => x.text || '').join('');
    const result = JSON.parse(raw.replace(/```json|```/g, '').trim());

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
