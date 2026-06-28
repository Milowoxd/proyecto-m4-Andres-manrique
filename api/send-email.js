import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' });

  const { email, tasks } = req.body;
  if (!email || !tasks) return res.status(400).json({ error: 'Email y tareas son requeridos' });

  const completed = tasks.filter(t => t.completed);
  const pending = tasks.filter(t => !t.completed);

  const htmlBody = `
    <h2>Resumen de tus tareas - MateCode Tasks</h2>
    <p><strong>Total:</strong> ${tasks.length} tareas</p>
    <p><strong>Completadas:</strong> ${completed.length}</p>
    <p><strong>Pendientes:</strong> ${pending.length}</p>
    ${pending.length > 0 ? `<h3>Pendientes:</h3><ul>${pending.map(t => `<li>${t.title}</li>`).join('')}</ul>` : ''}
    ${completed.length > 0 ? `<h3>Completadas:</h3><ul>${completed.map(t => `<li><s>${t.title}</s></li>`).join('')}</ul>` : ''}
  `;

  try {
    await ses.send(new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: {