// app.js
document.addEventListener('DOMContentLoaded', function() {
    const loanForm = document.getElementById('loanForm');
    const paymentForm = document.getElementById('paymentForm');
    const loanList = document.getElementById('loanList').getElementsByTagName('tbody')[0];
    const activeLoansDiv = document.getElementById('activeLoans');

    let loans = [];

    // Función para agregar préstamo
    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        const loan = { name, originalAmount: amount, currentAmount: amount, date };
        loans.push(loan);
        displayLoans();
        displayActiveLoans();
        
        loanForm.reset();
    });

    // Función para realizar un pago
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const paymentName = document.getElementById('paymentName').value;
        const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);

        const loan = loans.find(loan => loan.name.toLowerCase() === paymentName.toLowerCase());

        if (loan) {
            loan.currentAmount -= paymentAmount;
            if (loan.currentAmount < 0) loan.currentAmount = 0;
            displayLoans();
            displayActiveLoans(); // Actualizar préstamos activos
        }

        paymentForm.reset();
    });

    // Función para mostrar los préstamos en la tabla
    function displayLoans() {
        loanList.innerHTML = ''; // Limpiamos la tabla
        loans.forEach(loan => {
            const row = loanList.insertRow();
            row.innerHTML = `
                <td>${loan.name}</td>
                <td>${loan.originalAmount.toFixed(2)}</td>
                <td>${loan.currentAmount.toFixed(2)}</td>
                <td>${loan.date}</td>
            `;
        });
    }

    // Función para mostrar los préstamos activos en negrita
    function displayActiveLoans() {
        activeLoansDiv.innerHTML = ''; // Limpiamos los préstamos activos previos
        let activeLoans = loans.filter(loan => loan.currentAmount > 0); // Filtramos los préstamos activos

        if (activeLoans.length === 0) {
            activeLoansDiv.innerHTML = '<p>No hay préstamos activos.</p>';
        } else {
            activeLoans.forEach(loan => {
                const loanElement = document.createElement('p');
                loanElement.innerHTML = `<strong>${loan.name} tiene una deuda total de: $${loan.originalAmount.toFixed(2)} (Saldo actual: $${loan.currentAmount.toFixed(2)})</strong>`;
                activeLoansDiv.appendChild(loanElement);
            });
        }
    }
});
