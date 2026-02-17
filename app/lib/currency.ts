export async function getExchangeRates(base = "USD") {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  
  if (!apiKey) {
    console.error("Missing ExchangeRate-API Key");
    return { "USD": 1, "EUR": 0.92, "UAH": 41.5 }; 
  }

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`,
      { next: { revalidate: 86400, tags: ['rates'] } }
    );

    if (!res.ok) throw new Error("ExchangeRate-API response not OK");

    const data = await res.json();

    if (data.result === "success") {
      return data.conversion_rates as Record<string, number>;
    }
    
    throw new Error(data['error-type'] || "Unknown API error");
    
  } catch (error) {
    console.error("Currency Fetch Error:", error);
    return { "USD": 1, "EUR": 0.92, "UAH": 41.5 };
  }
};

export function convertAmount(
  amount: number, 
  fromCurrency: string, 
  toCurrency: string, 
  rates: Record<string, number>
) {
  if (fromCurrency === toCurrency) return amount;
  if (!rates[fromCurrency] || !rates[toCurrency]) return amount;

  return (amount / rates[fromCurrency]) * rates[toCurrency];
};