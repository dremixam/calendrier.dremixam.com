var basePrice = 20.00;

paypal.Buttons({
    createOrder: function(data, actions) {
        var additionalAmount = parseFloat(document.getElementById('additional-amount').value) || 0; // Montant supplémentaire que l'utilisateur souhaite ajouter
        var totalAmount = basePrice + additionalAmount;
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'EUR', // Spécifie la devise en euros
                    value: totalAmount.toFixed(2) // Formatage du montant total à deux décimales
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction complétée par ' + details.payer.name.given_name + '!');
            // Vous pouvez ajouter ici la logique pour enregistrer la commande dans votre backend.
        });
    }
}).render('#paypal-button-container');


var additionalAmountInput = document.getElementById('additional-amount');
var totalAmountElement = document.getElementById('total-amount');

additionalAmountInput.addEventListener('input', function(event) {
    var additionalAmount = parseFloat(additionalAmountInput.value) || 0; // Montant supplémentaire que l'utilisateur souhaite ajouter
    
    if (additionalAmount < 0) {
        additionalAmount = 0;
        additionalAmountInput.value = '';
    }

    var totalAmount = basePrice + additionalAmount;
    totalAmountElement.textContent = totalAmount.toFixed(2);
});

additionalAmountInput.addEventListener('change', function(event) {
    var additionalAmount = parseFloat(additionalAmountInput.value) || 0; // Montant supplémentaire que l'utilisateur souhaite ajouter
    
    additionalAmountInput.value = additionalAmount.toFixed(2);
});