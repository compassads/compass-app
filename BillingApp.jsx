
import React, { useState, useEffect } from "react";

export default function BillingApp() {
  const [entries, setEntries] = useState([
    { particulars: "", width: "", height: "", nos: "", rate: "", sqFt: "", amount: "" }
  ]);
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [advance, setAdvance] = useState(0);
  const [additionalCharge, setAdditionalCharge] = useState(0);
  const [clientSaved, setClientSaved] = useState(false);

  useEffect(() => {
    setClientSaved(false);
  }, []);

  const handleEntryChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;

    const w = parseFloat(updated[index].width) || 0;
    const h = parseFloat(updated[index].height) || 0;
    const n = parseInt(updated[index].nos) || 0;
    const r = parseFloat(updated[index].rate) || 0;
    const sqFt = (w * h * n) / 144; // Convert to square feet
    const amount = sqFt * r;

    updated[index].sqFt = sqFt.toFixed(2);
    updated[index].amount = amount.toFixed(2);

    setEntries(updated);
  };

  const addRow = () => {
    setEntries([...entries, { particulars: "", width: "", height: "", nos: "", rate: "", sqFt: "", amount: "" }]);
  };

  const subtotal = entries.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  const total = subtotal + parseFloat(additionalCharge || 0);
  const balance = total - advance;

  return (
    <div className="p-4 max-w-7xl mx-auto text-sm">
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl text-xl font-bold">Billing Software</div>

      <div className="border border-t-0 rounded-b-xl p-4 shadow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <input
            className="border p-2 rounded"
            placeholder="Client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            disabled={clientSaved}
          />
          <input
            className="border p-2 rounded"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={clientSaved}
          />
          <input className="border p-2 rounded" placeholder="Invoice #" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
          <input className="border p-2 rounded" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <table className="w-full border mb-4 text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1 w-[20%]">Particulars</th>
              <th className="border p-1">Width</th>
              <th className="border p-1">Height</th>
              <th className="border p-1">Nos.</th>
              <th className="border p-1">Sq. Ft</th>
              <th className="border p-1">Rate</th>
              <th className="border p-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                {Object.entries(entry).map(([field, value]) => (
                  <td className="border" key={field}>
                    <input
                      className="w-full p-1 text-xs"
                      value={value}
                      onChange={(e) => handleEntryChange(index, field, e.target.value)}
                      disabled={field === "sqFt" || field === "amount"}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button className="bg-blue-600 text-white px-3 py-1 rounded mb-4" onClick={addRow}>+ Add Item</button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="font-semibold">Subtotal: ₹ {subtotal.toFixed(2)}</div>
          <input
            className="border p-2 rounded"
            placeholder="Additional Charge"
            type="number"
            value={additionalCharge}
            onChange={(e) => setAdditionalCharge(parseFloat(e.target.value) || 0)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Advance"
            type="number"
            value={advance}
            onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)}
          />
          <div className="font-semibold">Balance: ₹ {balance.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
