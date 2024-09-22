const express = require('express');
const path = require('path');
const stripe = require('stripe')('sk_test_51Q1QuB00T9b7Sysa2MLBKz7RmHkb5fJZyk04QlRqiDv2q7UuTIVMDw5fyA4jLQPYJMFz9tZSjwa1hQfF7SZm3lSy00SlGhkcVo');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    const { total, email } = req.body;

    if (!total || total <= 0) {
        return res.status(400).json({ error: 'Le montant est requis et doit être supérieur à 0.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: 'Commande Totale' },
                    unit_amount: total,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://lesmacaronshottekiet.fr/pages-ext/merci.html', // Remplace par ta page de succès
            cancel_url: 'http://localhost:3000/cancel.html', // Remplace par ta page d'annulation
        });

        res.json({ id: session.id, email }); // Renvoie également l'e-mail
    } catch (error) {
        console.error('Erreur lors de la création de la session :', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
