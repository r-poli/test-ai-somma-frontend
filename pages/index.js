const handleSum = async () => {
  console.log("Invio richiesta a:", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sum`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num1: Number(num1),
        num2: Number(num2),
      }),
    });

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Risultato ricevuto:", data);
    setResult(data.result);
  } catch (err) {
    console.error("Errore:", err);
  }
};
