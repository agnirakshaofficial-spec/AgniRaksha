const safety = 'Prioritize people over property. If LPG is suspected, avoid flames and electrical switches, evacuate, and call the local fire or gas emergency service from outside. Shut a gas valve only if it is immediately safe to do so. Do not re-enter until qualified responders clear the area.';

module.exports = async function chat(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ answer: 'Method not allowed.' });
  }

  try {
    const { message } = req.body || {};
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ answer: 'Ask a question first.' });
    }
    if (message.length > 3000) {
      return res.status(400).json({ answer: 'Question is too long.' });
    }
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ answer: `${safety}\n\nThe assistant is using its built-in safety guidance.` });
    }

    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        temperature: 0.25,
        max_tokens: 550,
        messages: [
          { role: 'system', content: 'You are Firewise, a concise fire and LPG safety assistant for Agniraksha. Answer only fire prevention, LPG leaks, smoke, emergency response, and operation of gas/smoke detection systems. Give conservative practical guidance. In a real or suspected emergency: tell the user to leave, avoid switches/flames, call local emergency services from outside, and never re-enter until responders clear it. Never claim this dashboard or prototype contacted responders or activated physical devices. Say when advice depends on local codes or professionals.' },
          { role: 'user', content: message.trim() },
        ],
      }),
    });
    if (!upstream.ok) {
      return res.status(502).json({ answer: `Assistant unavailable.\n\n${safety}` });
    }
    const data = await upstream.json();
    return res.status(200).json({ answer: data.choices?.[0]?.message?.content || safety });
  } catch {
    return res.status(502).json({ answer: `Assistant unavailable.\n\n${safety}` });
  }
};
