
document.getElementById("billing-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const sqFt = (width * height) / 144;
    const amount = sqFt * rate;
    document.getElementById("amount").value = amount.toFixed(2);
});
