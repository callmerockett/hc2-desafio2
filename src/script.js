let customer_table = document.getElementById('customer-table');
let product_table = document.getElementById('product-table');
let customer_button = document.getElementById('customer-button');
let product_button = document.getElementById('product-button');
let translucid_screen = document.getElementById('translucid-screen');
let customer_form = document.getElementById('customer-form');
let product_form = document.getElementById('product-form');

let change_button = document.getElementById('change-button');

change_button.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(product_button);
    toggle(customer_button);
    toggle(product_table);
    toggle(customer_table);
});

customer_button.addEventListener('click', (e)=> {
    e.preventDefault();
    toggle(translucid_screen);
    if (customer_button.classList.contains('show')) {
        toggle(customer_form);
        // console.log(customer_form);
    } else {

    }
})

translucid_screen.addEventListener('click', (e)=> {
    toggle(translucid_screen);
    toggle(customer_form);
})

const toggle = (element) => {
    element.classList.toggle('hide');
};