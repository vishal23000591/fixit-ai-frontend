export async function submitTicket(ticket) {
const res = await fetch(' https://b71c95e8b63c.ngrok-free.app/webhook/it-support-request', {

method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(ticket),
});


if (!res.ok) throw new Error('Network response was not ok');
return await res.json();
}